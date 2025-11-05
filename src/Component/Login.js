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
                        <span className='badge-icon'>🔐</span>
                        Secure Login
                    </div>
                    
                    <div className='login-heading'>
                        Welcome Back!
                    </div>
                    
                    <div className='login-subheading'>
                        Login to access your databases
                    </div>

                    <div className='login-form'>
                        <div className='emailid'>
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
                            <button onClick={handleLogin} className='btn-login'>
                                <span className='btn-glow'></span>
                                <span className='btn-icon'>→</span>
                                Login
                            </button>
                        </div>
                        
                        <div className='login-labels'>
                            <div className='forgot-password'>
                                <span className='link-icon'>🔑</span>
                                Forgot Password?
                            </div>
                            <div className='signup-label'>
                                New here? <span onClick={()=>{history.replace({pathname:"/signup"});context.runLoader(10);}}>Create Account</span>
                            </div>
                        </div>
                    </div>

                    <div className='login-features'>
                        <div className='feature-item-small'>
                            <span className='feature-icon-small'>⚡</span>
                            <span>Fast Access</span>
                        </div>
                        <div className='feature-item-small'>
                            <span className='feature-icon-small'>🔒</span>
                            <span>Secure</span>
                        </div>
                        <div className='feature-item-small'>
                            <span className='feature-icon-small'>☁️</span>
                            <span>Cloud Based</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
