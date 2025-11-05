import React,{useState,useEffect} from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StorageIcon from '@mui/icons-material/Storage';
import PersonIcon from '@mui/icons-material/Person';
import TableViewIcon from '@mui/icons-material/TableView';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RefreshIcon from '@mui/icons-material/Refresh';
import UploadDatabase from "./UploadDatabase";
import {fetchResponse} from "../BackendServices/FetchServices"
import LogoutIcon from '@mui/icons-material/Logout';
import {useHistory} from "react-router-dom"
import Profile from "./Profile"
import DbManagment from "./DbManagment";
import '../CSS/userlistitem.css';

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
  <div className="user-list-items">
    {/* User Header */}
    <ListItemButton 
      onClick={() => {fetchDatabase()}} 
      className="list-item-btn user-header-btn"
    >
      <ListItemIcon className="list-item-icon">
        <StorageIcon />
      </ListItemIcon>
      <ListItemText 
        primary={props.user.name} 
        primaryTypographyProps={{ className: 'list-item-text' }}
      />
      <RefreshIcon className="refresh-icon" />
    </ListItemButton>

    {/* Profile */}
    <ListItemButton 
      onClick={() => {handleSetContent(<Profile user={props.user}/>)}} 
      className="list-item-btn"
    >
      <ListItemIcon className="list-item-icon">
        <PersonIcon /> 
      </ListItemIcon>
      <ListItemText 
        primary="Profile" 
        primaryTypographyProps={{ className: 'list-item-text' }}
      />
    </ListItemButton>

    {/* Database Toggle */}
    <ListItemButton 
      onClick={handleClick} 
      className="list-item-btn database-toggle"
    >
      <ListItemIcon className="list-item-icon"> 
        <TableViewIcon />
      </ListItemIcon>
      <ListItemText 
        primary="Databases" 
        primaryTypographyProps={{ className: 'list-item-text' }}
      />
      {open ? <ExpandLess className="expand-icon" /> : <ExpandMore className="expand-icon" />}
    </ListItemButton>

    {/* Database List */}
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding className="nested-list">
        {getDatabase.database.length === 0 ? (
          <div className="empty-databases">
            <span className="empty-icon">📦</span>
            <span className="empty-text">No databases</span>
          </div>
        ) : (
          getDatabase.database.map((item, index) => (
            <ListItemButton 
              key={index}
              sx={{ pl: 4 }} 
              onClick={() => handleShowDatabase(item)}
              className="list-item-btn nested-item"
            >
              <ListItemIcon className="list-item-icon nested-icon"> 
                <StorageIcon />
              </ListItemIcon>
              <ListItemText 
                primary={item.databasename} 
                primaryTypographyProps={{ className: 'list-item-text nested-text' }}
              />
            </ListItemButton>
          ))
        )}
      </List>
    </Collapse>

    {/* Action Items Section */}
    <div className="action-items-section">
      <ListItemButton 
        onClick={() => {handleSetContent(<DbManagment key={1} heading={"Create Db"} isOpen={false} />)}}
        className="list-item-btn action-item"
      >
        <ListItemIcon className="list-item-icon">
          <AddCircleIcon />
        </ListItemIcon>
        <ListItemText 
          primary="Create Database" 
          primaryTypographyProps={{ className: 'list-item-text' }}
        />
      </ListItemButton>

      <ListItemButton 
        onClick={() => {handleSetContent(<UploadDatabase/>)}}
        className="list-item-btn action-item"
      >
        <ListItemIcon className="list-item-icon">
          <CloudUploadIcon />
        </ListItemIcon>
        <ListItemText 
          primary="Upload Database" 
          primaryTypographyProps={{ className: 'list-item-text' }}
        />
      </ListItemButton>

      <ListItemButton 
        onClick={() => {history.push("/documentation")}}
        className="list-item-btn action-item"
      >
        <ListItemIcon className="list-item-icon">
          <MenuBookIcon />
        </ListItemIcon>
        <ListItemText 
          primary="Documentation" 
          primaryTypographyProps={{ className: 'list-item-text' }}
        />
      </ListItemButton>

      <ListItemButton 
        onClick={() => {localStorage.clear();history.replace({pathname:"/"})}}
        className="list-item-btn logout-item"
      >
        <ListItemIcon className="list-item-icon">
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText 
          primary="Logout" 
          primaryTypographyProps={{ className: 'list-item-text' }}
        />
      </ListItemButton>
    </div>
  </div>
);
 }
