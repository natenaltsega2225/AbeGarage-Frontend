import React, { useState } from 'react'
import classes from "./AddCustomer.module.css"
import { toast } from 'react-toastify';
import axios from 'axios';
import { ADDCUSTOMER } from '../../../utils/constant';
import { useAppStore } from '../../../hook/store';

function AddCustomer() {
  const [email, setEmail] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [phone, setPhone] = useState("");
  const [iseLoading, setLoading] = useState(false);
  const {addCustomer} = useAppStore();

  const handleSubmit = async ()=> {
    try {
      setLoading(true);
      if(!email || !first_name || !last_name || !phone){
        setLoading(false);
        return toast.error("All Feilds are required")

      } 
      const response = await axios.post(ADDCUSTOMER,{email, first_name, last_name, phone},{withCredentials: true});
      if(response.data.success){
        setLoading(false);
        addCustomer(response.data.data);
        toast("Customer Added successfully")
      }else {
        setLoading(false);
        toast(`Error occured: ${response.data.message}`);
      }
      console.log("CUSTOMER: ", response);
    } catch (error) {
      setLoading(false);
      toast.error("Error occured", error);
      console.log("Error", error);
    }
     
  }

  return (
    <div className={classes.AddCustomer}>
        <div className={classes.container}>
            <div className={classes.header}> 
                <h3>Add a new customer</h3>
                <div className={classes.line}></div>
            </div>
            <div className={classes.form}>
               <div className={classes.form_login}>
                <input type="text"  placeholder='Customer email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
               </div>
               <div className={classes.form_login}>
                <input type="text" placeholder='Customer first name' value={first_name} onChange={(e)=>setFirst_name(e.target.value)}/>
               </div><div className={classes.form_login}>
                <input type="text" placeholder='Customer last name' value={last_name} onChange={(e)=>setLast_name(e.target.value)}/>
               </div><div className={classes.form_login}>
                <input type="text" placeholder='Customer phone (555-555-5555' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
               </div>
              
               <button className={classes.btn} onClick={()=>handleSubmit()}>{iseLoading?"Loading .." : "ADD CUSTOMER"}</button>
            </div>
         </div>
    </div>
  )
}

export default AddCustomer