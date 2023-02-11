import React,{useState} from 'react';
import Table from '@mui/material/Table';
import DeleteIcon from '@mui/icons-material/Delete';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {deleteResponse} from "../BackendServices/FetchServices"
import DbDialog from './DbDialog';
import { useContext } from 'react';
import ContextRouter from '../contextAPI/ContextRouter';
import UpdateIcon from '@mui/icons-material/Update';
export default function DbTable(props) {
  const [getOpen,setOpen]=useState(false)
  const [getRow,setRow]=useState({data:{}})
  const handleUpdate=(row)=>{
   setRow({data:row})
    setOpen(true)
  }
  const context=useContext(ContextRouter)
  const handleDelete=async(row)=>{
    let user_want=window.confirm("Are You Sure You Want to delete")
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
    <div style={{fontSize:16,fontWeight:300}}>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell align="left">Action</TableCell>
              {
                  props.columns.map((item)=>{
                      return(
                          <TableCell align="left">
                            <th>
                            {item.name}
                            </th>
                            </TableCell>
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
               <TableCell align="left"><span style={{cursor:"pointer",marginBlock:20}} onClick={()=>{handleDelete(row)}}><DeleteIcon/></span>  <span style={{cursor:"pointer"}} onClick={()=>{handleUpdate(row)}}><UpdateIcon/></span></TableCell>
             {
               props.columns.map((item)=>{
                return(
                    <TableCell align="left">
                      <td>
                      {row[item.name]===null?"null":row[item.name]}
                      </td>
                      </TableCell>
                )
            })
             }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      <DbDialog key={2} row={getRow['data']} isUpdate={true} tablename={props.tablename} fetchData={props.getDataUrl} column={props.columns} setOpen={setOpen} open={getOpen}/>
 </div>
      );
}