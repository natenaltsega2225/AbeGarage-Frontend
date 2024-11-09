
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./App.css";
import Home from "./Markup/Pages/Home/Home";
import Login from "./Markup/Pages/Login/Login";
import Employee from "./Markup/Pages/Admin/Employee/Employee";
import Header from "../src/Markup/Components/Header/Header"; // Assuming you have a Header component
import "./assets/template_assets/css/bootstrap.css";
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";
import "./assets/styles/custom.css";

// Main App component
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  // Check if the token is present in localStorage when the app loads
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token); // Set true if token exists, false otherwise
  }, []);

  // Handle user logout
  const handleLogout = () => {
    // Remove the authentication token
    localStorage.removeItem("authToken");
    setIsLoggedIn(false); // Update login state
    // Redirect to login page or home
    navigate("/login");
  };

  return (
    <Router>
      <div>
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          {/* Conditional rendering based on login status */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/add-employee"
            element={isLoggedIn ? <Employee /> : <Login />}
          />
          {/* If not logged in, redirect to login when trying to access the add-employee page */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;