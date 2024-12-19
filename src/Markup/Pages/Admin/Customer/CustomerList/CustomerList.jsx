// import React from "react";

import SideBar from "../../../../Components/Admin/Sidebar/Sidebar";

import CustomerList from "../../../../Components/Admin/Customer/CustomerList/CustomerList";

function Customer() {
  return (
    <div className="container-fluid admin-pages">
      <div className="row">
        <div className="col-md-3 admin-left-side">
          <SideBar />
        </div>

        <div className="col-md-9">
          <CustomerList />
        </div>
      </div>
    </div>
  );
}

export default Customer;
