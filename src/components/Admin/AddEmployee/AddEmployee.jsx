import React, { useState } from 'react'
import classes from "./AddEmployee.module.css"
import axios from "axios"
import { ADDEMPLOYEE } from '../../../utils/constant';
import {useAppStore} from '../../../hook/store';
import {toast} from 'react-toastify'

function AddEmployee() {
  const [email, setEmail] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const {addEmployee} = useAppStore();

  const handleSubmit = async () => {
    if (!email || !first_name || !last_name || !phone || !role) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(ADDEMPLOYEE,{first_name,last_name,email,phone,role},{withCredentials:true});
      console.log("response from  ADDEMPLOYEE: ", response);
      if(response.data.success){
        addEmployee(response.data.data);
        console.log("ADDED EMPLOYEE", response.data.data);
        toast.success("Employee Added Successfully");
        setEmail("");
        setFirst_name("");
        setLast_name("");
        setPhone("");
        setRole("");
        setError("");
        setLoading(false);
      
      }else {
        setError(response.data.message);
        toast.error(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }



  return (
    <div className={classes.AddEmployee}>
         <div className={classes.container}>
            <div className={classes.header}> 
                <h3>Add a new Employee</h3>
                <div className={classes.line}></div>
            </div>
            <div className={classes.form}>
               <div className={classes.form_login}>
                <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Employee email'/>
               </div>
               <div className={classes.form_login}>
                <input type="text" placeholder='Employee first name' value={first_name} onChange={(e)=>setFirst_name(e.target.value)}/>
               </div>
               <div className={classes.form_login}>
                <input type="text" placeholder='Employee last name' value={last_name} onChange={(e)=>setLast_name(e.target.value)}/>
               </div>
               <div className={classes.form_login}>
                <input type="text" placeholder='Employee phone (555-555-5555' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
               </div>
               <div className={`${classes.form_login} ${classes.select}`}>
                    <select value={role} onChange={(e)=>setRole(e.target.value)}>
                        <option value="">Select Role</option>
                        <option value="employee">Employee</option>
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                    </select>
               </div>
               <button className={classes.btn} onClick={handleSubmit}>{isLoading?"Loading ...":"ADD EMPLOYEE"}</button>
            </div>
         </div>
    </div>
  )
}

export default AddEmployee