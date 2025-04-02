import React, { useEffect, useState } from 'react'
import classes from "./CustomerDetails.module.css"
import { useAppStore } from '../../hook/store'
import { FaEdit } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { toast } from 'react-toastify';
import axios from 'axios';
import { ADDVEHICLE, GETALLVEHICLE } from '../../utils/constant';
import AddVehicle from '../../components/Admin/AddVehicle/AddVehicle';
import { useMemo } from 'react';

function CustomerDetails() {
  const {displayOpt,setDisplayOpt,selectedCustomer, isMobile , customerVehicles,setCustomerVehicles} = useAppStore();
  // const [displayOpt, setDisplayOpt] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [select, setSelect] = useState({});
  console.log(displayOpt);

  const getAllVehicle = async () => {
    try {
      setLoading(true);
      const response = await axios.post(GETALLVEHICLE, { customer_id: selectedCustomer._id }, { withCredentials: true });
  
      if (response.data.success) {
        setLoading(false);
  
        // Prevent unnecessary re-rendering if the new data is the same
        if (JSON.stringify(response.data.data) !== JSON.stringify(customerVehicles)) {
          setCustomerVehicles(response.data.data);
          // alert("hi")
          
        }
      } else {
        setLoading(false);
        console.log("Error is", response.data.message);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  

  useEffect(() => {
    if (selectedCustomer?._id) {
      getAllVehicle();
    }
  }, [selectedCustomer]);
  


  console.log("CustomerType: ",typeof(customerVehicles), " Customer: ", customerVehicles)

  const handleSelect = (item)=>{
    if(select && item._id == select._id){
      setSelect(null);
    } else {
      setSelect(item)
    }
  }

  const customerCar = () =>{
    if(customerVehicles?.length === 0) {
      return <tr>
            <td style={{colspan:"8"}}>No vehicle found</td>
          </tr>
    } else {
        return customerVehicles?.map((item,index)=>(
                  <tr key={index} style={{backgroundColor: select ? select._id === item._id  && "#1E90FF" :index % 2 !== 0 ? "#f2f2f2" : "white" , cursor:"pointer"}} onClick={()=>handleSelect(item)}>
                    <td>{item.make}</td>
                    <td>{item.model}</td>
                    <td>{item.type}</td>
                    <td>{item.year}</td>
                    {!isMobile && <td>{item.mileage}</td>}
                    { !isMobile &&<td>{item.tag}</td>}
                    <td>{item.serial_number}</td>
                    <td>{item.color}</td>
                  </tr>
          
        ))
    }
    
    
  }

  return (
    <div className={classes.CustomerDetails}>
        <div className={classes.container}>
            <div className={classes.customerInfo}>
              <h1>{`Customer: ${selectedCustomer.first_name} ${selectedCustomer.last_name}`}</h1>
              <p>Email: <span>{`${selectedCustomer.email}`}</span></p>
              <p>Phone: <span>{` ${selectedCustomer.phone}`}</span></p>
              <p>Active Customer: <span>{` ${selectedCustomer.status}`}</span></p>
              <p>Added Date: <span>{` ${selectedCustomer.added_date}`}</span></p>
              <p>Edit customer info <span className={classes.edit}><FaEdit/></span></p>
              
              <div className={classes.text}>Info</div>
            </div>
            <div className={classes.vehicleInfo}>
              <h1>{`Vehicles of ${selectedCustomer.first_name}`}</h1>
              <div className={classes.vehicleList}>
                {isLoading ? <p> Loading... </p> : 
                 <table>
                 <thead>
                   <tr>
                     <th>Make</th>
                     <th>Model</th>
                     <th>Type</th>
                     <th>Year</th>
                     {!isMobile && <th>Mileage</th>}
                     {!isMobile && <th>tag</th>}
                     <th>Serial Number</th>
                     <th>Color</th>
                   </tr>
                 </thead>
                 <tbody>
                  {customerCar()}
                 </tbody>   
                 </table> 
                 }
              </div>
              <div className={classes.addVehicle}>
                {
                  displayOpt ?
                  <AddVehicle />
                  :
                  <button onClick={setDisplayOpt}>ADD NEW VEHICLE</button>
                  
                  }
              </div>
              <div className={classes.text}>Cars</div>
            </div>
            <div className={classes.serviceInfo}>
              <h1>{`Orders of ${selectedCustomer.first_name}`}</h1>
              <p>Orders will be displayed here</p>
              <div className={classes.Order}>
                
              </div>
              <div className={classes.text}>Orders</div>
            </div>
        </div>
    </div>
  )
}

export default CustomerDetails