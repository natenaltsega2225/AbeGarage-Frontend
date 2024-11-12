import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Markup/Pages/Home/Home";
import Login from "./Markup/Pages/Login/Login";
import Employee from "./Markup/Pages/Admin/Employee/Employee";
import Contact from "./Markup/Pages/Contact Us/Contact";
import "./assets/template_assets/css/bootstrap.css";
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";
//Import the custom css
import "./assets/styles/custom.css";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-employee" element={<Employee />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
