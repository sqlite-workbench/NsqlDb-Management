import React,{useContext, useState} from 'react'
import {fetchResponse} from "../BackendServices/FetchServices"
import {Grid,TextField,Button} from "@mui/material"
import ContextRouter from "../contextAPI/ContextRouter"
export default function RunQuery() {
    const context=useContext(ContextRouter)
    const [getQuery,setQuery]=useState("")
    const [getResponse,setResponse]=useState("")
    const handleClick=async()=>{
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
                    res=getResponse+JSON.stringify(res.data)+"\n"
                    else
                    res=getResponse+JSON.stringify(res.err)+"\n"
                setResponse(res);
                }
            }
                else{
                    context.setAlert({status:true,msg:"Write Some Query First",color:'red'})
            }
            
        }
        catch(e){
            setResponse(e.message)
        }
        context.setLoader(false)
    }
  return (
    <div>
        <Grid containor>
            <Grid item xs={12} style={{margin:10,fontSize:30,fontWeight:"bold",textAlign:"center"}}>
                Run Query
            </Grid>
        <Grid item xs={12}>
            <TextField multiline rows={10} value={getQuery} onChange={(e)=>{setQuery(e.currentTarget.value);setResponse("")}} variant="outlined" label="Query"  fullWidth/>
        </Grid>
        <Grid xs={12} style={{display:"flex"}}>

        <Grid xs={6} style={{margin:10}} >
            <Button fullWidth variant="outlined" onClick={handleClick} color="primary">Run Query</Button>
        </Grid>
        <Grid xs={6} fullWidth style={{margin:10}}>
            <Button variant="outlined" onClick={()=>{setQuery("");setResponse("")}} color="primary">Clear</Button>
        </Grid>
        </Grid>
        {getResponse.length!==0?<><Grid item xs={12} style={{margin:10,fontSize:30,fontWeight:"bold",textAlign:"center"}}>
            Response
        </Grid>
        <Grid item xs={12} style={{marginBottom:20}}>
            <TextField disabled multiline rows={10} value={getResponse} variant="outlined" label="Response"  fullWidth/>
        </Grid></>:<></>}
        </Grid>
    </div>
  )
}
