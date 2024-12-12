import React, { useEffect, useState } from "react";
import customerService from "../.../../../../../../Services/customer.service"; // Assuming the correct path
import { useAuth } from "../../../../../Contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

function EditCustomerForm() {
  // Define the state for form fields
  const [customer_email, setEmail] = useState("");
  const [customer_first_name, setFirstName] = useState("");
  const [customer_last_name, setLastName] = useState("");
  const [customer_phone_number, setPhoneNumber] = useState("");
  const [active_customer_status, setActiveCustomer] = useState(false); // Checkbox state

  // Define error states
  const [serverError, setServerError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [firstNameRequired, setFirstNameRequired] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const  {customer_hash} = useParams();

  // Create a variable to hold the user's token
  let loggedInEmployeeToken = "";
  // Destructure the auth hook and get the token
  const { employee } = useAuth();
  if (employee && employee.employee_token) {
    loggedInEmployeeToken = employee.employee_token;
  }

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Construct the form data
    const formData = {
      // uuid, replace this with customerId
      customer_hash,
      customer_email,
      customer_first_name,
      customer_last_name,
      customer_phone_number,
      active_customer_status,
    };

    // Call the service to update a customer
    customerService
      .updateSingleCustomer(formData, loggedInEmployeeToken)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.error || data.errors) {
          setServerError(data.error || data.errors);
        } else {
          setSuccess(true);
          setServerError("");
          navigate("/admin/customers"); // Redirect to the customers list after successful update
        }
      })
      .catch((error) => {
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
    const fetchCustomerData = async () => {
      try {
        const data = customerService
          ?.getCustomerById(customer_hash, loggedInEmployeeToken)
          .then((res) => res.json())
          .then((data) => {
          console.log(data)
            setEmail(data?.customer_email);
            setFirstName(data?.customer_first_name);
            setLastName(data?.customer_last_name);
            setPhoneNumber(data?.customer_phone_number);
            setActiveCustomer(data?.active_customer_status);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchCustomerData();
  }, []);

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>
            Edit: {customer_first_name} {customer_last_name}
          </h2>
          <h4>Customer email: {customer_email}</h4>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit} className="formSize">
                  <div className="row clearfix">
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_first_name"
                        value={customer_first_name}
                        onChange={(event) => setFirstName(event.target.value)}
                        placeholder="Customer first name"
                        required
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
                        name="customer_last_name"
                        value={customer_last_name}
                        onChange={(event) => setLastName(event.target.value)}
                        placeholder="Customer last name"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_phone"
                        value={customer_phone_number}
                        onChange={(event) => setPhoneNumber(event.target.value)}
                        placeholder="Customer phone (555-555-5555)"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <label>
                        <input
                          type="checkbox"
                          checked={active_customer_status}
                          onChange={(event) =>
                            setActiveCustomer(event.target.checked)
                          }
                        />
                        Is active customer
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

export default EditCustomerForm;
