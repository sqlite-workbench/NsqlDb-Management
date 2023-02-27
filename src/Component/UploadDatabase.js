import React,{useState} from 'react';
import {Grid,Button} from "@mui/material"
import {postRequestFile} from "../BackendServices/FetchServices"
import { useContext } from 'react';
import ContextRouter from '../contextAPI/ContextRouter';
export default function UploadDatabase(props) {
    const [getDb,setDb]=useState({filename:"",bytes:""})
    const context=useContext(ContextRouter)
    const handleDb=(event)=>{
        setDb({bytes:event.target.files[0],filename:String(event.target.files[0].name).toLowerCase()})
    }
    const handleClick=async()=>{
            if(getDb.bytes!=="" && getDb.filename.endsWith(".db")){
                let body=new FormData()
                body.append("database",getDb.bytes)
                body.append("Dbfilename",getDb.filename)
                let config={headers:{"content-type":"multipart/form-data",auth:localStorage.getItem("auth")}}
                let res=await postRequestFile("/uploaddb",body,config,false)
                if(res.status){
                    let filename=(res.filename)
                    filename=filename===undefined || filename===null?"":filename
                    if(filename===""){
                        context.setAlert({status:true,msg:"Server Error.....","color":"red"})
                    }
                    else{
                        let arr=context.getDatabaseList
                        arr.push({userid:context.getUser.userid,databasename:filename});
                        context.setDatabaseList(arr);
                        context.setDatabase(filename);
                        context.setAlert({status:true,msg:"Database Uploaded Successfully",color:"green"})
                    }
                }
                else{
                    context.setAlert({status:true,msg:res.err,"color":"red"})
                }
            }
            else{
                context.setAlert({status:true,msg:"Select Database File Only","color":"red"})
            }
    }
    return (
    // <div style={{display:"flex",flexDirection:"row",justifyContent:"center",aliginItems:"center",width:"100%",marginTop:40}}>
    //    <Grid containor style={{border:"2px solid black",borderRadius:20,padding:20}}> 
    //         <Grid xs={12} style={{margin:5,fontSize:30,fontWeight:"bold",textAlign:"center"}}>
    //             Upload Database
    //         </Grid>
    //         <Grid xs={12} style={{margin:5}}>
        //     <input
        // accept=".db"
        // id="contained-button-file"
        // type="file"
        // style={{display:"none"}}
        // onChange={(event)=>handleDb(event)}
    //   />
    //   <label htmlFor="contained-button-file">
    //     <Button variant="contained" color={getDb.bytes===""?"primary":"secondary"} component="span">
    //     {getDb.bytes===""?"Select Database":"Selected"}
    //     <br/>
    //     {getDb.filename}
    //     </Button>
    //   </label>
    //         </Grid>
    //         <Grid xs={12} style={{margin:5,marginTop:20}}>
    //             <Button variant="outlined" fullWidth color="primary" onClick={handleClick} >Upload Database</Button>
    //         </Grid>
    //     </Grid> 
    // </div>
    <div className='main-div-crdb'>
                <div className='sub-div-crdb'>
                        <div className='heading'>
                        Upload Database
                        </div>
                        <div className='crdb-text-area'>
                        <input
                         accept=".db"
                         id="contained-button-file"
                         type="file"
                         style={{display:"none"}}
                         onChange={(event)=>handleDb(event)}  />  
                         <label htmlFor="contained-button-file">
                    <Button fullWidth variant="contained" style={{backgroundColor:getDb.bytes===""?"skyblue":"rgb(40, 40, 78)",color:"white"}} component="span">
                    <div style={{display:"flex",justifyContent:"space-evenly"}}>
                    <div style={{marginInline:5}}>
                    {getDb.bytes===""?"Select Database":"Selected"} 
                    </div>
                    <div>
                    {getDb.filename===""?"":`( ${getDb.filename} )`}
                    </div>
                    </div>
                    </Button>
      </label>
                        </div>
                        <div className='crdb-btn'>
                            <button onClick={handleClick}>Upload Database</button>
                        </div>
                </div>
        </div>
  );
}
