import React,{useState} from 'react';
import {Grid,TextField,Button} from '@mui/material'
import { fetchResponse } from '../BackendServices/FetchServices';
import {useHistory} from 'react-router-dom';
export default function SignUp() {
    const history=useHistory()
    const [getEmailid,setEmailid]=useState("")
    const [getPassword,setPassword]=useState("")
    const handleLogin=async()=>{
        let body={emailid:getEmailid,password:getPassword}
        let res=await fetchResponse("/login",body)
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
                Login
            </Grid>
            <Grid item xs={12} style={{margin:10}}>
                <TextField onChange={(e)=>{setEmailid(e.currentTarget.value)}} fullWidth variant="outlined" label="Email Id" type="email" required />
            </Grid>
            <Grid item xs={12} style={{margin:10}}>
                <TextField onChange={(e)=>{setPassword(e.currentTarget.value)}} variant="outlined" fullWidth label="Password" type='password' required />
            </Grid>
            <Grid item xs={12} style={{margin:10}}>
                <Button onClick={handleLogin} variant="outlined" fullWidth color="primary">Login</Button>
            </Grid>
            <Grid xs={12} style={{margin:10,fontSize:20}}>
                If You don't Have Account <span onClick={()=>{history.replace({pathname:"/signup"})}} style={{color:"red",cursor:"pointer"}}>SignUp</span>?
            </Grid>
        </Grid>
    </div>
  );
}
