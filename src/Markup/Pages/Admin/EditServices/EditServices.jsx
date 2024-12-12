import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../Contexts/AuthContext";

import LoginForm from "../../Login/Login";
import AdminMenu from "../../../Components/Admin/Sidebar/Sidebar";
import EditService from "../../../Components/Admin/EditService/EditService";
import Layout from "../../Layout/Layout";

const EditServices = () => {
  const { isLogged, isAdmin } = useAuth();

  if (!isLogged) {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="not-found-container">
        <div className="not-found-content">
          <h2>
            {" "}
            You don&apos;t have the Permission to access the page you request!
          </h2>
          <Link className="back-home-link" to="/">
            <span> Back to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div>
        <div className="container-fluid admin-pages">
          <div className="row">
            <div className="col-md-3 admin-left-side">
              <AdminMenu />
            </div>
            <div className="col-md-9 admin-right-side">
              <EditService />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditServices;
