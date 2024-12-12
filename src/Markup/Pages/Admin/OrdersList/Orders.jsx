import React from "react";
import Layout from "../../Layout/Layout";
import Sidebar from "../../../Components/Admin/SideBar/Sidebar";
import OrdersList from "../../../Components/Admin/OrdersList/OrdersList";



function Orders() {
  return (
    <>
      <Layout>
        <div>
          <div className="container-fluid admin-pages">
            <div className="row">
              <div className="col-md-3 admin-left-side">
                <Sidebar />
              </div>
              <div className="col-md-9">
                <OrdersList />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Orders;
