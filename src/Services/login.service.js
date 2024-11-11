// Import the environment variables
const api_url = import.meta.env.VITE_API_URL;

// A function to send the login request to the server
const logIn = async (formData) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };
<<<<<<< HEAD

  console.log("About to send request:", requestOptions);

  try {
    const response = await fetch(
      `${api_url}/api/employee/login`,
      requestOptions
    );
    console.log("Raw response:", response); // Log the raw response object
=======
  
  console.log("About to send request:", requestOptions);

  try {
    const response = await fetch(`${api_url}/api/employee/login`, requestOptions);
    console.log("Raw response:", response);  // Log the raw response object
>>>>>>> origin/main

    // Check if the response is okay
    if (!response.ok) {
      console.error("Failed to login:", response.status, response.statusText);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response; // Return the response for further processing
  } catch (error) {
    console.error("Error in logIn function:", error);
<<<<<<< HEAD
    throw error; // Propagate the error to the calling function
  }
};

=======
    throw error;  // Propagate the error to the calling function
  }
};


>>>>>>> origin/main
// A function to log out the user
const logOut = () => {
  localStorage.removeItem("employee");
};

// Export the functions
export default {
  logIn,
  logOut,
};
