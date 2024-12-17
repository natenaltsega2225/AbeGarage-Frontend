import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search as SearchIcon } from "@mui/icons-material";
import customerService from "../../../../Services/customer.service"; // Assuming an existing service for customer operations
import { useAuth } from "../../../../Contexts/AuthContext";
import PanToolAltIcon from "@mui/icons-material/PanToolAlt"; // Ensure this import for the action icon

const CreateOrders = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State to store search term
  const [searchResults, setSearchResults] = useState([]); // State to store search results
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const { employee } = useAuth();
  const [customers, setCustomers] = useState([]); // State to store customer data
  const [filteredCustomers, setFilteredCustomers] = useState([]); // State to store filtered customers data
  const token = employee?.employee_token; // Get employee token for authentication
  //console.log(token);

  useEffect(() => {
    const results = customerService.getAllCustomers(token);
    results
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCustomers(data); // Update state with customer data
      });
  }, []);
  // Debounce helper function for better search performance
  const debounce = (fn, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  };

  // Handle changes to the search input field
  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    const query = e.target.value.trim();
    if (query) {
      const filteredResults = customers.filter((customer) => {
        return (
          customer.customer_first_name
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          customer.customer_last_name
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          customer.customer_email.toLowerCase().includes(query.toLowerCase()) ||
          customer.customer_phone_number
            .toLowerCase()
            .includes(query.toLowerCase())
        );
      });
      setFilteredCustomers(filteredResults); // Update state with filtered customers data
    } else {
      setFilteredCustomers([]); // Reset filtered customers data if search term is empty
    }
  };

  // Navigate to the selected customer profile
  const handleCustomerSelect = (customerId) => {
    navigate(`/admin/select-vehicle/${customerId}`);
  };

  // Navigate to the add new customer page
  const handleAddCustomer = () => {
    navigate("/add_customer");
  };

  return (
    <div className="container mt-4">
      <div className="auto-container">
        <div className="contact-title">
          <h2>New Order</h2>
        </div>
      </div>

      {/* Search Bar */}
      {/* <div className="mt-5 mb-5">
        <div className="input-group" style={{ maxWidth: "960px" }}>
          <input
            type="text"
            className="form-control p-3"
            placeholder="Search for customers by name, email, or phone"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ paddingRight: "40px" }} // Adding space for the icon
          /> */}
      <div className="mt-5 mb-5">
        <div className="contact-form">
          <div className="form-group col-md-12">
            <input
              type="text"
              placeholder="Search by Name, Email, or Phone"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <button
            className="btn btn-link p-0 border-0"
            // onClick={fetchSearchResults}
            aria-label="Search"
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <SearchIcon style={{ color: "black", fontSize: "1.25rem" }} />
          </button>
        </div>
      </div>

      {/* Add Customer Button */}
      {!searchTerm.trim() && (
        <div className="mb-4 ml-3">
          <button
            className="theme-btn btn-style-one "
            onClick={handleAddCustomer}
            style={{
              backgroundColor: "#ff0000",
              color: "white", // Ensures text is readable
              border: "none", // Removes any border
            }}
          >
            ADD NEW CUSTOMER
          </button>
        </div>
      )}
      {/* Error Message */}
      {errorMessage && (
        <div className="alert alert-warning">{errorMessage}</div>
      )}

      {/* Loading Spinner */}
      {isLoading && <p className="text-muted">Searching...</p>}

      {/* Search Results */}
      {filteredCustomers?.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers?.map((customer, index) => (
                <tr key={customer.id}>
                  <td>{index + 1}</td> {/* Serial number */}
                  <td>{customer.customer_first_name}</td>
                  <td>{customer.customer_last_name}</td>
                  <td>{customer.customer_email}</td>
                  <td>{customer.customer_phone_number}</td>
                  <td>
                    {/* Action Icon */}
                    <PanToolAltIcon
                      className="text-primary"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        handleCustomerSelect(customer.customer_hash)
                      }
                      aria-label={`Select customer ${customer.first_name} ${customer.last_name}`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* No Results Message */}
      {/* {!isLoading && searchTerm && searchResults.length === 0 && (
            <p className="text-warning">No results found for "{searchTerm}".</p>
         )} */}
    </div>
  );
};

export default CreateOrders;
