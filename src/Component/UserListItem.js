import React,{useState,useEffect} from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StorageIcon from '@mui/icons-material/Storage';
import KeyboardCommandKeyIcon from '@mui/icons-material/KeyboardCommandKey';
import TableViewIcon from '@mui/icons-material/TableView';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import UploadDatabase from "./UploadDatabase";
import {fetchResponse} from "../BackendServices/FetchServices"
import LogoutIcon from '@mui/icons-material/Logout';
import {useHistory} from "react-router-dom"
import Profile from "./Profile"
import DbManagment from "./DbManagment";
export default function MainListItems(props){
  const history=useHistory()
  const [getDatabase,setDatabase]=useState({database:[]})
  const [open, setOpen] = useState(false);
  const handleSetContent=props.handleSetContent
  const fetchDatabase=async()=>{
      let res=await fetchResponse("/getalldatabase",{}) 
      if(res[0]){
        setDatabase({database:res[1].data})
      }
  }
  const handleShowDatabase=(db)=>{
    localStorage.setItem("dbname",db.databasename);
    history.replace({"pathname":`/database`})
  }
  useEffect(()=>{
      fetchDatabase()
  },[])
  const handleClick = () => {
    setOpen(!open);
  };
  
 return (
  <React.Fragment>
    <ListItemButton onClick={()=>{fetchDatabase()}}>
      <ListItemIcon>
        <StorageIcon />
      </ListItemIcon>
      <ListItemText primary={props.user.name} />
    </ListItemButton>
    <ListItemButton onClick={()=>{handleSetContent(<Profile user={props.user}/>)}} >
      <ListItemIcon>
        <KeyboardCommandKeyIcon /> 
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItemButton>
    <ListItemButton onClick={handleClick}>
      <ListItemIcon> 
        <TableViewIcon />
      </ListItemIcon>
      <ListItemText primary="Database" />
      {open ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
    <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {getDatabase.database.map((item)=>{
            return(
              <ListItemButton sx={{ pl: 4 }} onClick={()=>handleShowDatabase(item)}>
              <ListItemIcon> 
              <TableViewIcon />
            </ListItemIcon>
              <ListItemText primary={item.databasename} />
            </ListItemButton>
            )
          })
}
        </List>
      </Collapse>
    <ListItemButton onClick={()=>{handleSetContent(<DbManagment key={1} heading={"Create Db"} isOpen={false} />)}}>
      <ListItemIcon>
        <BackupTableIcon />
      </ListItemIcon>
      <ListItemText primary="Create Database" />
    </ListItemButton>
    <ListItemButton onClick={()=>{handleSetContent(<UploadDatabase/>)}}>
      <ListItemIcon>
        <BackupTableIcon />
      </ListItemIcon>
      <ListItemText primary="Upload database" />
    </ListItemButton>
    <ListItemButton onClick={()=>{history.push("/documentation")}}>
      <ListItemIcon>
        <BackupTableIcon />
      </ListItemIcon>
      <ListItemText primary="Documentation" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" onClick={()=>{localStorage.clear();history.replace({pathname:"/"})}} />
    </ListItemButton>
  </React.Fragment>
);
 }
