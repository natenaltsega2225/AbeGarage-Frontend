// export default AddCustomerForm;
import React, { useState } from "react";
// import { BeatLoader } from "react-spinners";
import customerService from "../../../../../Services/customer.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../../Contexts/AuthContext";

function AddCustomerForm() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    activeStatus: true,
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  // Create a variable to hold the user's token
  let loggedInEmployeeToken = "";
  // Destructure the auth hook and get the token
  const { employee } = useAuth();
  if (employee && employee.employee_token) {
    loggedInEmployeeToken = employee.employee_token;
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { email, firstName, phoneNumber } = formData;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }

    if (!firstName) {
      setErrorMessage("First name is required.");
      return false;
    }

    if (!phoneNumber) {
      setErrorMessage("Phone number is required.");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const handleAddCustomer = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const { email, firstName, lastName, phoneNumber, activeStatus } =
        formData;
      const customerData = {
        customer_email: email,
        customer_first_name: firstName,
        customer_last_name: lastName,
        customer_phone_number: phoneNumber,
        active_customer_status: activeStatus ? 1 : 0,
      };

      const response = customerService
        .createCustomer(customerData, loggedInEmployeeToken)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          navigate("/admin/customers");
        });
      setSuccessMessage("Customer added successfully! Redirecting...");
    } catch (error) {
      console.log(error);
      setErrorMessage(error?.response?.data?.msg || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Add a New Customer</h2>
        </div>

        <div className="form-column col-lg-7">
          <div className="contact-form">
            {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleAddCustomer}>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Customer Email"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Phone Number (e.g., 555-555-5555)"
                  required
                />
              </div>

              <div className="form-group">
                <button
                  className="theme-btn btn-style-one"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <BeatLoader color="white" size={8} />
                  ) : (
                    "Add Customer"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddCustomerForm;
