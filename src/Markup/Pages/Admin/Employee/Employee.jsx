import React from 'react'
import Layout from '../../Layout/Layout'
import AddEmployeeForm from "../../../Components/Admin/AddEmployee/AddEmployeeForm"
import Sidebar from '../../../Components/Admin/SideBar/Sidebar';
function Employee() {
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <AddEmployeeForm />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Employee