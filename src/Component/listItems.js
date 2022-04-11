import React,{useState,useEffect} from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import {Divider} from '@mui/material';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import {Server_Url,fetchResponse} from "../BackendServices/FetchServices"
import AssignmentIcon from '@mui/icons-material/Assignment';
import {useHistory} from "react-router-dom"
import RunQuery from "./RunQuery"
import TableData from './TableData';
export default function MainListItems(props){
  const history=useHistory()
  const [getTable,setTable]=useState({tablesName:[]})
  const [open, setOpen] = useState(false);
  const handleSetContent=props.handleSetContent
  const fetchTable=async()=>{
      let body={dbname:localStorage.getItem("dbname")}
      let res=await fetchResponse("/table",body)
      if(res[0]){
        setTable({tablesName:res[1].data})
      }
  }
  const handleShowTable=(table)=>{
    handleSetContent(<TableData handleSetContent={handleSetContent} fetchTable={fetchTable} tablename={table.name}/>)
  }
  useEffect(()=>{
      fetchTable()
  },[localStorage.getItem("dbname")])
  const handleClick = () => {
    setOpen(!open);
  };
  const secondaryListItems = (
    <React.Fragment>
      <ListSubheader component="div" inset>
        Other
      </ListSubheader>
      <ListItemButton onClick={()=>{history.push("/createdb")}} >
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Create Database" />
      </ListItemButton>
      <ListItemButton  onClick={()=>{history.push("/opendb")}} >
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Open Database"/>
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </React.Fragment>
  );  
 return (
  <React.Fragment>
    <ListItemButton onClick={()=>{fetchTable()}}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary={localStorage.getItem("dbname")} />
    </ListItemButton>
    <ListItemButton onClick={()=>{handleSetContent(<RunQuery/>)}} >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Run Query" />
    </ListItemButton>
    <ListItemButton onClick={handleClick}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Tables" />
      {open ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
    <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {getTable['tablesName'].map((item)=>{
            return(
              <ListItemButton sx={{ pl: 4 }} onClick={()=>handleShowTable(item)}>
              <ListItemText primary={item.name} />
            </ListItemButton>
            )
          })
}
        </List>
      </Collapse>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Create Table" />
    </ListItemButton>
      <a target="_blank" style={{textDecoration:"none",color:"black"}} rel="noreferrer" download={true} href={`${Server_Url}/databasefile/${localStorage.getItem("dbname")}.db`}>
    <ListItemButton>

      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Download Database" onClick={()=>{window.history.location.href=`${Server_Url}/databasefile/${localStorage.getItem("dbname")}.db`}} />
    </ListItemButton>
      </a>
  <Divider sx={{ my: 1 }} />
  {secondaryListItems}
  </React.Fragment>
);
 }
