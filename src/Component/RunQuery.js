import React,{useContext, useState} from 'react'
import {fetchResponse} from "../BackendServices/FetchServices"
import {Grid,TextField,Button} from "@mui/material"
import ContextRouter from "../contextAPI/ContextRouter"
import ShowResponse from './ShowResponse'
export default function RunQuery(props) {
    const context=useContext(ContextRouter)
    const [getQuery,setQuery]=useState("")
    const [getResponse,setResponse]=useState("")
    const handleClick=async()=>{
        setResponse("")
        context.setLoader(true)
        try{
            if(getQuery!==""){
                let querySet=getQuery.split(";")
                for(let query of querySet){
                    if(query===""){
                        continue;
                    }
                    
                    let body={dbname:context.getDatabase,query}
                let res=await fetchResponse("/run",body)
                
                if(res.status)
                    res=res.data
                    else
                    res=res.err
                if(typeof(res)=="string" || res.length==0){
                    res=JSON.stringify(res)
                }
                setResponse(res);
                context.setAlert({status:true,msg:"Query Execution Done",color:'green'})
                }
            }
                else{
                    context.setAlert({status:true,msg:"Write Some Query First",color:'red'})
            }
            
        }
        catch(e){
            context.setAlert({status:true,msg:"Query Execution Done",color:'green'})
            setResponse(e.message)
        }
        context.setLoader(false)
    }
    const handleShow=()=>{
        props.setValue("1")
        props.setComponent(<ShowResponse data={getResponse} tablename={getQuery}/>)
    }
  return (
    <div>
        <Grid containor>
            <Grid item xs={12} className="heading" style={{marginBlock:20}}>
                Run Query
            </Grid>
        <Grid item xs={12}>
            <TextField multiline rows={10} value={getQuery} onChange={(e)=>{setQuery(e.currentTarget.value);setResponse("")}} variant="outlined" label="Query"  fullWidth/>
        </Grid>
        <Grid xs={12} style={{display:"flex"}}>

        <Grid xs={6} style={{margin:10}} >
            <Button fullWidth variant="outlined" onClick={handleClick} style={{color:"white",backgroundColor:"skyblue",borderRadius:15}}>Run Query</Button>
        </Grid>
        <Grid xs={6} fullWidth style={{margin:10}}>
            <Button variant="outlined" style={{color:"white",backgroundColor:"skyblue",borderRadius:15}} onClick={()=>{setQuery("");setResponse("")}} color="primary">Clear</Button>
        </Grid>
        </Grid>
        {getResponse.length!==0?<>
        <Grid item xs={12} style={{marginBlock:20}}>
            {typeof(getResponse)=="string" || getResponse.length==0?<TextField disabled multiline rows={6} value={(getResponse)} variant="outlined" label="Response"  fullWidth/>:handleShow()}
        </Grid></>:<></>}
        </Grid>
    </div>
  )
}
