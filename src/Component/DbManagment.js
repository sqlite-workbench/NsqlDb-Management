import React,{useContext, useState} from 'react';
import {TextField, Button} from "@mui/material"
import StorageIcon from '@mui/icons-material/Storage';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import "../CSS/dbmanagement.css"
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
                context.setLoader(false)
                if(res.status){
                    let arr=context.getDatabaseList
                    arr.push({userid:context.getUser.userid,databasename:getDbName});
                    context.setDatabaseList(arr);
                    context.setDatabase(getDbName);
                    context.setAlert({status:true,msg:"Database Created Successfully",color:"green"})
                    // Reset the form
                    setDbName("")
                }
                else{
                    context.setAlert({status:true,msg:res.err,"color":"red"})
                }
            }
            else{
                context.setAlert({status:true,msg:"Enter Database Name","color":"red"})
            }
    }
    return (
        <div className='dbmanagement-container'>
            <div className='dbmanagement-card'>
                {/* Header */}
                <div className='dbmanagement-header'>
                    <div className='header-content'>
                        <StorageIcon className='header-icon' />
                        <h2 className='header-title'>{props.heading}</h2>
                    </div>
                    <p className='header-subtitle'>
                        Enter a unique name for your new database
                    </p>
                </div>

                {/* Form Section */}
                <div className='dbmanagement-form'>
                    <div className='form-section'>
                        <div className='input-wrapper'>
                            <div className='input-icon'>
                                <StorageIcon className='field-icon' />
                            </div>
                            <TextField 
                                fullWidth 
                                variant='outlined' 
                                label="Database Name" 
                                placeholder="e.g., my_database"
                                value={getDbName} 
                                onChange={(e)=>{setDbName(e.currentTarget.value)}}
                                className='db-input'
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        handleClick();
                                    }
                                }}
                            />
                        </div>
                        <div className='input-hint'>
                            <span className='hint-icon'>💡</span>
                            <span className='hint-text'>Use lowercase letters, numbers, and underscores</span>
                        </div>
                    </div>

                    <div className='button-wrapper'>
                        <Button
                            variant="contained"
                            fullWidth
                            className='create-db-btn'
                            onClick={handleClick}
                            startIcon={<AddCircleIcon />}
                            disabled={getDbName === ""}
                        >
                            {props.heading}
                        </Button>
                    </div>
                </div>

                {/* Info Section */}
                <div className='dbmanagement-info'>
                    <div className='info-item'>
                        <span className='info-icon'>🗄️</span>
                        <span className='info-text'>SQLite database format</span>
                    </div>
                    <div className='info-item'>
                        <span className='info-icon'>⚡</span>
                        <span className='info-text'>Instant creation</span>
                    </div>
                    <div className='info-item'>
                        <span className='info-icon'>🔒</span>
                        <span className='info-text'>Secure storage</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
