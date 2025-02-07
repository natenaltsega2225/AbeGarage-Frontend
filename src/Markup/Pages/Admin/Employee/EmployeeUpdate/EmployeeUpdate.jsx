import React from 'react'
import Layout from '../../../Layout/Layout'
import EmployeeUpdateForm from '../../../../Components/Admin/EmployeeUpdateForm/EmployeeUpdateForm'
import Sidebar from '../../../../Components/Admin/Sidebar/Sidebar'

function EmployeeUpdate() {
  return (
<Layout>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <Sidebar />
          </div>
          <div className="col-md-9">
          <EmployeeUpdateForm/>
          </div>
        </div>
      </div>
    </Layout>
  );
}


export default EmployeeUpdate