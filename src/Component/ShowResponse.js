import React,{useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
export default function ShowResponse(props) {
  const [getData,setData]=useState(props.data)
  const [getColumns,setColumns]=useState([])
  const findColumns=()=>{
    let arr=Object.keys(getData[0])
    setColumns(arr);
  }
    useEffect(()=>{
        findColumns()
    },[getData])
    useEffect(()=>{
        setData(props.data)
    },[props.data])
  return (
    <div style={{fontSize:16,fontWeight:300}}>
        <div className='heading' style={{fontSize:18}}>
            {props.tablename}
        </div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
              {
                  getColumns.map((item)=>{
                      return(
                          <TableCell align="left">
                            <th>
                            {item}
                            </th>
                            </TableCell>
                      )
                  })
              }
          </TableRow>
        </TableHead>
        <TableBody>
          {getData.map((row,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
             {
               getColumns.map((item)=>{
                return(
                    <TableCell align="left">
                      <td>
                      {row[item]===null?"null":row[item]}
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
      </div>
      );
}