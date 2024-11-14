const decodeTokenPayload = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join("")
  );
  return JSON.parse(jsonPayload);
};

// Function to get the auth details from localStorage
const getAuth = async () => {
  const token = getAuthToken(); // Retrieve token using the helper function
  if (token) {
    const decodedToken = await decodeTokenPayload(token);
    const employee = {
      employee_token: token,
      employee_role: decodedToken.employee_role,
      employee_id: decodedToken.employee_id,
      employee_first_name: decodedToken.employee_first_name,
    };
    return employee;
  } else {
    return {}; // No token available, return empty object
  }
};

// Function to set the auth token in localStorage
export const setAuthToken = (token) => {
  localStorage.setItem("authToken", token);
};

// Function to get the auth token from localStorage
export const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

// Function to remove the auth token from localStorage
export const removeAuthToken = () => {
  localStorage.removeItem("authToken");
};

// Export getAuth for use in other parts of the application
export default getAuth;
