import React from "react";
import Sidebar from "../../../Components/Admin/Sidebar/Sidebar";
import SelectVehicle from "../../../Components/Admin/SelectVehicle/SelectVehicle";
import Layout from "../../Layout/Layout";
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
                <SelectVehicle />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Orders;
