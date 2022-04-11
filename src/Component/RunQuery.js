import React,{useState} from 'react'
import {fetchResponse} from "../BackendServices/FetchServices"
import {Grid,TextField,Button} from "@mui/material"
export default function RunQuery() {
    const [getQuery,setQuery]=useState("")
    const [getResponse,setResponse]=useState("")
    const handleClick=async()=>{
        try{
            if(getQuery!==""){
                let body={dbname:localStorage.getItem("dbname"),query:getQuery}
                let res=await fetchResponse("/run",body)
                
                if(res[0])
                    setResponse(JSON.stringify(res[1].data))
                else
                    setResponse(JSON.stringify(res[1]))
            }
            else{
                alert("Write Some Query Please")
            }
            
        }
        catch(e){
            setResponse(e.message)
        }
    }
  return (
    <div>
        <Grid containor>
            <Grid item xs={12} style={{margin:10,fontSize:30,fontWeight:"bold",textAlign:"center"}}>
                Run Query
            </Grid>
        <Grid item xs={12}>
            <TextField multiline rows={10} value={getQuery} onChange={(e)=>{setQuery(e.currentTarget.value)}} variant="outlined" label="Query"  fullWidth/>
        </Grid>
        <Grid xs={12} style={{display:"flex"}}>

        <Grid xs={6} style={{margin:10}} >
            <Button fullWidth variant="outlined" onClick={handleClick} color="primary">Run Query</Button>
        </Grid>
        <Grid xs={6} fullWidth style={{margin:10}}>
            <Button variant="outlined" onClick={()=>{setQuery("");setResponse("")}} color="primary">Clear</Button>
        </Grid>
        </Grid>
        <Grid item xs={12} style={{margin:10,fontSize:30,fontWeight:"bold",textAlign:"center"}}>
            Response
        </Grid>
        <Grid item xs={12}>
            <TextField disabled multiline rows={getResponse.matchAll("\n")+1} value={getResponse} variant="outlined" label="Response"  fullWidth/>
        </Grid>
        </Grid>
    </div>
  )
}
