import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import loginEmployee from "../../../services/login.services";
import { BeatLoader } from "react-spinners";

function LoginForm(props) {
  const location = useLocation();
  const [employee_email, setEmail] = useState("");
  const [employee_password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");
  const [serverMsg, setServerMsg] = useState("");

  // spinner handler state
  const [spin, setSpinner] = useState(false);

  // tracQer
  const emailDom = useRef();
  const passwordDom = useRef();

  // email value tracker
  function emailTracker() {
    setEmail(emailDom.current.value);
  }

  // password value tracker
  function passwordTracker() {
    setPassword(passwordDom.current.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Handle client side validations here
    let valid = true; // Flag

    // Email is Required
    if (!employee_email) {
      setEmailError("Please enter your email address");
      valid = false;
    } else if (!employee_email.includes("@")) {
      setEmailError("Invalid email format");
    } else {
      const regex = /^\S+@\S+\.\S+$/;
      if (!regex.test(employee_email)) {
        setEmailError("Invalid email format");
        valid = false;
      } else {
        setEmailError("");
      }
    }

    // Password has to be at least 6 characters long
    if (!employee_password || employee_password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      setTimeout(() => {
        setPasswordError("");
      }, 2000);
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) {
      return;
    }

    // Handle server side validations here
    const formData = {
      employee_email,
      employee_password,
    };

    try {
      setSpinner(!spin);
      const { data } = await loginEmployee(formData);

      console.log(data);

      // Save the employee token in the local storage
      if (data.status === "success") {
        if (data.data.employee_token) {
          localStorage.setItem("employee", JSON.stringify(data.data));
        }

        if (data.message) {
          setServerMsg(data.message + "! Redirecting Page");

          setTimeout(() => {
            setServerMsg("");
            setSpinner(!spin);
            if (location.pathname === "/login") {
              window.location.replace("/");
            } else {
              window.location.reload();
            }
          }, 2000);
        }
      }
    } catch (error) {
      console.log(error);
      setSpinner(!spin);

      setServerError(error.response.data.message);
      setTimeout(() => {
        setServerError("");
      }, 2000);
    }
  }

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Login to your account</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    {/* Email */}

                    <div className="form-group col-md-12">
                      {serverError && (
                        <div className="validation-error" role="alert">
                          {serverError}
                        </div>
                      )}
                      <input
                        type="email"
                        name="employee_email"
                        placeholder="Email"
                        value={employee_email}
                        ref={emailDom}
                        onChange={emailTracker}
                        required
                      />
                      {emailError && (
                        <div className="validation-error" role="alert">
                          {emailError}
                        </div>
                      )}
                    </div>

                    {/* Password */}
                    <div className="form-group col-md-12">
                      <input
                        type="password"
                        name="employee_password"
                        placeholder="Password"
                        value={employee_password}
                        ref={passwordDom}
                        onChange={passwordTracker}
                        required
                      />
                      {passwordError && (
                        <div className="validation-error" role="alert">
                          {passwordError}
                        </div>
                      )}
                    </div>

                    {/* Button */}
                    <div className="form-group col-md-12">
                      <button
                        className="theme-btn btn-style-one"
                        type="submit"
                        data-loading-text="Please wait..."
                      >
                        <span>
                          {" "}
                          {spin ? (
                            <BeatLoader color="white" size={8} />
                          ) : (
                            "Login"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
