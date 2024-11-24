import React from 'react'
import Sidebar from '../../../../Components/Admin/SideBar/Sidebar';
import EmployeesList from '../../../../Components/Admin/AdminMenu/EmployeeList/EmployeeList';
import Layout from '../../../Layout/Layout';
function EmployeeList() {
  return (
    <Layout>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <EmployeesList />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default EmployeeList