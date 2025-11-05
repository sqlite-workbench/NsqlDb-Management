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
import RefreshIcon from '@mui/icons-material/Refresh';
import {useHistory} from "react-router-dom";
import ApiIcon from '@mui/icons-material/Api';
import TableData from './TableData';
import CreateTable from './CreateTable';
import { useContext } from 'react';
import ContextRouter from '../contextAPI/ContextRouter';
import { Logout } from '@mui/icons-material';
import '../CSS/mainlistitems.css';

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
  <div className="main-list-items">
    {/* Database Header */}
    <ListItemButton onClick={handleReload} className="list-item-button database-header">
      <ListItemIcon className="list-item-icon">
        <StorageIcon />
      </ListItemIcon>
      <ListItemText 
        primary={context.getDatabase} 
        primaryTypographyProps={{ className: 'list-item-text-primary' }}
      />
      <RefreshIcon className="refresh-icon" />
    </ListItemButton>

    {/* Tables Section */}
    <ListItemButton onClick={handleClick} className="list-item-button tables-toggle">
      <ListItemIcon className="list-item-icon"> 
        <TableViewIcon />
      </ListItemIcon>
      <ListItemText 
        primary="Tables" 
        primaryTypographyProps={{ className: 'list-item-text-primary' }}
      />
      {open ? <ExpandLess className="expand-icon" /> : <ExpandMore className="expand-icon" />}
    </ListItemButton>
    
    <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding className="nested-list">
          {context.getTableList.length === 0 ? (
            <div className="empty-tables">
              <span className="empty-icon">📋</span>
              <span className="empty-text">No tables yet</span>
            </div>
          ) : (
            context.getTableList.map((item, index) => (
              <ListItemButton 
                key={index}
                sx={{ pl: 4 }} 
                onClick={() => handleShowTable(item)}
                className="list-item-button nested-item"
              >
                <ListItemIcon className="list-item-icon nested-icon"> 
                  <TableViewIcon />
                </ListItemIcon>
                <ListItemText 
                  primary={item.name} 
                  primaryTypographyProps={{ className: 'list-item-text-primary nested-text' }}
                />
              </ListItemButton>
            ))
          )}
        </List>
      </Collapse>

    {/* Action Items */}
    <div className="action-items">
      <ListItemButton 
        onClick={() => {handleSetContent(<CreateTable fetchTable={context.fetchTable} setComponent={handleSetContent}/>)}}
        className="list-item-button action-item"
      >
        <ListItemIcon className="list-item-icon">
          <BackupTableIcon />
        </ListItemIcon>
        <ListItemText 
          primary="Create Table" 
          primaryTypographyProps={{ className: 'list-item-text-primary' }}
        />
      </ListItemButton>

      <ListItemButton 
        onClick={() => {props.handleRemoveDatabase()}}
        className="list-item-button action-item danger-item"
      >
        <ListItemIcon className="list-item-icon">
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText 
          primary="Drop Database" 
          primaryTypographyProps={{ className: 'list-item-text-primary' }}
        />
      </ListItemButton>

      <a 
        target="_blank" 
        className="download-link"
        rel="noreferrer" 
        download={true} 
        href={`${Server_Url}/download/${context.getDatabase}.db/?dbname=${context.getDatabase}&auth=${localStorage.getItem('auth')}`}
      >
        <ListItemButton className="list-item-button action-item">
          <ListItemIcon className="list-item-icon">
            <CloudDownloadIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Download Database" 
            primaryTypographyProps={{ className: 'list-item-text-primary' }}
          />
        </ListItemButton>
      </a>

      <ListItemButton 
        onClick={handleLogout}
        className="list-item-button action-item logout-item"
      >
        <ListItemIcon className="list-item-icon">
          <Logout />
        </ListItemIcon>
        <ListItemText 
          primary="Logout" 
          primaryTypographyProps={{ className: 'list-item-text-primary' }}
        />
      </ListItemButton>
    </div>
  </div>
);
 }
