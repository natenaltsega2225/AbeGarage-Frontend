import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Markup/Pages/Home/Home";
import Login from "./Markup/Pages/Login/Login";
import AddEmployee from "./Markup/Pages/Admin/Employee/AddEmployee/AddEmployee";
import EmployeesList from "./Markup/Pages/Admin/Employee/EmployeeList/EmployeeList";
import AddCustomer from "./Markup/Pages/Admin/Customer/addCustomer/addCustomer";
import Admin from "./Markup/Pages/Admin/AdminDashboard/Admin";
import EmployeeUpdate from "./Markup/Pages/Admin/Employee/EmployeeUpdate/EmployeeUpdate";
import Contact from "./Markup/Pages/Contact Us/Contact";
import About from "./Markup/Pages/About/About";
import NewOrders from "./Markup/Pages/Admin/NewOrders/NewOrders";
import "./assets/template_assets/css/bootstrap.css";
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";
//Import the custom css
import "./assets/styles/custom.css";
import PrivateAuthRoute from "./Markup/Components/Auth/PrivateAuthRoute";
import Unauthorized from "./Markup/Pages/Unauthorized";
import Servicespage from "./Markup/Pages/Services/Services";
import Services from "./Markup/Pages/Admin/Services/Services";
import EditServices from "./Markup/Pages/Admin/EditServices/EditServices";
import EditCustomer from "./Markup/Pages/Admin/Customer/EditCustomer/EditCustomer";
import Orders from "./Markup/Pages/Admin/OrdersList/Orders";
import OrderDetailsPage from "./Markup/Pages/Admin/OrderDetailsPage/OrderDetailsPage";
import CustomerProfile from "./Markup/Pages/Admin/Customer/CustomerProfile/CustomerProfile";
import CustomerList from "./Markup/Pages/Admin/Customer/CustomerList/CustomerList";
import SelectVehicle from "./Markup/pages/Admin/SelectVehicle/SelectVehicle";

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
          }
        />

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
        <Route
          path="/admin/employee-update/:uuid"
          element={
            <PrivateAuthRoute roles={[3]}>
              <EmployeeUpdate />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/customer-update/:customer_hash"
          element={
            <PrivateAuthRoute roles={[3]}>
              <EditCustomer />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/customers"
          element={
            <PrivateAuthRoute roles={[3]}>
              <CustomerList />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/order"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <NewOrders />
            </PrivateAuthRoute>
          }
        />

        <Route path="/Contact" element={<Contact />} />

        <Route
          path="/admin/services"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <Services/>
            </PrivateAuthRoute>
          }
        />
       
        <Route
          path="/admin/orders"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <Orders />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/orders/:order_hash"
          element={
            <PrivateAuthRoute roles={[3, 2, 1]}>
              <OrderDetailsPage />
            </PrivateAuthRoute>
          }
        />
        <Route path="/Contact" element={<Contact />} />
        <Route
          path="/admin/select-vehicle/:customer_hash"
          element={
            <PrivateAuthRoute roles={[3]}>
              <SelectVehicle />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/add-customer"
          element={
            <PrivateAuthRoute roles={[3]}>
              <AddCustomer />
            </PrivateAuthRoute>
          }
        />
        {/* Customer page routes end Here */}
        <Route
          path="/admin/customer-profile/:customer_hash"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <CustomerProfile />
            </PrivateAuthRoute>
          }
        />
        {/* Services page routes start Here */}
        <Route path="/services" element={<Servicespage />} />

        <Route
          path={`/admin/services/service-update/:id`}
          element={<EditServices />}
        />
        {/* Services page routes end Here */}
      </Routes>
    </>
  );
}

export default App;