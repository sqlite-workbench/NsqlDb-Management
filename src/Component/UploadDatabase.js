import React,{useState} from 'react';
import {Button} from "@mui/material"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StorageIcon from '@mui/icons-material/Storage';
import {postRequestFile} from "../BackendServices/FetchServices"
import { useContext } from 'react';
import ContextRouter from '../contextAPI/ContextRouter';
import '../CSS/uploaddatabase.css';
export default function UploadDatabase(props) {
    const [getDb,setDb]=useState({filename:"",bytes:""})
    const context=useContext(ContextRouter)
    const handleDb=(event)=>{
        setDb({bytes:event.target.files[0],filename:String(event.target.files[0].name).toLowerCase()})
    }
    const handleClick=async()=>{
            if(getDb.bytes!=="" && getDb.filename.endsWith(".db")){
                context.setLoader(true)
                let body=new FormData()
                body.append("database",getDb.bytes)
                body.append("Dbfilename",getDb.filename)
                let config={headers:{"content-type":"multipart/form-data",auth:localStorage.getItem("auth")}}
                let res=await postRequestFile("/uploaddb",body,config,false)
                context.setLoader(false)
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
                        // Reset the form
                        setDb({filename:"",bytes:""})
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
        <div className='upload-db-container'>
            <div className='upload-db-card'>
                {/* Header */}
                <div className='upload-header'>
                    <div className='header-content'>
                        <StorageIcon className='header-icon' />
                        <h2 className='header-title'>Upload Database</h2>
                    </div>
                    <p className='header-subtitle'>
                        Upload your SQLite database file (.db) to get started
                    </p>
                </div>

                {/* Upload Area */}
                <div className='upload-area'>
                    <input
                        accept=".db"
                        id="database-file-upload"
                        type="file"
                        className="file-input-hidden"
                        onChange={(event)=>handleDb(event)}
                    />
                    
                    <label htmlFor="database-file-upload" className='file-upload-label'>
                        <div className={`upload-box ${getDb.bytes !== "" ? 'file-selected' : ''}`}>
                            <div className='upload-icon-wrapper'>
                                {getDb.bytes === "" ? (
                                    <CloudUploadIcon className='upload-icon' />
                                ) : (
                                    <CheckCircleIcon className='upload-icon success-icon' />
                                )}
                            </div>
                            <div className='upload-text'>
                                <span className='upload-main-text'>
                                    {getDb.bytes === "" ? "Choose a database file" : "File selected successfully"}
                                </span>
                                <span className='upload-sub-text'>
                                    {getDb.bytes === "" ? "Click to browse or drag and drop" : getDb.filename}
                                </span>
                            </div>
                            {getDb.bytes === "" ? (
                                <Button 
                                    variant="outlined" 
                                    component="span"
                                    className='browse-button'
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Browse Files
                                </Button>
                            ) : (
                                <div className='file-info'>
                                    <StorageIcon className='file-icon' />
                                    <span className='file-name'>{getDb.filename}</span>
                                </div>
                            )}
                        </div>
                    </label>

                    {/* Upload Button */}
                    <div className='upload-button-wrapper'>
                        <Button
                            variant="contained"
                            fullWidth
                            className={`upload-submit-btn ${getDb.bytes === "" ? 'disabled' : ''}`}
                            onClick={handleClick}
                            disabled={getDb.bytes === ""}
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload Database
                        </Button>
                    </div>
                </div>

                {/* Info Section */}
                <div className='upload-info'>
                    <div className='info-item'>
                        <span className='info-icon'>📄</span>
                        <span className='info-text'>Only .db files are supported</span>
                    </div>
                    <div className='info-item'>
                        <span className='info-icon'>🔒</span>
                        <span className='info-text'>Your data is secure and encrypted</span>
                    </div>
                    <div className='info-item'>
                        <span className='info-icon'>⚡</span>
                        <span className='info-text'>Fast and reliable upload</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
