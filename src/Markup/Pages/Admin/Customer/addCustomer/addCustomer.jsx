import React from "react";
import Layout from "../../../Layout/Layout";

import Sidebar from "../../../../Components/Admin/SideBar/Sidebar";
import AddCustomerForm from "../../../../Components/Admin/Customer/AddCustomer/AddCustomerForm";
function AddCustomer() {
  return (
    <Layout>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <AddCustomerForm/>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AddCustomer;
