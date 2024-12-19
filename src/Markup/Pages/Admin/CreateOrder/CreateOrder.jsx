import React from "react";
import Layout from "../../Layout/Layout";
import Sidebar from "../../../Components/Admin/Sidebar/Sidebar";
import CreateOrder from "../../../Components/Admin/CreateOrder/CreateOrder";
function CreateOrderPage() {
  return (
    <Layout>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <CreateOrder />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateOrderPage;
