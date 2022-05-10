import React,{useState} from 'react';
import {Grid,TextField,Button} from '@mui/material'
import { fetchResponse } from '../BackendServices/FetchServices';
import {useHistory} from 'react-router-dom';
export default function SignUp() {
    const history=useHistory()
    const [getEmailid,setEmailid]=useState("")
    const [getPassword,setPassword]=useState("")
    const [getName,setName]=useState("")
    const [getContact,setContact]=useState("")
    const handleSignUp=async()=>{
        let body={emailid:getEmailid,password:getPassword,name:getName,contactnumber:getContact}
        let res=await fetchResponse("/signup",body)
        if(res[0]){
            localStorage.setItem("auth",res[1].token)
            history.replace({pathname:"/dashboard"})
        }
        else{
            alert(res[1])
        }
    }
  return (
    <div style={{padding:10,marginBlock:30,display:"flex",width:"95%",justifyContent:"center"}}>
        <Grid containor style={{border:"1px solid black",padding:20,width:"50%",backgroundColor:"#e5f1cc",boxShadow:"12px 12px 12px gray"}}>
            <Grid item xs={12} style={{margin:10,fontSize:25,fontWeight:600,textAlign:"center"}}>
                SignUp
            </Grid>
            <Grid item xs={12} style={{margin:10}}>
                <TextField onChange={(e)=>{setName(e.currentTarget.value)}} fullWidth variant="outlined" label="Name" required />
            </Grid>
            <Grid item xs={12} style={{margin:10}}>
                <TextField onChange={(e)=>{setEmailid(e.currentTarget.value)}} fullWidth variant="outlined" label="Email Id" type="email" required />
            </Grid>
            <Grid item xs={12} style={{margin:10}}>
                <TextField onChange={(e)=>{setContact(e.currentTarget.value)}} variant="outlined" fullWidth label="Contact Number" required  />
            </Grid>
            <Grid item xs={12} style={{margin:10}}>
                <TextField onChange={(e)=>{setPassword(e.currentTarget.value)}} variant="outlined" fullWidth label="Password" type='password' required />
            </Grid>
            <Grid item xs={12} style={{margin:10}}>
                <Button onClick={handleSignUp} variant="outlined" fullWidth color="primary">SignUp</Button>
            </Grid>
            <Grid xs={12} style={{margin:10,fontSize:20}}>
                If You Already Have Account <span onClick={()=>{history.replace({pathname:"/login"})}} style={{color:"red",cursor:"pointer"}}>Login</span>?
            </Grid>
        </Grid>
    </div>
  );
}
