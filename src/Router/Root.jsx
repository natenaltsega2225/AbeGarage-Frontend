// Root.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import LoginPage from "./LoginPage"; // Assuming LoginPage is another component for login

const Root = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/*" element={<App />} />
    </Routes>
  </Router>
);

export default Root;
