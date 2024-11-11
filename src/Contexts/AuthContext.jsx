import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // for redirecting after logout
import getAuth from "../util/auth"; // Assuming you have a utility function to fetch auth details

// Creating the AuthContext
const AuthContext = createContext();

// AuthProvider component to provide authentication state and actions
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing authentication state in localStorage or fetch user data
    const loggedInEmployee = getAuth();
    loggedInEmployee.then((response) => {
      if (response?.employee_token) {
        setIsLoggedIn(true);
        setEmployee(response);

        // If the user is an admin (role 3), set isAdmin to true
        if (response.employee_role === 3) {
          setIsAdmin(true);
        }
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  // Login function: Store token and set the login state
  const login = (response) => {
    localStorage.setItem("authToken", response.employee_token); // Store token
    setIsLoggedIn(true);
    setEmployee(response);
    if (response.employee_role === 3) {
      setIsAdmin(true); // Admin role handling
    }
  };

  // Logout function: Remove token and reset login state
  const logout = () => {
    localStorage.removeItem("authToken"); // Clear token
    setIsLoggedIn(false);
    setIsAdmin(false);
    setEmployee(null);
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isAdmin, employee, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};
