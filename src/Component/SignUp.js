import React,{useContext, useState} from 'react';
import {Grid,TextField,Button} from '@mui/material'
import { fetchResponse } from '../BackendServices/FetchServices';
import {useHistory} from 'react-router-dom';
import "../CSS/login.css"
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
        {/* Animated Background */}
        <div className='login-background'>
            <div className='login-shape shape-1'></div>
            <div className='login-shape shape-2'></div>
            <div className='login-shape shape-3'></div>
        </div>

        <div className='login-sub-main'>
            <div className='login-sub-1'>
                <div className='login-card'>
                    <div className='login-badge'>
                        <span className='badge-icon'>✨</span>
                        Create Account
                    </div>
                    
                    <div className='login-heading'>
                        Join NSQLDB
                    </div>
                    
                    <div className='login-subheading'>
                        Start managing databases in the cloud
                    </div>

                    <div className='login-form'>
                        <div className='emailid'>
                            <TextField 
                                type="text" 
                                onChange={(e)=>{setName(e.currentTarget.value)}} 
                                variant='outlined' 
                                fullWidth 
                                label="Full Name" 
                                className='input-field'
                            />
                        </div>
                        <div className='password'>
                            <TextField 
                                type="number" 
                                onChange={(e)=>{setContact(e.currentTarget.value)}} 
                                variant='outlined' 
                                fullWidth 
                                label="Contact Number" 
                                className='input-field'
                            />
                        </div>
                        <div className='password'>
                            <TextField 
                                type="email" 
                                onChange={(e)=>{setEmailid(e.currentTarget.value)}} 
                                variant='outlined' 
                                fullWidth 
                                label="Email Address" 
                                className='input-field'
                            />
                        </div>
                        <div className='password'>
                            <TextField 
                                type="password" 
                                onChange={(e)=>{setPassword(e.currentTarget.value)}} 
                                variant='outlined' 
                                fullWidth 
                                label="Password" 
                                className='input-field'
                            />
                        </div>
                        
                        <div className='login-btn'>
                            <button onClick={handleSignUp} className='btn-login'>
                                <span className='btn-glow'></span>
                                <span className='btn-icon'>→</span>
                                Create Account
                            </button>
                        </div>
                        
                        <div className='login-labels'>
                            <div className='signup-label'>
                                Already have an account? <span onClick={()=>{history.replace({pathname:"/login"});context.runLoader(10);}}>Login</span>
                            </div>
                        </div>
                    </div>

                    <div className='login-features'>
                        <div className='feature-item-small'>
                            <span className='feature-icon-small'>⚡</span>
                            <span>Fast Setup</span>
                        </div>
                        <div className='feature-item-small'>
                            <span className='feature-icon-small'>🔒</span>
                            <span>Secure</span>
                        </div>
                        <div className='feature-item-small'>
                            <span className='feature-icon-small'>🆓</span>
                            <span>Free to Start</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
