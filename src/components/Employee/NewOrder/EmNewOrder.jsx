import React, { useEffect, useState } from 'react'
import classes from './NewOrder.module.css'
import { useAppStore } from '../../../hook/store'
import axios from 'axios';
import { COMPLETEORDER, GETNEWORDER } from '../../../utils/constant';
import { toast } from 'react-toastify';
import moment from 'moment';
import { FaEdit } from 'react-icons/fa';
import {useNavigate} from 'react-router-dom'

function EmNewOrder() {
  const {newOrder, addOrder, setNewOrder} = useAppStore();
  const [isLoading, setLoading] = useState(false);
  const [selected, setSelected] = useState(false);
  const [isUploading, setUploading] = useState(false);
  const [status, setStatus] = useState("");
  const navigate = useNavigate()

  useEffect(()=>{
    if(!newOrder._id){
      getNewOrder();
    }
  },[])

  const getNewOrder = async()=>{
    try {
      setLoading(true);
      const response = await axios.get(GETNEWORDER, {withCredentials: true});
      console.log("RESPONSE: ", response);
      if(response.data.success){
        setLoading(false);
        setNewOrder(response.data.data);
      }else {
        setLoading(false);
        // toast.error(response.data.message);
      }
      
    } catch (error) {
        console.log("ERROR: ", error)
    //   toast.error("Error in getting new order");
      setLoading(false);
    }
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

  const handleUpdate = async () =>{
    console.log("STATUS: ", status);
    try {
        if(status === "Completed") {
            
            setUploading(true)
            const response  = await axios.put(COMPLETEORDER, {orderId: newOrder._id,status}, {withCredentials: true});
            if(response.data.success) {
                setUploading(false)
                toast.success("Thanks for completing");
                setNewOrder({});
                addOrder(response.data.data);
                navigate('/dashboard/orders')
            } else {
                setUploading(false)
                toast.error(response.data.message)
            }
        }
    } catch (error) {
        setUploading(false)
        console.log("ERROR : ", error);
    }
  }

  return (
    <div className={classes.EmNewOrder}>
        {
            !selected ? 
            <>
            <div className={classes.header}> 
                <h3>New Orders</h3>
                <div className={classes.line}></div>
            </div>
            <div className={classes.table}>
            {
                isLoading ? <p>Loading</p> :
               newOrder._id ? <table>
                  <thead>
                      <tr>
                          <th>Customer</th>
                          <th>Vehicle</th>
                          <th>Order Date</th>
                          <th>Order status</th>
                          <th>Edit</th>
                      </tr>
                  </thead>
                  <tbody>
                      {
                          newOrder?._id   ?
                        <tr>
                            <td>
                                <h2>{`${newOrder.customer_id.first_name} ${newOrder.customer_id.last_name}`}</h2>
                                <p>{newOrder.customer_id.email}</p>
                                <p>{newOrder.customer_id.phone}</p>
                            </td>
                            <td>
                                <h2>{newOrder.vehicle_id.make}</h2>
                                <p>{newOrder.vehicle_id.model}</p>
                                <p>{newOrder.vehicle_id.year}</p>
                            </td>
                            <td>
                                <h2>{`${formatDate(newOrder.createdAt)}`}</h2>
                            </td>
                            <td>
                                <p style={{backgroundColor:`${getBgcolor(newOrder.status)}`, color:`${getColor(newOrder.status)}`, textAlign:"center", borderRadius:"30px", padding:"3px 0"}}>{newOrder.status}</p>
                            </td>
                            <td style={{display:"flex", alignItems:"center", border: "none", paddingTop: "30px"}}>
                            <p onClick={()=> setSelected(prev => !prev)}><FaEdit/></p></td>
                        </tr>
        
                    : <tr><td colSpan="8">No data</td></tr>
                }
            </tbody>
                </table> : <p>No new orders</p>
        }
        </div>
    </>
    : 
    <div className={classes.EditOrders}>
                <div className={classes.container}>               
                    <div className={classes.form}>
                        <div className={classes.header}> 
                            <h3>Edit Order</h3>
                            <div className={classes.line}></div>
                        </div>
                            <div>
                                <h3>Customer :</h3>
                                <p>{`${newOrder.customer_id.first_name} ${newOrder.customer_id.last_name}`}</p>
                            </div>
                            <div>
                                <h3>Email :</h3>
                                <p>{newOrder.customer_id.email}</p>
                            </div>
                            <div>
                                <h3>Phone :</h3>
                                <p>{newOrder.customer_id.phone}</p>
                            </div>
    
                            <div>
                                <h3>Vehicle :</h3>
                                <p>{`${newOrder.vehicle_id.make} ${newOrder.vehicle_id.model} ${newOrder.vehicle_id.year}`}</p>
                            </div>
                            
                            <div>
                                <h3>Order Created At :</h3>
                                <p>{formatDate(newOrder.createdAt)}</p>
                            </div>
                        
                        <div className={classes.formGroup}>
                            <label>Status</label>
                            <select value={status} onChange={(e)=> setStatus(e.target.value)}>
                                <option value="">Select Your Progress</option>
                                <option value="In progress">In progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                        <div className={classes.formGroup}>
                            <button onClick={handleUpdate}>{isUploading ? "Loading..." :"Update"}</button>
                        </div>
                    </div>
                    <div className={classes.serviceOrder}>
                        <div className={classes.service}>
                            <div className={classes.header}> 
                                <h3>Service Order</h3>
                                <div className={classes.line}></div>
                            </div>
                            {
                                // console.log("NEWORDER: ", newOrder)
                                
                                    newOrder.services.map((item, index) => (
                                        <div className={classes.serviceItem} key={index}>
                                            <div className={classes.serviceName}>
                                                <h3>{item.name}</h3>
                                                <p>{`${item.price} BIRR`}</p>
                                            </div>
                                            <p>{item.description}</p>
                                            
                                        </div>
                                    ))
                            }
                            <h2>{`Total Price: ${newOrder.total} BIRR`}</h2>
                        </div>
                    </div>
                </div>
                </div>
        }
       
    </div>
  )
}

export default EmNewOrder