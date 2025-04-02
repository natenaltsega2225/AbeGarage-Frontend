import React, { useState } from 'react'
import classes from "./Login.module.css"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FORGOTPASSWORD, LOGIN } from '../../utils/constant';
import axios from "axios";
import { useAppStore } from '../../hook/store';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [visible, setVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {userInfo, setUserInfo} = useAppStore();
    const [isLoading, setLoading] = useState(false);
    const [forgot, setForgot] = useState(false);
    const navigate = useNavigate();

    const hanglevisible = ()=> {
        setVisible((prev)=> !prev)
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(email !== "" || password !== "") {
            try {
                setLoading(true);
                const response  = await axios.post(LOGIN,{email, password}, {withCredentials: true});
                // console.log(response);
                if(response.data.success) {
                    setLoading(false);
                    // alert("Login Success");
                    console.log("RESPONSE: ", response.data.data);
                    setUserInfo(response.data.data);
                    // toast("User Logged in SuccessFully")
                    console.log("USER INFO: ", response.data.data.role);
                    if(response.data.data.role === "admin") {
                        console.log("Navigate to admin");
                        navigate("/admin")
                    } else {
                            if(response.data.data.status === "initial") {
                                navigate('/change_password')
                                toast.success("Please change your password")
                            } else if(response.data.data.status === "inactive"){
                                navigate('/')
                                toast.error("Your account is inactive, please contact the admin")
                            } else if(response.data.data.status === "active") {
                                navigate('/about')
                                toast.success("Login Success")
                            }
                        }  
                    }  else {
                        setLoading(false);
                        toast.error(response.data.message);
                    }
            } catch (error) {
                setLoading(false);
                console.log("ERROR: ", error)
            }
            
        }
        // alert(`Email: ${email}  and Password: ${password}`)
    }

    const handleForgot = async(e) => {
        e.preventDefault();
        if(email !== "") {
            try {
                setLoading(true);
                const response = await axios.post(FORGOTPASSWORD, {email}, {withCredentials: true});
                console.log("RESPONSE: ", response);
                if(response.data.success) {
                    setLoading(false);
                    toast.success(response.data.message);
                } else {
                    setLoading(false);
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.log("ERROR: ",error);
                setLoading(false);
            }
           
        }
    }

  return (
    <div className={classes.container}>
        {
            forgot && <div className={classes.forgotPassword}>
                <div className={classes.login}>
                    <h2>Forgot Password <span className={classes.underline}></span></h2>
                    <div className={classes.underline}></div>
                </div>
                <form onSubmit={handleForgot}>
                    <p>Enter Your Email</p>
                    <div className={classes.control}>
                        <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                    <div className={classes.btn}>
                        <button>{isLoading?"Loading":"Submit"}</button>
                    </div>
                </form>
                <div className={classes.back}>
                    <p onClick={()=>setForgot(prev => !prev)}>Back to login</p>
                </div>
            </div>
        }
        {
            !forgot && 
            <div className={classes.wrapper}>
                <div className={classes.login}>
                <h2>Login to your account<span className={classes.underline}></span></h2>
                <div className={classes.underline}></div>
                </div>
            <form onSubmit={handleSubmit}>
                <div className={classes.control}>
                    <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                </div>
            <div className={`${classes.control} ${classes.password}`}>
                <input type={`${visible ? "password" : "text"}`} placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                {visible ? <FaEye className={classes.eye} onClick={hanglevisible}/> : <FaEyeSlash className={classes.eye} onClick={hanglevisible}/>}
            </div>
            <p className={classes.forgot} onClick={()=>setForgot(prev => !prev)}>Forgot password</p>
            <div className={classes.btn}>
                <button>{isLoading ? "Loading" :"Login"}</button>
            </div>
        </form>
        </div>
        }
       </div>
  )
}

export default Login