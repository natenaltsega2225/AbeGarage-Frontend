import React, { useState } from 'react'
import classes from "./EditCustomer.module.css"
import { useAppStore } from '../../../hook/store'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';
import { UPDATECUSTOMER } from '../../../utils/constant';

function EditCustomer() {
    const {selectedCustomer, editCustomerList} = useAppStore();
    const [first_name, setFirst_name] = useState(selectedCustomer.first_name);
    const [last_name, setLast_name] = useState(selectedCustomer.last_name);
    const [email, setEmail] = useState(selectedCustomer.email);
    const [phone, setPhone] = useState(selectedCustomer.phone);
    const [isLoading, setLoading] = useState(false);
    const [status, setStatus] = useState(selectedCustomer.status);
    console.log("SELECTED CUSTOMER: ", status)
    const navigate = useNavigate(); 

    const handleSubmit = async () => {
        try {
            setLoading(true);
            console.log("Status: ", status)
            const response = await axios.put(UPDATECUSTOMER,{id:selectedCustomer._id,email,first_name,last_name,phone,status},{withCredentials:true});
            if(response.data.success){
                editCustomerList(response.data.data);
                navigate("/admin/customers")
                toast.success("CUSTOMER UPDATEd")

                setLoading(false);
            }
            console.log("CUSTOMER: ", response)
        } catch (error) {
            setLoading(false);
            console.log("Error: " ,error)
        }
    }


  return (
     <div className={classes.EditCustomer}>
            <div className={classes.header}> 
                <h3>{`Edit: ${selectedCustomer.first_name} ${selectedCustomer.last_name}`}</h3>
                <div className={classes.line}></div>
            </div>
    
            <p className={classes.email}>{`Employee email: ${selectedCustomer.email}`}</p>
    
            <div className={classes.form}>
                  <div className={classes.form_login}>
                    <input type="text"  placeholder='Employee first name' value={first_name} onChange={(e)=>setFirst_name(e.target.value)}/>
                  </div>
                  <div className={classes.form_login}>
                    <input type="text" placeholder='Employee last name' value={last_name} onChange={(e)=> setLast_name(e.target.value)} />
                  </div>
                  <div className={classes.form_login}>
                    <input type="text" placeholder='Employee email' value={email} onChange={(e)=> setEmail(e.target.value)} />
                  </div>
                  <div className={classes.form_login}>
                    <input type="text" placeholder='Employee phone (555-555-5555' value={phone} onChange={(e)=> setPhone(e.target.value)} />
                </div>
                <div className={classes.checkbox}>
                  <input type="checkbox" checked={status} onChange={(e)=> setStatus(e.target.checked)} />
                  <p>Is active customer</p>
                </div>
                  <button className={classes.btn} onClick={()=>handleSubmit()}>{isLoading? "Loading ..." :"UPDATE"}</button>
            </div>
        </div>
  )
}

export default EditCustomer