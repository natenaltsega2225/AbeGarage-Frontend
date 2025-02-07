import React from 'react'
import Layout from '../../../Layout/Layout'
import EditCustomerForm from '../../../../Components/Admin/Customer/EditCustomerForm/EditCustomerForm'
import Sidebar from '../../../../Components/Admin/Sidebar/Sidebar'

function EditCustomer() {
  return (
    <Layout>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <Sidebar />
          </div>
          <div className="col-md-9">
          <EditCustomerForm/>
          </div>
        </div>
      </div>





    </Layout>
  )
}

export default EditCustomer