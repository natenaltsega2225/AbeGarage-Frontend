// Import from the env
const api_url = import.meta.env.VITE_API_URL;

if (!api_url) {
   throw new Error(
      "API URL is not defined. Please check your environment variables."
   );
}

// A function to send a POST request to create a new customer
// const createCustomer = async (formData, loggedInEmployeeToken) => {
//    if (!loggedInEmployeeToken) {
//       throw new Error("Employee token is missing. Please log in again.");
//    }

//    const requestOptions = {
//       method: "POST",
//       headers: {
//          "Content-Type": "application/json",
//          "x-access-token": loggedInEmployeeToken,
//       },
//       body: JSON.stringify(formData),
//    };

//    const response = await fetch(`${api_url}/api/customers`, requestOptions);
//    if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.message || "Failed to create customer");
//    }
//    return await response.json();
// };

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

// A function to fetch a customer by their ID
const getCustomerById = async (customerId, loggedInEmployeeToken) => {
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
         `${api_url}/api/customers/${customerId}`,
         requestOptions
      );
      if (!response.ok) {
         const error = await response.json();
         throw new Error(error.message || "Failed to fetch customer by ID");
      }
      return await response.json(); // Parsing response body as JSON
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

// Export all the functions
const customerService = {
//    createCustomer,
   getAllCustomers,
   getCustomerById,
   searchCustomers,
};

export default customerService;
