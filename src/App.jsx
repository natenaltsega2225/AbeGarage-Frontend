import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Markup/Pages/Home/Home";
import Login from "./Markup/Pages/Login/Login";
import AddEmployee from "./Markup/Pages/Admin/Employee/AddEmployee/AddEmployee";
import Contact from "./Markup/Pages/Contact Us/Contact";
import About from "./Markup/Pages/About/About";
import "./assets/template_assets/css/bootstrap.css";
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";
//Import the custom css
import "./assets/styles/custom.css";
import PrivateAuthRoute from "./Markup/Components/Auth/PrivateAuthRoute";
import Unauthorized from "./Markup/Pages/Unauthorized";
import EmployeesList from "./Markup/Pages/Admin/Employee/EmployeeList/EmployeeList";
import Admin from "./Markup/Pages/Admin/AdminDashboard/Admin";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route
          path="admin/add-employee"
          element={
            <PrivateAuthRoute roles={[3]}>
              <AddEmployee />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/employees"
          element={
            <PrivateAuthRoute roles={[3]}>
              <EmployeesList />
              </PrivateAuthRoute>
          }/> 
        {/* Dashboard page route */}
        {/* <Route path="/admin" element={<Admin />} /> */}
        <Route
          path="/admin"
          element={
            <PrivateAuthRoute roles={[3]}>
              <Admin />
            </PrivateAuthRoute>
          }
        />
        <Route path="/Contact" element={<Contact />} />
        </Routes>
    </>
  );
}

export default App;
