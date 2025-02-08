import React from "react";

// Import the Admin component
import AdminMenu from "../../../Components/Admin/Sidebar/Sidebar";
import AdminDashboard from "../../../Components/Admin/AdminDashboard/AdminDashboard";

// Import the auth hook context
import { useAuth } from "../../../../Contexts/AuthContext";

// Import the login component
import Login from "../../../Pages/Login/Login";
import Layout from "../../Layout/Layout";

function Admin() {
  const { isLogged,isAdmin } = useAuth();

  if (typeof isLogged === "undefined") {
    // Handle the loading state or return null
    return <div>Loading...</div>; // Optionally, you can show a loader/spinner
  }

  // if (isAdmin) {
    return (
      <Layout>
        <div className="container-fluid admin-pages">
          <div className="row">
            <div className="col-md-3 admin-left-side">
              <AdminMenu />
            </div>
            <div className="col-md-9 admin-right-side">
              <AdminDashboard />
            </div>
          </div>
        </div>
      </Layout>
    );
  // } else {
  //   return (
  //     <div className="login-container">
  //       <h5 className="login-message" style={{ color: "red" }}>
  //         You must log in to access the admin panel.
  //       </h5>
  //       <Login />
  //     </div>
  //   );
  // }
}

export default Admin;
