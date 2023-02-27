import React,{useContext, useState} from 'react';
import {TextField} from "@mui/material"
import "../CSS/createDb.css"
import {fetchResponse} from "../BackendServices/FetchServices"
import ContextRouter from '../contextAPI/ContextRouter';
export default function DbManagment(props) { 
    const [getDbName,setDbName]=useState("")
    const context=useContext(ContextRouter)
    const handleClick=async()=>{
            if(getDbName!==""){
                context.setLoader(true)
                let body={dbname:getDbName}
                let res=await fetchResponse("/",body)
                if(res.status){
                    let arr=context.getDatabaseList
                    arr.push({userid:context.getUser.userid,databasename:getDbName});
                    context.setDatabaseList(arr);
                    context.setDatabase(getDbName);
                    context.setAlert({status:true,msg:"Database Created Successfully",color:"green"})
                }
                else{
                    context.setAlert({status:true,msg:res.err,"color":"red"})
                }
                context.setLoader(false)
            }
            else{
                context.setAlert({status:true,msg:"Enter Database Name","color":"red"})
            }
    }
    return (
        <div className='main-div-crdb'>
                <div className='sub-div-crdb'>
                        <div className='heading'>
                                {props.heading}
                        </div>
                        <div className='crdb-text-area'>
                            <TextField fullWidth variant='standard' label="Database Name" value={getDbName} onChange={(e)=>{setDbName(e.currentTarget.value)}}/>
                        </div>
                        <div className='crdb-btn'>
                            <button onClick={handleClick}>{props.heading}</button>
                        </div>
                </div>
        </div>
  );
}
