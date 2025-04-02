import React, { useEffect, useState } from 'react'
import classes from "./ServiceList.module.css"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import axios from 'axios';
import { ADDSERVICE, DELETESERVICE, EDITSERVICE, GETALLSERVICE } from '../../../utils/constant';
import { useAppStore } from '../../../hook/store';
import { IoClose } from "react-icons/io5";

function ServiceList() {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const {addServiceList,serviceList, setServiceList, editServiceList, removeServiceList} = useAppStore();
    const [isLoading, setLoading] = useState(false);
    const [isFound, setFound] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [editName, setEditName] = useState("");
    const [edtiPrice, setEditPrice] = useState("");
    const [editDescription, setEditDescription] = useState("")
    const [selectedService, setSelectedService] = useState({});
    const [isdelete, setDelete] = useState({});
    const [isdeleting, setDeleting] = useState(false);
    const [serviceName, setServiceName] = useState("");

    const getAllService = async()=> {
        try {
            setFound(false)
            const response =  await axios.get(GETALLSERVICE,{withCredentials:true});
            if(response.data.success) {
                setFound(true)
                setServiceList(response.data.data)
            }else {
                console.log("ERROR: ", error)
                setFound(true);
            }
            console.log("RESPONSE :", response)
        } catch (error) {
            setFound(true);
            console.log("ERROR: ", error)
        }
    }

    useEffect(()=>{
        if(serviceList.length == 0){
            getAllService();
        }   
    },[])

    const handleSubmit = async()=>{
        try {
            if(!name || !price || !description) {
                return toast.error("All fields are required")
            }
            setLoading(true);
            const response = await axios.post(ADDSERVICE,{name,description,price},{withCredentials:true})
            console.log("RESPONSE FOR SERVICE: ", response);
            if(response.data.success){
                setLoading(false)
                addServiceList(response.data.data);
                toast.success("SERVICE ADDED")
            }else {
                setLoading(false)
                console.log(response.data.message);
            }

        } catch (error) {
            setLoading(false)
            console.log("ERROR HAPPENED: ", error)
        }
        
    }

    const handleEdit = (item) => {
        setSelectedService(item)
        setEditName(item.name);
        setEditPrice(item.price);
        setEditDescription(item.description);
        console.log("EDITED", item.description)
    }
    const handleUnEdit = () => {
        setSelectedService({})
    }

    const handleDeleteService = async() => {
        try {
            if(serviceName !== isdelete.name){
                return toast.error("Write the write word");
            }
            setDeleting(true);
            const response = await axios.delete(DELETESERVICE,{
                data: { serviceId: isdelete._id },
                withCredentials: true
            });

            console.log("REPONSE FOR DELETE: ", response);
            if(response.data.success){
                setDeleting(false);
                removeServiceList(isdelete);
                setDelete({});
                toast.success("Service is Deleted");
            }else {
                setDeleting(false);
                toast.error(response.data.message);
            }
        } catch (error) {
            setDeleting(false);
            console.log("ERROR: ", error);
        }
      
    }




    const handleUpdate = async() => {
        if(!editName || !editDescription || !edtiPrice){
            return toast.error("All Fields are required");
        }
        setUpdateLoading(true);
        const response = await axios.patch(EDITSERVICE, {service_id: selectedService._id, name: editName, description: editDescription, price: edtiPrice},{withCredentials: true});
        if(response.data.success){
            setUpdateLoading(false);
            editServiceList(response.data.data);
            toast.success("Service Updated");
        }else {
            console.log("ERROR: ", response.data.message);
        }

    }


  return (

        selectedService?._id ? 
        <div className={classes.EditService}>
            <div className={classes.editContainer}>
                <div className={classes.header}> 
                    <h3>Edit Services</h3>
                    <div className={classes.line}></div>
                </div>
                <div className={classes.close} onClick={handleUnEdit}>
                    <IoClose/>
                </div>
                <div className={classes.form}>
                    <div className={classes.name}>
                        <input type="text" placeholder='Service name' value={editName} onChange={(e)=>setEditName(e.target.value)}/>
                    </div>
                    <div className={classes.description}>
                        <textarea placeholder='Service description' rows={6} style={{resize:"none"}} value={editDescription} onChange={(e)=>setEditDescription(e.target.value)}></textarea>
                    </div>
                    <div className={classes.price}>
                        <input type="text" placeholder='Service price in Birr' value={edtiPrice} onChange={(e)=>setEditPrice(e.target.value)}/>
                    </div>
                    <button className={classes.btn} onClick={handleUpdate}>{updateLoading ? "Loading..":"UPDATE SERVICE"}</button>
                </div>
            </div>
        </div>
       :
        <div className={classes.ServiceList}>
            {isdelete._id && <div className={`${classes.overlay} ${classes.show}`}></div>}
            
            <div className={classes.header}> 
                <h3>Services we provide</h3>
                <div className={classes.line}></div>
            </div>
            <p className={classes.text}>Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward,a new normal that has evolved from generation heading towards.</p>

            <div className={classes.listContainer}>
                    {
                        isFound ? <p>Loading ...</p> :
                        serviceList === null ? <p>No Service Found</p> :
                        serviceList?.map((item,index)=>{
                            return (
                                <div className={classes.itemContainer} key={index}>
                                    <div className={classes.left}>
                                        <h1>{item.name}</h1>
                                        <p>{item.description}</p>
                                    </div>
                                    <div className={classes.right}>
                                        <button className={classes.red} onClick={()=> handleEdit(item)}><FaEdit/></button>
                                        <button onClick={()=> setDelete(item)}><MdDelete/></button>
                                    </div>
                                </div>
                            )
                        })
                    }
            </div>

            <div className={classes.AddService}>
                <div className={classes.header}> 
                    <h3>Add a new service</h3>
                    <div className={classes.line}></div>
                </div> 
                <div className={classes.form}>
                    <div className={classes.name}>
                        <input type="text" placeholder='Service name' value={name} onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div className={classes.description}>
                        <textarea placeholder='Service description' rows={6} style={{resize:"none"}} value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
                    </div>
                    <div className={classes.price}>
                        <input type="text" placeholder='Service price in Birr' value={price} onChange={(e)=>setPrice(e.target.value)}/>
                    </div>
                    <button className={classes.btn} onClick={handleSubmit}>{isLoading? "Loading..":"ADD SERVICE"}</button>
                </div>
            </div>

            {isdelete._id && (
                <div className={classes.Delete}>
                    <p>Are you sure you want to delete this Order? If yes, enter this in the box below: <span>{isdelete.name}</span></p>
                    <input type="text" placeholder='Enter the Name' value={serviceName} onChange={(e) => setServiceName(e.target.value)} />
                    <button onClick={handleDeleteService}>{isdeleting ? "Loading" :"Delete"}</button>
                    <div className={classes.close} onClick={()=> setDelete({})}>x</div>
                </div>
            )}
        </div>

  )
}

export default ServiceList