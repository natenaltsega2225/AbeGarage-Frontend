

import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Markup/Pages/Home/Home'
import Login from './Markup/Pages/Login/Login';
import Employee from './Markup/Pages/Admin/Employee/Employee';
import "./assets/template_assets/css/bootstrap.css"
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";
//Import the custom css
import "./assets/styles/custom.css"
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-employee" element={<Employee />} />
      </Routes>
    </>
  );
}

export default App;

// import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';  // Assuming you're using React Router for navigation
// import Header from './Header';

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const history = useHistory();

//   // Check if the token is present in localStorage when the app loads
//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     setIsLoggedIn(!!token); // Set true if token exists, false otherwise
//   }, []);

//   const handleLogout = () => {
//     // Remove the authentication token
//     localStorage.removeItem('authToken');
//     setIsLoggedIn(false);
    
//     // Redirect to login page or default page
//     history.push('/login');
//   };

//   return (
//     <div>
//       <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
//       {/* Other components here */}
//     </div>
//   );
// };

// export default App;