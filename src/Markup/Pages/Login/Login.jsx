import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import loginService from "../../../Services/login.service.js";
import Layout from "../Layout/Layout";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [employee_email, setEmail] = useState("");
  const [employee_password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Client-side validation
    let valid = true;
    if (!employee_email) {
      setEmailError("Please enter your email address first");
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(employee_email)) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!employee_password || employee_password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) return; // Do not proceed if validation fails

    const formData = {
      employee_email,
      employee_password,
    };

    try {
      // Awaiting the response from the login service
      const response = await loginService.logIn(formData);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the JSON response
      const result = await response.json();

      if (result.status === "success") {
        if (result.data && result.data.employee_token) {
          // Save token to localStorage
          localStorage.setItem("employee", JSON.stringify(result.data));
        }

        // Redirect to the previous page or homepage
        const redirectPath =
          location.pathname === "/login" ? "/" : location.pathname;
        navigate(redirectPath);
      } else {
        setServerError(result.message || "Unknown error occurred.");
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
      setServerError("An error has occurred. Please try again later.");
    }
  };

  return (
    <Layout>
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
                      <div className="form-group col-md-12">
                        {serverError && (
                          <div className="validation-error" role="alert">
                            {serverError}
                          </div>
                        )}
                        <input
                          type="email"
                          name="employee_email"
                          value={employee_email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email"
                        />
                        {emailError && (
                          <div className="validation-error" role="alert">
                            {emailError}
                          </div>
                        )}
                      </div>

                      <div className="form-group col-md-12">
                        <input
                          type="password"
                          name="employee_password"
                          value={employee_password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                        />
                        {passwordError && (
                          <div className="validation-error" role="alert">
                            {passwordError}
                          </div>
                        )}
                      </div>

                      <div className="form-group col-md-12">
                        <button
                          className="theme-btn btn-style-one"
                          type="submit"
                          data-loading-text="Please wait..."
                        >
                          <span>Login</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Login;