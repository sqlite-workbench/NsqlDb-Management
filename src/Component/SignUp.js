import React,{useContext, useState} from 'react';
import {Grid,TextField,Button} from '@mui/material'
import { fetchResponse } from '../BackendServices/FetchServices';
import {useHistory} from 'react-router-dom';
import ContextRouter from '../contextAPI/ContextRouter';
export default function SignUp() {
    const history=useHistory()
    const context=useContext(ContextRouter)
    const [getEmailid,setEmailid]=useState("")
    const [getPassword,setPassword]=useState("")
    const [getName,setName]=useState("")
    const [getContact,setContact]=useState("")
    const handleSignUp=async()=>{
        let res;
        context.ActiveLoader();
        if(getEmailid==""){
            res={err:"Enter Email Id"}
        } 
        else if(getPassword==""){
            res={"err":"Enter Password"}
        }
        else if(getName==""){
            res={"err":"Enter Name"}
        }
        else if(getContact==""){
            res={"err":"Enter Contact Number"}
        }
        else{
            let body={emailid:getEmailid,password:getPassword,name:getName,contactnumber:getContact}
            res=await fetchResponse("/signup",body)
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
                Create New Account
            </div>
            <div className='emailid'>
                <TextField type="text" onChange={(e)=>{setName(e.currentTarget.value)}} variant='outlined' fullWidth label="Name" />
            </div>
            <div className='password'>
                <TextField type="number" onChange={(e)=>{setContact(e.currentTarget.value)}} variant='outlined' fullWidth label="Contact Number" />
            </div>
            <div className='password'>
                <TextField type="email" onChange={(e)=>{setEmailid(e.currentTarget.value)}} variant='outlined' fullWidth label="Email Id" />
            </div>
            <div className='password'>
                <TextField type="password" onChange={(e)=>{setPassword(e.currentTarget.value)}} variant='outlined' fullWidth label="Password" />
            </div>
            <div className='login-btn'>
                <button onClick={handleSignUp}>Create Account</button>
            </div>
            <div className='login-labels'>
                <div className='signup-label'>
                        If You have Account ? <span onClick={()=>{history.replace({pathname:"/login"});context.runLoader(10);}}>Login</span>
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
