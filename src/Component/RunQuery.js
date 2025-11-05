import React,{useContext, useState} from 'react'
import {fetchResponse} from "../BackendServices/FetchServices"
import {Grid,TextField,Button} from "@mui/material"
import ContextRouter from "../contextAPI/ContextRouter"
import ShowResponse from './ShowResponse'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import ClearIcon from '@mui/icons-material/Clear'
import CodeIcon from '@mui/icons-material/Code'
import '../CSS/runquery.css'

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
    <div className="run-query-container">
        {/* Header Section */}
        <div className="query-header">
            <div className="header-icon-wrapper">
                <CodeIcon className="header-icon" />
                <h2 className="query-title">SQL Query Editor</h2>
            </div>
            <div className="query-badge">
                {context.getDatabase}
            </div>
        </div>

        {/* Query Input Section */}
        <div className="query-editor-section">
            <div className="editor-label">
                <span className="label-icon">✏️</span>
                <span>Write your SQL query</span>
            </div>
            <TextField 
                multiline 
                rows={10} 
                value={getQuery} 
                onChange={(e) => {setQuery(e.currentTarget.value);setResponse("")}} 
                variant="outlined" 
                label="SQL Query"  
                fullWidth
                className="query-input"
                placeholder="SELECT * FROM table_name;"
            />
        </div>

        {/* Action Buttons */}
        <div className="query-actions">
            <button 
                className="action-btn run-btn" 
                onClick={handleClick}
            >
                <PlayArrowIcon className="btn-icon" />
                <span>Run Query</span>
            </button>
            <button 
                className="action-btn clear-btn" 
                onClick={() => {setQuery("");setResponse("")}}
            >
                <ClearIcon className="btn-icon" />
                <span>Clear</span>
            </button>
        </div>

        {/* Response Section */}
        {getResponse.length !== 0 && (
            <div className="query-response-section">
                <div className="response-label">
                    <span className="label-icon">📊</span>
                    <span>Query Result</span>
                </div>
                {typeof(getResponse) === "string" || getResponse.length === 0 ? (
                    <TextField 
                        disabled 
                        multiline 
                        rows={6} 
                        value={(getResponse)} 
                        variant="outlined" 
                        label="Response"  
                        fullWidth
                        className="response-output"
                    />
                ) : (
                    handleShow()
                )}
            </div>
        )}
    </div>
  )
}
