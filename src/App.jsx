import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Make sure BrowserRouter is imported correctly
import { AuthProvider } from "./Contexts/AuthContext"; // Adjust path accordingly
import Home from "./Markup/Pages/Home/Home"; // Adjust path if needed
import Login from "./Markup/Pages/Login/Login"; // Adjust path if needed
import Employee from "./Markup/Pages/Admin/Employee/Employee"; // Adjust path if needed

// Import styles
import "./assets/template_assets/css/bootstrap.css";
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-employee" element={<Employee />} />
          {/* Add other routes as needed */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
