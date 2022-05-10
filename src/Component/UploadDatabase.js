import React,{useState} from 'react';
import {Grid,Button} from "@mui/material"
import {fetchResponse} from "../BackendServices/FetchServices"
import {useHistory} from 'react-router-dom'
export default function UploadDatabase(props) {
    const [getDb,setDb]=useState({filename:"",bytes:""})
    const history=useHistory()
    const handleDb=(event)=>{
        setDb({bytes:event.target.files[0]})
    }
    const handleClick=async()=>{
            if(getDb.bytes!==""){
                let body=new FormData()
                body.append("database",getDb.bytes)
                let config={headers:{"content-type":"multipart/form-data",auth:localStorage.getItem("auth")}}
                let res=await fetchResponse("/uploaddb",body,config)
                if(res[0]){
                    let filename=(res[1].filename)
                    filename=filename===undefined || filename===null?"":filename
                    if(filename===""){
                            alert("Server Error...")
                    }
                    else{
                        localStorage.setItem("dbname",filename)
                        history.replace({"pathname":"/database"})
                    }
                }
                else{
                    alert(res[1])
                }
            }
            else{
                alert("Select Database File Only")
            }
    }
    return (
    <div style={{display:"flex",flexDirection:"row",justifyContent:"center",aliginItems:"center",width:"100%",marginTop:40}}>
       <Grid containor style={{border:"2px solid black",borderRadius:20,padding:20}}> 
            <Grid xs={12} style={{margin:5,fontSize:30,fontWeight:"bold",textAlign:"center"}}>
                Upload Database
            </Grid>
            <Grid xs={12} style={{margin:5}}>
            <input
        accept=".db"
        id="contained-button-file"
        type="file"
        style={{display:"none"}}
        onChange={(event)=>handleDb(event)}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color={getDb.bytes===""?"primary":"secondary"} component="span">
        {getDb.bytes===""?"Select Database":"Selected"}
        </Button>
      </label>
            </Grid>
            <Grid xs={12} style={{margin:5,marginTop:20}}>
                <Button variant="outlined" fullWidth color="primary" onClick={handleClick} >Upload Database</Button>
            </Grid>
        </Grid> 
    </div>
  );
}
