// Import from the env
const api_url = import.meta.env.VITE_API_URL;

if (!api_url) {
  throw new Error(
    "API URL is not defined. Please check your environment variables."
  );
}

// A function to send a POST request to create a new customer
const createCustomer = async (formData, loggedInEmployeeToken) => {
  if (!loggedInEmployeeToken) {
    throw new Error("Employee token is missing. Please log in again.");
  }

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
    body: JSON.stringify(formData),
  };

  const response = await fetch(`${api_url}/api/add-customer`, requestOptions);
  if (!response == 200) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create customer");
  }
  return response;
};

// A function to fetch all customers (GET request)
const getAllCustomers = async (token) => {
  //    if (!token) {
  //       throw new Error("Employee token is missing. Please log in again.");
  //    }

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };

  try {
    const response = await fetch(`${api_url}/api/customers`, requestOptions);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch all customers");
    }
    return response; // Parsing response body as JSON
  } catch (error) {
    console.error("Error fetching all customers:", error);
    throw error;
  }
};
//A function to send get request to get single customer
const getSingleCustomer = async (customer_hash, token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(
    `${api_url}/api/customer/${customer_hash}`,
    requestOptions
  );
  return response;
};
// A function to fetch a customer by their ID
const getCustomerById = async (customer_hash, loggedInEmployeeToken) => {
  // if (!loggedInEmployeeToken) {
  //    throw new Error("Employee token is missing. Please log in again.");
  // }

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
  };

  try {
    const response = await fetch(
      `${api_url}/api/customer/${customer_hash}`,
      requestOptions
    );
    if (!response == 200) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch customer by ID");
    }
    return response; // Parsing response body as JSON
  } catch (error) {
    console.error("Error fetching customer by ID:", error);
    throw error;
  }
};

// A function to search for customers by query
const searchCustomers = async (query, loggedInEmployeeToken) => {
  if (!loggedInEmployeeToken) {
    throw new Error("Employee token is missing. Please log in again.");
  }

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
  };

  try {
    const response = await fetch(
      `${api_url}/api/customers/search?query=${encodeURIComponent(query)}`,
      requestOptions
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch customers");
    }
    return await response.json(); // Parsing response body as JSON
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

// to update a customer data
const updateSingleCustomer = async (formData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
    body: JSON.stringify(formData),
  };
  const response = await fetch(
    `${api_url}/api/update-customer/${formData.customer_hash}`,
    requestOptions
  );
  return response;
};
// Export all the functions
const customerService = {
  createCustomer,
  getAllCustomers,
  getSingleCustomer,
  getCustomerById,
  searchCustomers,
  updateSingleCustomer,
};

export default customerService;
