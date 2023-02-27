import React from 'react'
import {TextField} from '@mui/material'
import "../CSS/Doc.css"
import ContextRouter from "../contextAPI/ContextRouter"
import { useContext } from 'react'
export default function Documentation() {
  const context=useContext(ContextRouter)
  const handleClick=(name,value)=>{
    navigator.clipboard.writeText(value);
    context.setAlert({status:true,msg:`${name} Copied Successfully`,color:"green"})
  }
  return (
    <div className='doc-main'>
        <div className='doc-sub'>
            <div className='heading'>
                Documentation
            </div>
            <div className='doc-items'>
                <div className='doc-api-key'>
                  <TextField onClick={()=>{handleClick("API","https://nsqldb.glitch.me/run")}} disabled fullWidth variant='outlined' value={"https://nsqldb.glitch.me/run"} label="API"/>
                </div>
                <div className='doc-api-key'>
                  <TextField onClick={()=>{handleClick("METHOD","POST")}} disabled fullWidth variant='outlined' value={"POST"} label="Method"/>
                </div>
                <div className='doc-api-key'>
                  <TextField onClick={()=>{handleClick("REQUEST HEADER","{apikey:your_key,content-type:application/json}")}} disabled fullWidth variant='outlined' value={"{apikey:your_key,content-type:application/json}"} label="Request Header"/>
                </div>
                <div className='doc-api-key'>
                  <TextField disabled onClick={()=>{handleClick("REQUEST BODY","{dbname:your_database_name,query:sqlite_query}")}} fullWidth variant='outlined' value={"{dbname:your_database_name,query:sqlite_query}"} label="Request Body"/>
                </div>
            </div>
            <div className='doc-example'>
                  <TextField onClick={()=>{handleClick("EXAMPLE","request.post(https://nsqldb.gltich.me/run,{{dbname:your_db_name,query:'select * from tem;'}},{{content-type:'application/json','apikey':your_apikey}});")}} disabled fullWidth multiline={true} variant='outlined' rows={3} value={" request.post(https://nsqldb.gltich.me/run,{{dbname:your_db_name,query:'select * from tem;'}},{{content-type:'application/json','apikey':your_apikey}});"} label="Example"/>
            </div>
        </div>
    </div>

  )
}
