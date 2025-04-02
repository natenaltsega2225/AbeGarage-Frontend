import React, {useState} from 'react'
import classes from "./AddVehicle.module.css"
import { ADDVEHICLE } from '../../../utils/constant';
import { useAppStore } from '../../../hook/store';
import { toast } from 'react-toastify';
import axios from 'axios';
import { IoMdClose } from 'react-icons/io';
function AddVehicle() {
          const [year, setYear] = useState("");
          const [make, setMake] = useState("");
          const [model, setModel] = useState("");
          const [type, setType] = useState("");
          const [mileage, setMileage] = useState("");
          const [tag, setTag] = useState("");
          const [serial, setSerial] = useState("");
          const [color, setColor] = useState("");
          const [isLoading, setLoading] = useState("");
          const {setDisplayOpt ,addCustomerVehicle, selectedCustomer} = useAppStore();

          const handleSubmit = async ()=>{
            try {
                if(!year || !model || !type || !mileage || !tag || !serial || !color ) {
                  return toast.error("All fields are required")
                }
                // console.log("Hi there")
                setLoading(true);
                const response = await axios.post(ADDVEHICLE, {customer_id: selectedCustomer._id, year,make,model,type,mileage,tag,serial_number: serial,color }, {withCredentials: true})
                if(response.data.success){
                    console.log(response.data.data)
                  addCustomerVehicle(response.data.data)
                  setLoading(false);
                  setYear("");
                  setMake("");
                  setModel("");
                  setType("");
                  setMileage("");
                  setTag("");
                  setSerial("");
                  setColor("");
                  toast("Vehicle added successfully")
                }
                console.log("RESPONSE FOR ADDING VEHICLE: ", response);
            } catch (error) {
                setLoading(false)
              console.log("Error: ", error)
            }
          }

    return (
        <div className={classes.AddCustomer}>
        <div className={classes.addContainer}>
            <div className={classes.header}> 
                <h3>Add a new vehicle</h3>
                <div className={classes.line}></div>
            </div>
            <div className={classes.form}>
                            <div className={classes.form_login}>
                            <input type="text"  placeholder='Vehicle year' value={year} onChange={(e)=>setYear(e.target.value)}/>
                            </div>
                            <div className={classes.form_login}>
                            <input type="text" placeholder='Vehicle make' value={make} onChange={(e)=>setMake(e.target.value)}/>
                            </div>
                            <div className={classes.form_login}>
                            <input type="text" placeholder='Vehicle model' value={model} onChange={(e)=>setModel(e.target.value)}/>
                            </div>
                            <div className={classes.form_login}>
                            <input type="text" placeholder='Vehicle type' value={type} onChange={(e)=>setType(e.target.value)}/>
                            </div>
                            <div className={classes.form_login}>
                            <input type="text" placeholder='Vehicle mileage' value={mileage} onChange={(e)=> setMileage(e.target.value)}/>
                            </div>
                            <div className={classes.form_login}>
                            <input type="text" placeholder='Vehicle tag' value={tag} onChange={(e)=>setTag(e.target.value)}/>
                            </div>
                            <div className={classes.form_login}>
                            <input type="text" placeholder='Vehicle serial' value={serial} onChange={(e)=>setSerial(e.target.value)}/>
                            </div>
                            <div className={classes.form_login}>
                            <input type="text" placeholder='Vehicle color' value={color} onChange={(e)=> setColor(e.target.value)}/>
                            </div>
                            
                            <button className={classes.btn} onClick={handleSubmit}>{isLoading?"Loading...":"ADD VEHICLE"}</button>
                        </div>
        </div>
        <button onClick={setDisplayOpt}>< IoMdClose/></button>
        </div>
  )
}

export default AddVehicle