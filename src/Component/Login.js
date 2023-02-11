import React,{useContext, useState} from 'react';
import {TextField} from '@mui/material'
import { fetchResponse } from '../BackendServices/FetchServices';
import {useHistory} from 'react-router-dom';
import "../CSS/login.css"
import ContextRouter from '../contextAPI/ContextRouter';
export default function SignUp() {
    const history=useHistory()
    const context=useContext(ContextRouter)
    const [getEmailid,setEmailid]=useState("")
    const [getPassword,setPassword]=useState("")
    const handleLogin=async()=>{
        let res;
        context.ActiveLoader();
        if(getEmailid==""){
            res={err:"Enter Email Id"}
        } 
        else if(getPassword==""){
            res={"err":"Enter Password"}
        }
        else{
            let body={emailid:getEmailid,password:getPassword}
            res=await fetchResponse("/login",body)
        }
        if(res.status){
            localStorage.setItem("auth",res.token)
            context.setIsFetch(!context.isFetch)
            history.replace({pathname:"/dashboard"})
        }
        else{
            context.setAlert({status:true,msg:res.err,color:"red"})
        }
        context.DeactiveLoader();
    }
  return (
    <div className='login-main'>
        <div className='login-sub-main'>

        <div className='login-sub-1'>
            <div className='login-heading'>
                Login to Your Account
            </div>
            <div className='emailid'>
                <TextField type="email" onChange={(e)=>{setEmailid(e.currentTarget.value)}} variant='outlined' fullWidth label="Email Id" />
            </div>
            <div className='password'>
                <TextField type="password" onChange={(e)=>{setPassword(e.currentTarget.value)}} variant='outlined' fullWidth label="Password" />
            </div>
            <div className='login-btn'>
                <button onClick={handleLogin}>Login</button>
            </div>
            <div className='login-labels'>
                <div className='forgot-password'>
                    Forgot Password ?
                </div>
                <div className='signup-label'>
                        Don't have Account ? <span onClick={()=>{history.replace({pathname:"/signup"});context.runLoader(10);}}>Create Account</span>
                </div>
            </div>
        </div>
        <div className='login-sub-2'>
            <img src="/login.jpg"/>
        </div>
        </div>
    </div>
  );
}
