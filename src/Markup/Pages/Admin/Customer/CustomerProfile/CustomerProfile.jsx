import React from "react";
import SideBar from "../../../../Components/Admin/Sidebar/Sidebar"
import CustomerProfile from "../../../../components/Admin/Customer/CustomerProfile/CustomerProfile";

function AddOrderPage() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <SideBar />
          </div>
          <div className="col-md-9">
            <CustomerProfile />
          </div>
        </div>
      </div>
    </>
  );
}

export default AddOrderPage;
