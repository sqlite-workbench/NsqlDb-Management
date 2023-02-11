import { List,MenuItem,Select } from "@mui/material"
import React from "react"
import { useContext } from "react"
import Tab from '@mui/material/Tab';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TabPanel from '@mui/lab/TabPanel';
import { useHistory } from "react-router-dom"
import ContextRouter from "../contextAPI/ContextRouter"
import MainListItems from "./MainListItems"
import { useState } from "react";
import RunQuery from "./RunQuery";
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import PrintIcon from '@mui/icons-material/Print';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import DeleteIcon from '@mui/icons-material/Delete';
import "../CSS/userdashboard.css"
import DbManagment from "./DbManagment";
import UploadDatabase from "./UploadDatabase";
import CreateTable from "./CreateTable";
import { deleteResponse } from "../BackendServices/FetchServices";

export default function UserDashboard() {
  const context=useContext(ContextRouter)
  const history=useHistory()
  const [getContext,setContext]=useState(<></>)
  const [getValue,setValue]=useState("0")
  const handleRemoveDatabase=async()=>{
    try{
      let status=window.confirm("You Want To Drop "+context.getDatabase)
      if(!status){
        return;
      }
      let res=await deleteResponse("/deletedatabase",{dbname:context.getDatabase})
      if(res.status){
          let dbArr=(context.getDatabaseList)
          dbArr=dbArr.filter((item)=>{
              return item.databasename!=context.getDatabase;
          })    
          context.setDatabaseList(dbArr);
          if(dbArr.length>0){
            context.setDatabase(dbArr[0].databasename);
          }
          context.setAlert({status:true,msg:"Database Drop Successfully",color:"green"})
          handleSetContent(<></>)
      }
      else{
        context.setAlert({status:true,msg:res.err,color:"red"})
      }
    }
    catch(e){
      context.setAlert({status:true,msg:"Internal Error..",color:"yellow"})
    }
  }
const actions = [
  { icon: <FileCopyIcon />, name: 'Create Database' ,click:()=>{handleSetContent(<DbManagment key={1} heading={"Create Db"} isOpen={false}/>)}},
  { icon: <CloudUploadIcon />, name: 'Upload Database',click:()=>{handleSetContent(<UploadDatabase/>)} },
  { icon: <BackupTableIcon />, name: 'Create Table' ,click:()=>{handleSetContent(<CreateTable fetchTable={context.fetchTable} setComponent={handleSetContent}/>)}},
  { icon: <DeleteIcon />, name: 'Drop Database',click:handleRemoveDatabase },
  // { icon: <PrintIcon />, name: 'Download Database', },
];
  const handleChange=(e,val)=>{
    setValue(val)
  }
  const handleChangeVal=(val)=>{
      context.setDatabase(val.target.value)
  }
  const handleSetContent=(component)=>{
      setContext(component);
      setValue("1")
  }
  if(!localStorage.getItem("auth")){
    history.replace({pathname:"/"})
  }
  return(
  <TabContext value={getValue}>
    <div className='dashboard-main-div'>
        <div className='dashboard-sub-div'>
            <div className='dahsboard-top-bar'>
              <div className='databases-list'>
                <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={context.getDatabase}
                label="Database"
                style={{width:"70%",height:"80%"}}
                onChange={handleChangeVal}
                >
                {context.getDatabaseList.map((item)=>{
                  return <MenuItem value={item.databasename}>{item.databasename}</MenuItem>
                })
              }
                </Select>
              </div>
              <div className="switch-options">
                <TabList  onChange={handleChange}>
                  <Tab label="Execute Query" value="0" />
                  <Tab label="Data" value="1" />
                </TabList>
              </div>
              <div className="add-new" onClick={()=>{handleSetContent(<DbManagment key={1} heading={"Create Db"} isOpen={false}/>)}}>
                    Create New Database
              </div>
              <div className="add-new" onClick={()=>{handleSetContent(<UploadDatabase/>)}}>
                    Upload Database
              </div>
            </div>
            <div className='dashboard-bottom-bar'>
                <div className='dashboard-left-window'>
                    <List>
                      <MainListItems handleSetContent={handleSetContent}/>
                    </List>
                </div>
                <div className='dashboard-right-window'>
                        <TabPanel value="0">
                              <RunQuery/>
                        </TabPanel>
                        <TabPanel value="1">
                              {getContext}
                        </TabPanel>
                </div>
                <div>
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ position:"absolute",bottom:16,right:16 }}
                    icon={<SpeedDialIcon />}

                  >
                    {actions.map((action) => (
                      <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={action.click}
                      />
                    ))}
                  </SpeedDial>
                </div>
            </div>
        </div>
    </div>
  </TabContext>
  )
}