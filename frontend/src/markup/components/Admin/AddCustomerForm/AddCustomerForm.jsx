import React, { useState, useRef } from "react";
import customerService from "../../../../services/customer.services";

import { BeatLoader } from "react-spinners";

import { useNavigate } from "react-router-dom";

// import the useAuth hook
import { useAuth } from "../../../../Context/AuthContext";

function AddCustomerForm() {
  const navigate = useNavigate();
  // useStates
  const [customer_email, setEmail] = useState("");
  const [customer_first_name, setFirstName] = useState("");
  const [customer_last_name, setLastName] = useState("");
  const [customer_phone, setPhoneNumber] = useState("");
  const [active_customer, setActive_customer] = useState(1);
  const [serverMsg, setServerMsg] = useState("");

  // spinner handler state
  const [spin, setSpinner] = useState(false);

  // Error
  const [emailError, setEmailError] = useState("");

  // create a variable to hold the users token
  let loggedInEmployeeToken = "";

  // destructure the auth hook and get the token
  const { employee } = useAuth();
  if (employee && employee.employee_token) {
    loggedInEmployeeToken = employee.employee_token;
  }

  // targeter
  const emailDom = useRef();
  const firstNameDom = useRef();
  const lastNameDom = useRef();
  const phoneNumberDom = useRef();

  // email value tracker
  function emailTracker() {
    setEmail(emailDom.current.value);
  }

  // first name value tracker
  function firstNameTracker() {
    setFirstName(firstNameDom.current.value);
  }

  // last name value tracker
  function lastNameTracker() {
    setLastName(lastNameDom.current.value);
  }

  // Phone Number value tracker
  function phoneNumberTracker() {
    setPhoneNumber(phoneNumberDom.current.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let valid = true;

    // email is required
    if (!customer_email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!customer_email.includes("@")) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      const regex = /^\S+@\S+\.\S+$/;
      if (!regex.test(customer_email)) {
        setEmailError("Invalid email format");
        valid = false;
      } else {
        setEmailError("");
      }
    }

    // prepare the data for form submission
    const formData = {
      customer_email,
      customer_first_name,
      customer_last_name,
      customer_phone,
      active_customer,
    };

    try {
      const data = await customerService.createCustomer(
        formData,
        loggedInEmployeeToken
      );

      // console.log(data);

      if (data.status === 200) {
        setServerMsg("Redirecting To Customers page...");
        setSpinner(!spin);

        setTimeout(() => {
          setSpinner(!spin);
          setServerMsg("");
          navigate("/admin/customers");
        }, 500);
      }

      // if()
    } catch (error) {
      // console.log(error.response.data.msg);

      setEmailError(error.response.data.msg);

      setTimeout(() => {
        setEmailError("");
      }, 3000);
    }
  }

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Add a New Customer</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                {/* Form Start*/}

                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    {/* Email */}
                    <div className="form-group col-md-12">
                      <input
                        type="email"
                        name="employee_email"
                        placeholder="Customer email"
                        ref={emailDom}
                        value={customer_email}
                        onChange={emailTracker}
                        required
                      />
                      {emailError && (
                        <div className="validation-error" role="alert">
                          {emailError}
                        </div>
                      )}
                    </div>

                    {/* First Name */}
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_first_name"
                        placeholder="Customer first name"
                        ref={firstNameDom}
                        value={customer_first_name}
                        onChange={firstNameTracker}
                        required
                      />
                    </div>

                    {/* Last Name */}
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="employee_last_name"
                        placeholder="Customer last name"
                        required
                        ref={lastNameDom}
                        value={customer_last_name}
                        onChange={lastNameTracker}
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="employee_phone"
                        placeholder="Customer phone (555-555-5555)"
                        ref={phoneNumberDom}
                        required
                        value={customer_phone}
                        onChange={phoneNumberTracker}
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="form-group col-md-12">
                      <button
                        className="theme-btn btn-style-one"
                        type="submit"
                        data-loading-text="Please wait...">
                        <span>
                          {spin ? (
                            <BeatLoader color="white" size={8} />
                          ) : (
                            "Add Customer"
                          )}
                        </span>
                      </button>
                      {serverMsg && (
                        <div
                          className="validation-error"
                          style={{
                            color: "green",
                            fontSize: "100%",
                            fontWeight: "600",
                            padding: "25px",
                          }}
                          role="alert">
                          {serverMsg}
                        </div>
                      )}
                    </div>
                  </div>
                </form>

                {/* Form End */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddCustomerForm;
