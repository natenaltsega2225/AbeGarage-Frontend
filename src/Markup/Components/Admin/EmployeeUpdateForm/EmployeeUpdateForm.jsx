import React, { useEffect, useState } from "react";
import employeeService from "../../../../Services/employee.service"; // Assuming this is the correct path
import { useAuth } from "../../../../Contexts/AuthContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";

function EmployeeUpdateForm() {
  // Define the state for form fields
  const [employee_email, setEmail] = useState("");
  const [employee_first_name, setFirstName] = useState("");
  const [employee_last_name, setLastName] = useState("");
  const [employee_phone, setPhoneNumber] = useState("");
  const [employee_password, setPassword] = useState("");
  const [company_role_id, setCompanyRole] = useState("1"); // Default to 'Employee'
  const [active_employee, setActiveEmployee] = useState(false); // Checkbox state

  // Define error states
  const [serverError, setServerError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [firstNameRequired, setFirstNameRequired] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate =useNavigate();
  const { uuid } = useParams();

  // Create a variable to hold the user's token
  let loggedInEmployeeToken = "";
  // Destructure the auth hook and get the token
  const { employee } = useAuth();
  if (employee && employee.employee_token) {
    loggedInEmployeeToken = employee.employee_token;
  }
  console.log(loggedInEmployeeToken);
  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Construct the form data
    const formData = {
      uuid,
      employee_email,
      employee_first_name,
      employee_last_name,
      employee_phone,
      employee_password,
      active_employee,
      company_role_id,
    };

    

    // Call the service to update a new employee
    employeeService
      .updateSingleEmployee(formData, loggedInEmployeeToken)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // If error is returned from the API server, set the error message
        if (data.error || data.errors) {
          setServerError(data.error || data.errors);
        } else {
          // Handle successful response
          setSuccess(true);
          setServerError("");
          navigate('/admin/employees')
        }
      })
      .catch((error) => {
        console.log(error)
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setServerError(resMessage);
      });
  };

  useEffect(() => {
    // function to fetch data
    const fetchEmployeeData = async () => {
      try {
        const data = employeeService
          ?.getSingleEmployee(uuid, loggedInEmployeeToken)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            setEmail(data?.employee_email)
            setFirstName(data?.employee_first_name);
            setLastName(data?.employee_last_name);
            setPhoneNumber(data?.employee_phone);
            setCompanyRole(data?.company_role_id);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmployeeData();
  }, []);
  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>
            Edit:{employee_first_name} {employee_last_name}{" "}
          </h2>
          <h4>Employee email:{employee_email}</h4>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit} className="formSize">
                  <div className="row clearfix">
                    {/* <div className="form-group col-md-12">
                      {serverError && (
                        <div className="validation-error" role="alert">
                          {serverError}
                        </div>
                      )}
                      <input
                        type="email"
                        name="employee_email"
                        value={employee_email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Employee email"
                      />
                      {emailError && (
                        <div className="validation-error" role="alert">
                          {emailError}
                        </div>
                      )}
                    </div> */}
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="employee_first_name"
                        value={employee_first_name}
                        onChange={(event) => setFirstName(event.target.value)}
                        placeholder="Employee first name"
                      />
                      {firstNameRequired && (
                        <div className="validation-error" role="alert">
                          {firstNameRequired}
                        </div>
                      )}
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="employee_last_name"
                        value={employee_last_name}
                        onChange={(event) => setLastName(event.target.value)}
                        placeholder="Employee last name"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="employee_phone"
                        value={employee_phone}
                        onChange={(event) => setPhoneNumber(event.target.value)}
                        placeholder="Employee phone (555-555-5555)"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <select
                        name="employee_role"
                        value={company_role_id}
                        onChange={(event) =>
                          setCompanyRole(event.target.value)
                        }
                        className="custom-select-box"
                      >
                        <option value="1">Employee</option>
                        <option value="2">Manager</option>
                        <option value="3">Admin</option>
                      </select>
                    </div>

                    {/* <div className="form-group col-md-12">
                      <input
                        type="password"
                        name="employee_password"
                        value={employee_password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Employee password"
                      />
                      {passwordError && (
                        <div className="validation-error" role="alert">
                          {passwordError}
                        </div>
                      )}
                    </div> */}

                    <div className="form-group col-md-12">
                      <label>
                        <input
                          type="checkbox"
                          checked={active_employee}
                          onChange={(event) =>
                            setActiveEmployee(event.target.checked)
                          }
                        />
                        Is active employee
                      </label>
                    </div>

                    <div className="form-group col-md-12">
                      <button
                        className="theme-btn btn-style-one"
                        type="submit"
                        data-loading-text="Please wait..."
                      >
                        <span>Update</span>
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
  );
}

export default EmployeeUpdateForm;
