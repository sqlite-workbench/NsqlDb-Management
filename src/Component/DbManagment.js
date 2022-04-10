import React,{useState} from 'react';
import {Grid,TextField,Button} from "@mui/material"
import {fetchResponse} from "../BackendServices/FetchServices"
import {useHistory} from 'react-router-dom'
export default function DbManagment(props) {
    const [getDbName,setDbName]=useState("")
    const history=useHistory()
    const handleClick=async()=>{
            if(getDbName!==""){
                let body={dbname:getDbName}
                let res=await fetchResponse("/",body,"post")
                if(res[0]){
                    localStorage.setItem("dbname",getDbName)
                    history.replace({"pathname":"/dashboard"})
                }
                else{
                    alert(res[1])
                }
            }
            else{
                alert("Enter Database Name")
            }
    }
    return (
    <div style={{display:"flex",flexDirection:"row",justifyContent:"center",aliginItems:"center",width:"100%",marginTop:40}}>
       <Grid containor style={{border:"2px solid black",borderRadius:20,padding:20}}> 
            <Grid xs={12} style={{margin:5,fontSize:30,fontWeight:"bold",textAlign:"center"}}>
                {props.heading}
            </Grid>
            <Grid xs={12} style={{margin:5}}>
                <TextField variant='outlined' fullWidth onChange={(e)=>{setDbName(e.currentTarget.value)}} label="Database Name" />
            </Grid>
            <Grid xs={12} style={{margin:5,marginTop:20}}>
                <Button variant="outlined" fullWidth color="primary" onClick={handleClick} >{props.heading}</Button>
            </Grid>
        </Grid> 
    </div>
  );
}
