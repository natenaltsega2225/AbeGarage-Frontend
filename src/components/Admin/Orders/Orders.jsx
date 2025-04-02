import React, { useEffect, useRef, useState } from 'react'
import classes from './Orders.module.css'
import { BiSolidEdit } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useAppStore } from '../../../hook/store';
import spinner from '../../../assets/Spinning_wheel.gif';

import moment from "moment";
import { DELETEORDER, EDITORDER, EMPLOYEEFORWORK, GETALLORDER } from '../../../utils/constant';
import axios from 'axios';
import {toast} from "react-toastify";

function Orders() {

    const {orderList, removeOrder ,setOrderList, editOrderList, isMobile} = useAppStore();
    const [editOrder, setEditOrder] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [employeeList, setEmployeeList] = useState([]);
    const [employee, setEmployee] = useState("");
    const [isUpdating, setUpdating] = useState(false);
    const [isdelete, setDelete] = useState({});
    const [isdeleting, setDeleting] = useState(false);
    const [orderName, setOrderName] = useState("");
    const fetched = useRef(false);


    const getAllOrders = async() => {
        try {
            setLoading(true);
            const response = await axios.get(GETALLORDER,{withCredentials: true});
            // console.log("RESPONSE: ", response)
            if(response.data.success){
                setLoading(false);
                console.log(response.data.data);
                setOrderList(response.data.data);
                // toast(response.data.message);
            } else {
                setLoading(false);
                console.log(response.data.message);
                // toast.error(response.data.message);
            }
        } catch (error) {
            setLoading(false);
            toast.error("Something went wrong");
            console.log(error);
        }
    }
    
    const handleEdit = (item) => {
        setEditOrder(item);
    }

    const handleDeletOrder = async() => {
        if(orderName !== isdelete.customer_id.first_name){
            return toast.error("Enter the correct Word");
        }
        try{
            setDeleting(true);
            const response = await axios.delete(DELETEORDER, {data: { order_id: isdelete._id },withCredentials: true})
            if(response.data.success){
                       setDeleting({});
                       removeOrder(isdelete._id);
                       toast.success("Order Deleted successfully");
                       setDelete({});
                   } else{
                       setDeleting(false);
                       toast.error(response.data.message);
                   }
        } catch (error) {
            setDeleting(false);
            console.log("ERROR: ", error);
        }
    }

    useEffect(() => {
        let  fetch = false;
        // console.log("ORDER LIST", orderList.length)
        // console.log("FETCHED: ", fetched)
        if (!fetched.current && !fetch && orderList.length === 0) {
            fetch = true;
            // console.log("HI");
            fetched.current = true; // Set this immediately to prevent multiple calls
            getAllOrders();
            
        }
    }, []);

    const fetchAllEmployees = async() => {
        const response = await axios.get(EMPLOYEEFORWORK, {withCredentials: true});
        if(response.data.data){
            setEmployeeList(response.data.data);
        }else {
            console.log(response.data.message);
        }
        // console.log("RESPONSE: ", response)
    }

    if(isLoading){ 
        return <div className={classes.loading}>
            <img src={spinner} alt="Loading" />
        </div>
    }
    

    const getBgcolor = (status) => {
        switch(status) {
            case "pending":
                return "red";
            case "completed":
                return "green";
            case "In progress":
                return "yellow";
            case "Received":
                return "blue";
            default:
                return "black";
        }
    }
    const getColor = (status) =>{
        switch(status) {
            case "pending":
                return "white";
            case "completed":
                return "white";
            case "In progress":
                return "black";
            case "Received":
                return "white";
            default:
                return "white";
        }
    }
    const formatDate = (timestamp) => moment(timestamp).format("MMM DD, YYYY");

    const handleUpdate = async () => {
        try {
            console.log("EMPLOYEE: ",employee)
            if(!employee){
                return toast.error("You have to assign an Employee")
            }
            setUpdating(true)
            const response = await axios.put(EDITORDER,{employee_id: employee, order_id: editOrder._id},{withCredentials: true})
            if(response.data.success){
                setUpdating(false)
                toast.success("Update Successflyy")
                console.log("UPDATE: ", response.data.data);
                editOrderList(response.data.data)
                
            }else {
                setUpdating(false);
                toast.error(response.data.message)
            }
            console.log("EDIT ",response)
        } catch (error) {
            setUpdating(false)
            console.log("Error happened: ", error)
        }
    }

    if(editOrder._id && employeeList.length === 0){
        fetchAllEmployees()
    }

  return (        
     <div className={classes.Orders}>
        {isdelete._id && <div className={`${classes.overlay} ${classes.show}`}></div>}
        
        {
            !editOrder._id && 
            <div className={classes.container}>
                <div className={classes.header}> 
                    <h3>Orders</h3>
                    <div className={classes.line}></div>
                </div>
                <div className={classes.table}>
                    <table>
                        <thead>
                            <tr>
                                <th>Order No</th>
                                <th>Customer</th>
                                <th>Vehicle</th>
                                {!isMobile && <th>Order Date</th>}
                                {!isMobile && <th>Received by</th>}
                                <th>Order status</th>
                                <th>Edit / Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orderList?.length > 0 
                                ? 
                                orderList?.map((item, index) => (
                                    <tr key={index} style={{backgroundColor: index % 2 !== 0 ? "#f2f2f2" : "white"}}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <h2>{`${item.customer_id.first_name} ${item.customer_id.last_name}`}</h2>
                                            <p>{item.customer_id.email}</p>
                                            <p>{item.customer_id.phone}</p>
                                        </td>
                                        <td>
                                            <h2>{item.vehicle_id.make}</h2>
                                            <p>{item.vehicle_id.model}</p>
                                            <p>{item.vehicle_id.year}</p>
                                        </td>
                                        <td>
                                            <h2>{`${formatDate(item.createdAt)}`}</h2>
                                        </td>
                                        { !isMobile && <td>
                                            <h2>{item.employee_id ? `${item.employee_id.first_name} ${item.employee_id.last_name}`: "Not Assigned"}</h2>
                                        </td>}
                                        { !isMobile && <td>
                                            <p style={{backgroundColor:`${getBgcolor(item.status)}`, color:`${getColor(item.status)}`, textAlign:"center", borderRadius:"30px", padding:"3px 0"}}>{item.status}</p>
                                        </td>}
                                        <td style={{display:"flex", alignItems:"center", border: "none", paddingTop: "30px"}}>
                                            <p style={{fontSize:"20px"}} onClick={()=>handleEdit(item)}><FaEdit/></p>  <p style={{fontSize:"20px"}} onClick={()=> setDelete(item)}><MdDelete/></p></td>
                                    </tr>
                                ))
                                : <tr><td colSpan="8">No data</td></tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        }

        {
            editOrder._id && 
            <div className={classes.EditOrders}>
                <div className={classes.container}>               
                    <div className={classes.form}>
                        <div className={classes.header}> 
                            <h3>Edit Order</h3>
                            <div className={classes.line}></div>
                        </div>
                            <div>
                                <h3>Customer :</h3>
                                <p>{`${editOrder.customer_id.first_name} ${editOrder.customer_id.last_name}`}</p>
                            </div>
                            <div>
                                <h3>Email :</h3>
                                <p>{editOrder.customer_id.email}</p>
                            </div>
                            <div>
                                <h3>Phone :</h3>
                                <p>{editOrder.customer_id.phone}</p>
                            </div>

                            <div>
                                <h3>Vehicle :</h3>
                                <p>{`${editOrder.vehicle_id.make} ${editOrder.vehicle_id.model} ${editOrder.vehicle_id.year}`}</p>
                            </div>
                        
                            <div>
                                <h3>Order Created At :</h3>
                                <p>{formatDate(editOrder.createdAt)}</p>
                            </div>
                        
                        <div className={classes.formGroup} style={{display: `${ editOrder.status !== "Completed"? "block": "none"}`}}>
                            <label>Employee</label>
                            <select className={classes.select} value={employee}  onChange={(e) => setEmployee(e.target.value)} >
                                <option value="">Select Employee</option>
                                {
                                    employeeList.map((item,index)=> (
                                        <option value={item._id} key={index}>{`${item.first_name} ${item.last_name}`}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className={classes.formGroup} style={{display: `${ editOrder.status !== "Completed"? "block": "none"}`}}>
                            <button onClick={handleUpdate}>{isUpdating ? "Loading..." :"Update"}</button>
                        </div>
                    </div>
                    <div className={classes.serviceOrder}>
                        <div className={classes.service}>
                            <div className={classes.header}> 
                                <h3>Service Order</h3>
                                <div className={classes.line}></div>
                            </div>
                            {
                                // console.log("SERVICES: ", editOrder.services)
                                
                                editOrder.services.map((item, index) => (
                                    <div className={classes.serviceItem} key={index}>
                                        <div className={classes.serviceName}>
                                            <h3>{item.name}</h3>
                                            <p>{`${item.price} BIRR`}</p>
                                        </div>
                                        <p>{item.description}</p>
                                        
                                    </div>
                                ))
                            }
                            <h2>{`Total Price: ${editOrder.total} BIRR`}</h2>
                        </div>
                    </div>
                </div>
                <div className={classes.close} onClick={()=> setEditOrder({})}>
                    <p>X</p>
                </div>
            </div>
        }

         {isdelete._id && (
            <div className={classes.Delete}>
                <p>Are you sure you want to delete this Order? If yes, enter this in the box below: <span>{isdelete.customer_id.first_name}</span></p>
                <input type="text" placeholder='Enter the Name' value={orderName} onChange={(e) => setOrderName(e.target.value)} />
                <button onClick={handleDeletOrder}>{isdeleting ? "Loading" :"Delete"}</button>
                <div className={classes.close} onClick={()=> setDelete({})}><p>x</p></div>
            </div>
        )}
    </div>
    
  )
}


export default Orders;