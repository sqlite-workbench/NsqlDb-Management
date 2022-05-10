import React,{useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {deleteResponse} from "../BackendServices/FetchServices"
import DbDialog from './DbDialog';
export default function DbTable(props) {
  const [getOpen,setOpen]=useState(false)
  const [getRow,setRow]=useState({data:{}})
  const handleUpdate=(row)=>{
   setRow({data:row})
    setOpen(true)
  }
  const handleDelete=async(row)=>{
    let user_want=window.confirm("Are You Sure You Want to delete")
    if(user_want){

      let body={"dbname":localStorage.getItem("dbname"),"tablename":props.tablename,user:row}
      
    let res=await deleteResponse("/deletedata",body)
    if(res[0]){
      alert("Record Deleted")
        props.getDataUrl();
      }
    else{
      alert(JSON.stringify(res[1]))
    }
  }
  }
  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell align="left">Action</TableCell>
              {
                  props.columns.map((item)=>{
                      return(
                          <TableCell align="left">{item.name}</TableCell>
                      )
                  })
              }
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell align="left"><span style={{cursor:"pointer"}} onClick={()=>{handleDelete(row)}}>Delete</span>  <span style={{cursor:"pointer"}} onClick={()=>{handleUpdate(row)}}>Update</span></TableCell>
             {
               props.columns.map((item)=>{
                return(
                    <TableCell align="left">{row[item.name]===null?"null":row[item.name]}</TableCell>
                )
            })
             }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      <DbDialog key={2} row={getRow['data']} isUpdate={true} tablename={props.tablename} fetchData={props.getDataUrl} column={props.columns} setOpen={setOpen} open={getOpen}/>
 </>
      );
}