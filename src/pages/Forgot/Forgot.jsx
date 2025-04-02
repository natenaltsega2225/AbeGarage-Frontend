import React, {useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import classes from './Forgot.module.css'
import axios from 'axios';
import { FORGOTPASSWORD, RESET_PASSWORD } from '../../utils/constant';
import { useAppStore } from '../../hook/store';

function Forgot() {
    const hash = useParams().hash;
    const [newPassword, setNewPassword] = useState("");
    const {userInfo,setUserInfo} = useAppStore();
    const [renewPassword, setReNewPassword] = useState("");
    const [visible, setVisible] =  useState(false);
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    

    const handlevisible = ()=> {
        setVisible(prev => !prev);
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(!newPassword || !renewPassword) {
            return toast.error("All fields are required");
        } else if(newPassword !== renewPassword) {
            return toast.error("Password don't match");
        }
        
        try {
            setLoading(true);
            const response = await axios.post(`${RESET_PASSWORD}/${hash}`, { password: newPassword });
            console.log("RESPONSE: ",response);
            if(response.data.success){
                setLoading(false);
                setUserInfo(response.data.data);
                toast.success(response.data.message);
                if(userInfo) {
                    if(userInfo.role === "admin" || userInfo.role === "manager") {
                        navigate('/admin');
                    }else if(userInfo.role === "employee") {
                        navigate('/dashboard');
                    } 
                }
                navigate('/login');
            } else {
                setLoading(false);
                toast.error(response.data.message);
            }
        } catch (error) {
            setLoading(false);
            console.log("Error: ", error);
        }
        

    }
  return (
      <div className={classes.container}>
                <div className={classes.wrapper}>
                    <div className={classes.login}>
                        <h2>Change password <span className={classes.underline}></span></h2>
                        <div className={classes.underline}></div>
                    </div>
                <form onSubmit={handleSubmit}>
                    <div className={`${classes.control} ${classes.password}`}>
                        <input type={`${!visible ? "password" : "text"}`} placeholder='New Password' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
                    </div>
                    <div className={`${classes.control} ${classes.password}`}>
                        <input type={`${!visible ? "password" : "text"}`} placeholder='Confirm Password' value={renewPassword} onChange={(e)=>setReNewPassword(e.target.value)}/>
                    </div>
                    <div className={classes.check}>
                        <p>Show Password</p>
                        <input type="checkbox" value={visible} onChange={handlevisible} />
                    </div>
                    <div className={classes.btn}>
                        <button>{isLoading ? "Loading" :"Change"}</button>
                    </div>
                </form>
                </div>
               </div>
  )
}

export default Forgot