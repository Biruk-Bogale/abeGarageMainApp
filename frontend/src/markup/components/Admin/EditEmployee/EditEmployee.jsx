import React, { useRef, useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";

// import employee service
import employeeService from "../../../../services/employee.services";

// import the useAuth hook
import { useAuth } from "../../../../Context/AuthContext";

// import react router dom
import { useParams, useNavigate } from "react-router-dom";

function EditEmployee() {
  const navigate = useNavigate();
  const [employee_first_name, setFirstName] = useState("");
  const [employee_last_name, setLastName] = useState("");
  const [employee_phone, setPhoneNumber] = useState("");
  const [company_role_id, setCompany_role_id] = useState(1);
  const [active_employee, setActiveEmployee] = useState("");
  const [employee1, setEmployee1] = useState("");
  const [serverMsg, setServerMsg] = useState("");

  const { employee_hash } = useParams();

  // spinner handler state
  const [spin, setSpinner] = useState(false);

  // traget
  const firstNameDom = useRef();
  const lastNameDom = useRef();
  const phoneNumberDom = useRef();
  const companyRoleIdDom = useRef();
  const checkboxDOM = useRef();

  // create a variable to hold the users token
  let loggedInEmployeeToken = "";
  // destructure the auth hook and get the token
  const { employee } = useAuth();
  if (employee && employee.employee_token) {
    loggedInEmployeeToken = employee.employee_token;
  }

  // first name value tracker
  function firstNameTracker() {
    setFirstName(firstNameDom.current.value);
  }

  // last name value tracker
  function lastNameTracker() {
    setLastName(lastNameDom.current.value);
  }

  // phone number value tracker
  function phoneNumberTracker() {
    setPhoneNumber(phoneNumberDom.current.value);
  }

  // company role id value tracker
  function companyRoleIdTracker() {
    setCompany_role_id(companyRoleIdDom.current.value);
  }

  // active employee value tracker
  function activeEmployeeTracker() {
    setActiveEmployee(checkboxDOM.current.checked);
  }

  // fetch employee data using useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await employeeService?.singleEmployee(
          employee_hash,
          loggedInEmployeeToken
        );

        if (data?.status !== 200) {
          // set apiError to true
          setApiError(true);

          if (data?.status === 403) {
            setApiErrorMessage("Please login again");
          } else if (data?.status === 401) {
            setApiErrorMessage("You are not Authorized to view this page");
          } else {
            setApiErrorMessage("Please try again laterrrr");
          }
        }
        setFirstName(data.data.singleEmployee[0].employee_first_name);
        setLastName(data.data.singleEmployee[0].employee_last_name);
        setPhoneNumber(data.data.singleEmployee[0].employee_phone);
        setCompany_role_id(data.data.singleEmployee[0].company_role_id);
        setEmployee1(data.data.singleEmployee[0]);
        checkboxDOM.current.checked =
          data.data.singleEmployee[0].active_employee;
        setActiveEmployee(checkboxDOM.current.checked);
      } catch (error) {}
    };
    fetchData();
  }, []);

  async function handleSubmit(e) {
    // prevent the default behavior of the form submission
    e.preventDefault();

    // prepare the data for form submission
    const FormData = {
      employee_first_name,
      employee_last_name,
      employee_phone,
      company_role_id,
      employee_hash,
      active_employee,
    };

    try {
      setSpinner(!spin);
      const data = await employeeService.updateEmployee(
        FormData,
        loggedInEmployeeToken
      );

      if (data.status === 200) {
        setServerMsg("Redirecting To Employees page...");

        setTimeout(() => {
          setSpinner(!spin);
          setServerMsg("");
          navigate("/admin/employees");
        }, 500);
      }
    } catch (error) {
      setTimeout(() => {
        setSpinner(!spin);
      }, 500);
    }
  }

  return (
    <>
      <section className="contact-section">
        <div className="auto-container">
          <div className="contact-title">
            <h2>Edit: {employee1.employee_email} </h2>
          </div>
          <div className="row clearfix">
            <div className="form-column col-lg-7">
              <div className="inner-column">
                <div className="contact-form">
                  {/* Form Start*/}

                  <form onSubmit={handleSubmit}>
                    <div className="row clearfix">
                      {/* First Name */}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="employee_first_name"
                          placeholder="Employee first name"
                          ref={firstNameDom}
                          value={employee_first_name}
                          onChange={firstNameTracker}
                          required
                        />
                        {"firstNameRequired" && (
                          <div className="validation-error" role="alert">
                            {/* {firstNameRequired} */}
                          </div>
                        )}
                      </div>

                      {/* Last Name */}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="employee_last_name"
                          placeholder="Employee last name"
                          required
                          ref={lastNameDom}
                          value={employee_last_name}
                          onChange={lastNameTracker}
                        />
                        {"lastNameRequired" && (
                          <div className="validation-error" role="alert">
                            {/* {lastNameRequired} */}
                          </div>
                        )}
                      </div>

                      {/* Phone Number */}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="employee_phone"
                          placeholder="Employee phone (555-555-5555)"
                          ref={phoneNumberDom}
                          required
                          value={employee_phone}
                          onChange={phoneNumberTracker}
                        />
                        {"phoneNumberRequired" && (
                          <div className="validation-error" role="alert">
                            {/* {phoneNumberRequired} */}
                          </div>
                        )}
                      </div>

                      {/* Employee Role */}
                      <div className="form-group col-md-12">
                        <select
                          name="employee_role"
                          className="custom-select-box"
                          ref={companyRoleIdDom}
                          value={company_role_id}
                          onChange={companyRoleIdTracker}
                          required
                        >
                          <option value="1">Employee</option>
                          <option value="2">Manager</option>
                          <option value="3">Admin</option>
                        </select>
                      </div>

                      <div className="form-group col-md-12 form-contro">
                        <h5 htmlFor="completed">Active Employee</h5>

                        <input
                          value={active_employee}
                          onChange={activeEmployeeTracker}
                          ref={checkboxDOM}
                          type="checkbox"
                          name="completed"
                          className=""
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="form-group col-md-12">
                        <button
                          // onClick={spinner}
                          className="theme-btn btn-style-one"
                          type="submit"
                          data-loading-text="Please wait..."
                        >
                          <span>
                            {spin ? (
                              <BeatLoader color="white" size={8} />
                            ) : (
                              "Update Employee"
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
                            role="alert"
                          >
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
    </>
  );
}

export default EditEmployee;
