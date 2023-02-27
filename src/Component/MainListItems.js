import React,{useState,useEffect} from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StorageIcon from '@mui/icons-material/Storage';
import TableViewIcon from '@mui/icons-material/TableView';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import {Server_Url,fetchResponse,deleteResponse} from "../BackendServices/FetchServices"
import DeleteIcon from '@mui/icons-material/Delete';
import {useHistory} from "react-router-dom";
import ApiIcon from '@mui/icons-material/Api';
import TableData from './TableData';
import CreateTable from './CreateTable';
import { useContext } from 'react';
import ContextRouter from '../contextAPI/ContextRouter';
import { Logout } from '@mui/icons-material';
export default function MainListItems(props){
  const context=useContext(ContextRouter)
  const [open, setOpen] = useState(false);
  const handleSetContent=props.handleSetContent

  

  const handleShowTable=(table)=>{
    context.setTable(table.name)
    handleSetContent(<TableData handleSetContent={handleSetContent} fetchTable={context.fetchTable}/>)
  }
  const handleClick = () => {
    setOpen(!open);
  };
  const handleReload=()=>{
      context.fetchDatabase()
      context.fetchTable()
  }
  const handleLogout=()=>{
    localStorage.removeItem("auth");
    context.setIsFetch(!context.isFetch);
}
  
 return (
  <div style={{overflow:"auto"}}>
    <ListItemButton onClick={handleReload}>
      <ListItemIcon>
        <StorageIcon />
      </ListItemIcon>
      <ListItemText primary={context.getDatabase} />
    </ListItemButton>
    <ListItemButton onClick={handleClick}  >
      <ListItemIcon> 
        <TableViewIcon />
      </ListItemIcon>
      <ListItemText primary="Tables" />
      {open ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
    <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding style={{maxHeight:context.getTableList.length!==0?"20vh":"0vh",overflow:"auto"}}>
          {context.getTableList.map((item)=>{
            return(
              <ListItemButton sx={{ pl: 4 }} onClick={()=>handleShowTable(item)}>
              <ListItemIcon> 
              <TableViewIcon />
            </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
            )
          })
}
        </List>
      </Collapse>
    <ListItemButton onClick={()=>{handleSetContent(<CreateTable fetchTable={context.fetchTable} setComponent={handleSetContent}/>)}}>
      <ListItemIcon>
        <BackupTableIcon />
      </ListItemIcon>
      <ListItemText primary="Create Table" />
    </ListItemButton>
    <ListItemButton onClick={()=>{props.handleRemoveDatabase()}}>
      <ListItemIcon>
        <DeleteIcon/>
      </ListItemIcon>
      <ListItemText primary="Drop Database" />
    </ListItemButton>
      <a target="_blank" style={{textDecoration:"none",color:"black"}} rel="noreferrer" download={true} href={`${Server_Url}/download/${context.getDatabase}.db/?dbname=${context.getDatabase}&auth=${localStorage.getItem('auth')}`}>
    <ListItemButton>
      <ListItemIcon>
        <CloudDownloadIcon />
      </ListItemIcon>
      <ListItemText primary="Download Database" onClick={()=>{window.history.location.href=`${Server_Url}/download/${context.getDatabase}.db`}} />
    </ListItemButton>
      </a>
      <ListItemButton onClick={handleLogout}>
      <ListItemIcon>
        <Logout/>
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
      {/* <ListItemButton >
      <ListItemIcon>
        <ApiIcon/>
      </ListItemIcon>
      <ListItemText primary="Access Control" />
    </ListItemButton> */}
  </div>
);
 }
