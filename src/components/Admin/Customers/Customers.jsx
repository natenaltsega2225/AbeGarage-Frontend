import React, { useEffect, useState } from 'react'
import classes from "./Customers.module.css"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { MdOutlineReadMore } from "react-icons/md";
import moment from 'moment';
import axios from 'axios';
import { useAppStore } from '../../../hook/store';
import { GETALLCUSTOMERS } from '../../../utils/constant';
import { useNavigate } from 'react-router-dom';
import spinner from '../../../assets/Spinning_wheel.gif';


function Customers() {
    const {customerList,setCustomerList, setSelectedCustomer, isMobile} = useAppStore();
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    const getAllCustomer = async () => {
      try {
          setLoading(true);
          const response = await axios.get(GETALLCUSTOMERS,{withCredentials:true});
          if(response.data.success){
            console.log("CUSTOMER FOUND")
            setCustomerList(response.data.data);
            setLoading(false);
          }
          console.log("CUSTOMERS: ", response)
      } catch (error) {
        setLoading(false);
        console.log("Error: " ,error)
      }
    }

    console.log("CUSTOMERS: ", customerList)

    useEffect(()=>{
      if(customerList.length === 0){
        getAllCustomer()
      }
    },[])

    const formatDate = (timestamp) => moment(timestamp).format("MMM DD, YYYY");

     if(isLoading){ 
         return <div className={classes.loading}>
             <img src={spinner} alt="Loading" />
         </div>
     }

    const handleEdit = (customer) => {
      setSelectedCustomer(customer)
      navigate("/admin/edit-customer")
    }

    const handleMore = (customer) => {
      setSelectedCustomer(customer)
      navigate("/admin/customer-details")
    }

  return (
    <div className={classes.Customers}>
         <div className={classes.container}>
                    <div className={classes.header}> 
                        <h3>Customers</h3>
                        <div className={classes.line}></div>
                    </div>
                    <div className={classes.search}>
                        <div className={classes.searchContent}>
                            <input type="text" placeholder='Search for a customer using first name, last name, email address of phone number' />
                            <p><CiSearch/></p>
                        </div>
                    </div>
                    <div className={classes.table}>
                        <table>
                            <thead>
                                <tr>
                                    {!isMobile && <th>ID</th>}
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    { !isMobile && <th>Added Date</th>}
                                    <th>Active</th>
                                    <th>Edit / Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    customerList?.length > 0 
                                    ? 
                                    customerList?.map((customer, index) => (
                                        <tr key={index} style={{backgroundColor: index % 2 !== 0 ? "#f2f2f2" : "white"}}>
                                           { !isMobile &&  <td>{index + 1}</td> }
                                            <td>{customer.first_name}</td>
                                            <td>{customer.last_name}</td>
                                            <td>{customer.email}</td>
                                            <td>{customer.phone}</td>
                                            {!isMobile && <td>{formatDate(customer.added_date)}</td>}
                                            <td>{customer.status ? "Yes":"No"}</td>
                                            <td>
                                                <button onClick={()=>handleEdit(customer)}><FaEdit /></button>
                                                <button  onClick={()=>handleMore(customer)}><MdOutlineReadMore/></button>
                                            </td>
                                        </tr>
                                    ))
                                    : <tr><td colSpan="8">No data</td></tr>
                                }
                            </tbody>
                        </table>
                    </div>
          </div>
    </div>
  )
}

export default Customers