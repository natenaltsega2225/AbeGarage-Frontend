import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Markup/Pages/Home/Home";
import Login from "./Markup/Pages/Login/Login";
import AddEmployee from "./Markup/Pages/Admin/Employee/AddEmployee/AddEmployee";
import Contact from "./Markup/Pages/Contact Us/Contact";
import About from "./Markup/Pages/About/About"
import "./assets/template_assets/css/bootstrap.css"
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";
//Import the custom css
import "./assets/styles/custom.css";
import PrivateAuthRoute from "./Markup/Components/Auth/PrivateAuthRoute";
import Unauthorized from "./Markup/Pages/Unauthorized";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized/>} />
        <Route path="/add-employee" element={
         <PrivateAuthRoute roles={[3]}>
          <AddEmployee />
          </PrivateAuthRoute>}
        />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
