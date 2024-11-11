// src/Contexts/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";

// Create the context
export const AuthContext = createContext();

// AuthProvider component that wraps the app
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    // Retrieve saved user data from localStorage, if available
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });

  // Update localStorage when authState changes
  useEffect(() => {
    if (authState) {
      localStorage.setItem("user", JSON.stringify(authState));
    } else {
      localStorage.removeItem("user");
    }
  }, [authState]);

  // Login function
  const login = (userData) => {
    setAuthState(userData);
  };

  // Logout function
  const logout = () => {
    setAuthState(null);
  };

  // Provide the context to children components
  return (
    <AuthContext.Provider value={{ authState, setAuthState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
