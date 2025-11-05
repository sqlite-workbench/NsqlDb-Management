import React,{useState} from 'react';
import Table from '@mui/material/Table';
import DeleteIcon from '@mui/icons-material/Delete';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {deleteResponse} from "../BackendServices/FetchServices"
import DbDialog from './DbDialog';
import { useContext } from 'react';
import ContextRouter from '../contextAPI/ContextRouter';
import EditIcon from '@mui/icons-material/Edit';
import '../CSS/dbtable.css';
export default function DbTable(props) {
  const [getOpen,setOpen]=useState(false)
  const [getRow,setRow]=useState({data:{}})
  const handleUpdate=(row)=>{
   setRow({data:row})
    setOpen(true)
  }
  const context=useContext(ContextRouter)
  const handleDelete=async(row)=>{
    const user_want=window.confirm("⚠️ Are you sure you want to delete this record?\n\nThis action cannot be undone.")
    if(!user_want){
      return;
    }
    context.setLoader(true)
      
      let body={"dbname":context.getDatabase,"tablename":props.tablename,user:row}
    let res=await deleteResponse("/deletedata",body)
    if(res.status){
      context.setAlert({status:true,msg:"Data Deleted",color:"green"})
        props.getDataUrl();
      }
    else{
      context.setAlert({status:true,msg:res.err,color:"red"})
    }
    context.setLoader(false)
  }
  return (
    <div className="dbtable-container">
      <TableContainer component={Paper} className="table-container">
        <Table sx={{ minWidth: 650 }} aria-label="data table" className="data-table">
          <TableHead className="table-header">
            <TableRow>
              <TableCell align="center" className="header-cell action-header">
                Actions
              </TableCell>
              {
                props.columns.map((item, index)=>{
                  return(
                    <TableCell key={index} align="left" className="header-cell">
                      {item.name}
                    </TableCell>
                  )
                })
              }
            </TableRow>
          </TableHead>
          <TableBody className="table-body">
            {props.rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={props.columns.length + 1} className="empty-cell">
                  <div className="empty-state">
                    <span className="empty-icon">📭</span>
                    <span className="empty-text">No records found</span>
                    <span className="empty-subtext">Add some data to see it here</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              props.rows.map((row, index) => (
                <TableRow
                  key={index}
                  className="data-row"
                >
                  <TableCell align="center" className="action-cell">
                    <div className="action-buttons">
                      <Tooltip title="Edit Record" arrow>
                        <IconButton 
                          className="edit-btn" 
                          onClick={()=>{handleUpdate(row)}}
                          size="small"
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Record" arrow>
                        <IconButton 
                          className="delete-btn" 
                          onClick={()=>{handleDelete(row)}}
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                  {
                    props.columns.map((item, colIndex)=>{
                      const cellValue = row[item.name];
                      return(
                        <TableCell key={colIndex} align="left" className="data-cell">
                          {cellValue === null ? (
                            <span className="null-value">NULL</span>
                          ) : cellValue === "" ? (
                            <span className="empty-value">Empty</span>
                          ) : (
                            <span className="cell-value">{cellValue}</span>
                          )}
                        </TableCell>
                      )
                    })
                  }
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <DbDialog 
        key={2} 
        row={getRow['data']} 
        isUpdate={true} 
        tablename={props.tablename} 
        fetchData={props.getDataUrl} 
        column={props.columns} 
        setOpen={setOpen} 
        open={getOpen}
      />
    </div>
  );
}