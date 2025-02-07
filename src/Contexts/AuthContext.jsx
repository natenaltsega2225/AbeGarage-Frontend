// Import React and the Hooks we need here
import React, { useState, useEffect, useContext } from "react";
// Import the Util function we created to handle the reading from the local storage
import getAuth from "../util/auth.jsx";
// Create a context object
const AuthContext = React.createContext();
// Create a custom hook to use the context
export const useAuth = () => {
  return useContext(AuthContext);
};
// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [employee, setEmployee] = useState(null);

  // Track whether orders have been updated
  const [ordersUpdated, setOrdersUpdated] = useState(false);

  // Function to toggle the `ordersUpdated` state
  const toggleOrdersUpdated = () => {
    setOrdersUpdated((prev) => !prev);
  };

  const value = {
    isLogged,
    isAdmin,
    setIsAdmin,
    setIsLogged,
    employee,
    ordersUpdated, // Provide `ordersUpdated` in the context
    toggleOrdersUpdated, // Provide function to toggle, `ordersUpdated` in the context
  };

  useEffect(() => {
    // Retrieve the logged-in user from local storage
    const loggedInEmployee = getAuth();
    loggedInEmployee.then((response) => {
      if (response.employee_token) {
        setIsLogged(true);
        // 3 is the employee_role for admin
        if (response.employee_role === 3) {
          setIsAdmin(true);
        }
        setEmployee(response);
      }
    });
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};