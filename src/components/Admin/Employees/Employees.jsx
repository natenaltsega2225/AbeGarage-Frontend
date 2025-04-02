import React, { useEffect, useState } from 'react'
import classes from "./Employees.module.css"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { DELETEEMPLOYEE, GETALLEMPLOYEES } from '../../../utils/constant';
import { useAppStore } from '../../../hook/store';
import { format } from "date-fns";
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
import moment from "moment";
import spinner from '../../../assets/Spinning_wheel.gif';


import axios from 'axios';

function Employees() {

    
    const {employeeList, removeEmployee,setEmployeeList, setSelectedEmployee , isMobile} = useAppStore();
    const [isLoading, setLoading] = useState(false);
    const [isdelete, setDelete] = useState({});
    const [employeeName, setEmployeeName] = useState("");
    const [isdeleting, setDeleting] = useState(false);
    const navigate = useNavigate();

    const getAllEmployees = async() => {
        try {
            setLoading(true);
            const response = await axios.get(GETALLEMPLOYEES, {withCredentials: true});
            if(response.data.success){
                setEmployeeList(response.data.data);
                setLoading(false); 

            } else{
                setLoading(false)
                console.log("No data found");
            }
           
            // console.log("GETALLEMPLOYEES: ", response);
        } catch (error) {
            setLoading(false)
            console.log("Error: ", error)
        }
       
    }
    useEffect(() => {
        if (employeeList.length === 0) {
            getAllEmployees();
        }
    }, []);

    console.log("EMPLOYEES: ",employeeList);

    const formatDate = (timestamp) => moment(Number(timestamp)).format("MMM DD, YYYY");

    const getColor = (status) => {
        if(status === "initial") return "rgba(238, 238, 13, 0.52)";
        if(status === "active") return "rgba(99, 238, 13, 0.49)"
        if(status === "inactive") return "rgba(238, 13, 21, 0.49)";
    }
    if(isLoading){ 
        return <div className={classes.loading}>
            <img src={spinner} alt="Loading" />
        </div>
    }

    const handleSelectUser = (employee)=> {
        setSelectedEmployee(employee);
        navigate("/admin/edit_employee")
    }

    const handleDeleteUser = async() => {
        if(employeeName !== isdelete.first_name) {
            toast.error("Enter the right Name");
        }
        try {
            setDeleting(true);
            const response = await axios.delete(DELETEEMPLOYEE, {
                data: { id: isdelete._id },
                withCredentials: true
            });
            
            console.log("RESPONSE: ", response)
            if(response.data.success){
                setDelete(false);
                removeEmployee(isdelete._id);
                toast.success("Employee Deleted successfully");
                setDelete({});
                setEmployeeName("");
            } else{
                setDelete(false);
                toast.error(response.data.message);
            }
        } catch (error) {
            setDelete(false)
            console.log("ERROR: ", error);
        }
      
        
    }
    return (
        <div className={classes.Employees}>
            {/* Background Blur Effect */}
            {isdelete._id && <div className={`${classes.overlay} ${classes.show}`}></div>}
    
            <div className={classes.container}>
                <div className={classes.header}>
                    <h3>Employees</h3>
                    <div className={classes.line}></div>
                </div>
                <div className={classes.table}>
                    <table>
                        <thead>
                            <tr>
                                <th>Active</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                {!isMobile && <th>Phone</th>}
                                {!isMobile && <th>Added Date</th>}
                                <th>Role</th>
                                <th>Edit / Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employeeList?.length > 0 ? (
                                employeeList.map((employee, index) => (
                                    <tr key={index} style={{ backgroundColor: index % 2 !== 0 ? "#f2f2f2" : "white" }}>
                                        <td style={{ backgroundColor: getColor(employee.status) }}>{employee.status}</td>
                                        <td>{employee.first_name}</td>
                                        <td>{employee.last_name}</td>
                                        <td>{employee.email}</td>
                                        {!isMobile && <td>{employee.phone}</td>}
                                        {!isMobile && <td>{formatDate(employee.joined_date)}</td>}
                                        <td>{employee.role}</td>
                                        <td>
                                            <button onClick={() => handleSelectUser(employee)}><FaEdit /></button>
                                            <button onClick={() => setDelete(employee)}><MdDelete /></button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="8">No data</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
    
            {/* Delete Confirmation */}
            {isdelete._id && (
                <div className={classes.Delete}>
                    <p>Are you sure you want to delete this employee? If yes, enter this in the box below: <span>{isdelete.first_name}</span></p>
                    <input type="text" placeholder='Enter the Name' value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} />
                    <button onClick={handleDeleteUser}>{isdeleting ? "Loading" :"Delete"}</button>
                    <div className={classes.close} onClick={()=> setDelete({})}>x</div>
                </div>
            )}
        </div>
    );
    
    
}

export default Employees