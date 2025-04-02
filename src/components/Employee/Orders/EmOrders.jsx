import React, { useEffect, useState , useRef} from 'react'
import classes from './EmOrders.module.css'
import { data } from 'react-router-dom'
import { CiIndent } from 'react-icons/ci'
import { FaEdit } from 'react-icons/fa'
import moment from 'moment'
import {useAppStore} from '../../../hook/store'
import { GETEMPLOYEEORDER } from '../../../utils/constant'
import {toast} from 'react-toastify';
import axios from 'axios';

function EmOrders() {
    const { orders, setOrders} = useAppStore();
    const [isLoading, setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState({});
    const fetched = useRef(false);

    useEffect(()=>{
        if(orders.length === 0) {
            // fetched = true;
            getOrders();
        }
    },[])

    const getOrders= async ()=> {
        try {
            setLoading(true);
            const response = await  axios.get(GETEMPLOYEEORDER, {withCredentials: true});
            console.log("Response: ", response);
            if(response.data.success){
                setLoading(false);
                setOrders(response.data.data);
            }else {
                setLoading(false);
                // toast.error(response.data.message);
            }
        } catch (error) {
            setLoading(false);
            toast.error(response.data.message);
            console.log("ERROR: ", error);
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
  return (
    <div className={classes.EmOrders}>
        {
            !selectedOrder._id ? 
            <>
                <div className={classes.header}> 
                    <h3>Orders For You</h3>
                    <div className={classes.line}></div>
                </div>
                <div className={classes.table}>
                    {
                        isLoading ? <p>Loading</p> :
                        <table>
                        <thead>
                            <tr>
                                <th>Order No</th>
                                <th>Customer</th>
                                <th>Vehicle</th>
                                <th>Order Date</th>
                                <th>Order status</th>
                                <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders?.length > 0 
                                ? 
                                orders?.map((item, index) => (
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
                                        <td>
                                            <p style={{backgroundColor:`${getBgcolor(item.status)}`, color:`${getColor(item.status)}`, textAlign:"center", borderRadius:"30px", padding:"3px 0"}}>{item.status}</p>
                                        </td>
                                        <td style={{display:"flex", alignItems:"center", border: "none", paddingTop: "30px"}}>
                                            <p  onClick={()=> setSelectedOrder(item)}><CiIndent/></p></td>
                                    </tr>
                                ))
                                : <tr><td style={{colSpan:"8"}}>No data</td></tr>
                            }
                        </tbody>
                        </table>
                    }
                </div>
            </>
            :
            <div className={classes.selecOrder}>
                <div className={classes.container}>               
                    <div className={classes.form}>
                        <div className={classes.header}> 
                            <h3>Order details</h3>
                            <div className={classes.line}></div>
                        </div>
                            <div>
                                <h3>Customer :</h3>
                                <p>{`${selectedOrder.customer_id.first_name} ${selectedOrder.customer_id.last_name}`}</p>
                            </div>
                            <div>
                                <h3>Email :</h3>
                                <p>{selectedOrder.customer_id.email}</p>
                            </div>
                            <div>
                                <h3>Phone :</h3>
                                <p>{selectedOrder.customer_id.phone}</p>
                            </div>
    
                            <div>
                                <h3>Vehicle :</h3>
                                <p>{`${selectedOrder.vehicle_id.make} ${selectedOrder.vehicle_id.model} ${selectedOrder.vehicle_id.year}`}</p>
                            </div>
                            
                            <div>
                                <h3>Order Created At :</h3>
                                <p>{formatDate(selectedOrder.createdAt)}</p>
                            </div>
                        
                        <div className={classes.formGroup}  style={{display: `${ selectedOrder.status !== "Completed"? "block": "none"}`}}>
                            <label>Status</label>
                            <select>
                                <option value="Received">Received</option>
                                <option value="In progress">In progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    </div>
                    <div className={classes.serviceOrder}>
                        <div className={classes.service}>
                            <div className={classes.header}> 
                                <h3>Service Order</h3>
                                <div className={classes.line}></div>
                            </div>
                            {
                                selectedOrder.services.map((item, index) => (
                                    <div className={classes.serviceItem} key={index}>
                                        <div className={classes.serviceName}>
                                            <h3>{item.name}</h3>
                                            <p>{`${item.price} BIRR`}</p>
                                        </div>
                                        <p>{item.description}</p>
                                        
                                    </div>
                                ))
                            }
                            <h2>{`Total Price: ${selectedOrder.total} BIRR`}</h2>
                        </div>
                    </div>
                </div>
                <div className={classes.close} onClick={()=> setSelectedOrder({})}>
                    <p>X</p>
                </div>
            </div> 
        }
        
    </div>
  )
}

export default EmOrders