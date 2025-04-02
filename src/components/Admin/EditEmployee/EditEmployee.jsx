import React, { use, useEffect, useState } from 'react'
import classes from "./EditEmployee.module.css"
import { useAppStore } from '../../../hook/store'
import { set } from 'date-fns';
import { EDITEMPLOYEE } from '../../../utils/constant';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function EditEmployee() {
    const {selectedEmployee, editEmployeeList} = useAppStore();
    const [first_name, setFirst_name] = useState(selectedEmployee.first_name);
    const [last_name, setLast_name] = useState(selectedEmployee.last_name);
    const [email, setEmail] = useState(selectedEmployee.email);
    const [phone, setPhone] = useState(selectedEmployee.phone);
    const [role, setRole] = useState(selectedEmployee.role);
    const [isLoading, setLoading] = useState(false);
    const [status, setStatus] = useState(selectedEmployee.status);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            setLoading(true);
            if(!first_name || !last_name || !email || !phone || !role || !status){
                return toast.error("All fields are required");
            }
            const response = await axios.put(EDITEMPLOYEE, {id: selectedEmployee._id,first_name, last_name, email, phone, role, status,}, {withCredentials: true});
            console.log("RESPONSE: ", response);
            if(response.data.success){
                setLoading(false);
                editEmployeeList(response.data.data);
                navigate("/admin/employees");
                toast.success("Employee updated successfully");
            }else {
                setLoading(false);
                toast.error(`Error occured: ${response.data.message}`);
            }
            
        } catch (error) {
            setLoading(false);
            console.log("Error: ", error);
        }
    }


  return (
    <div className={classes.EditEmployee}>
        <div className={classes.header}> 
            <h3>{`Edit: ${selectedEmployee.first_name} ${selectedEmployee.last_name}`}</h3>
            <div className={classes.line}></div>
        </div>

        <p className={classes.email}>{`Employee email: ${selectedEmployee.email}`}</p>

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
                <div className={classes.form_login}>
                    <select value={role} onChange={(e)=>setRole(e.target.value)}>
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="employee">Employee</option>
                    </select>
                </div>
              <button className={classes.btn} onClick={handleSubmit}>{isLoading? "Loading ..." :"UPDATE"}</button>
        </div>
    </div>
  )
}

export default EditEmployee;