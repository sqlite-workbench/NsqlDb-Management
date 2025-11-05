import React,{useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableChartIcon from '@mui/icons-material/TableChart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import '../CSS/showresponse.css';

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
    <div className="show-response-container">
        {/* Header Section */}
        <div className="response-header">
            <div className="header-content">
                <TableChartIcon className="response-icon" />
                <div className="header-text">
                    <h3 className="response-title">Query Results</h3>
                    <p className="query-text">{props.tablename}</p>
                </div>
            </div>
            <div className="result-badge">
                <CheckCircleIcon className="badge-icon" />
                <span>{getData.length} {getData.length === 1 ? 'row' : 'rows'}</span>
            </div>
        </div>

        {/* Table Section */}
        <TableContainer component={Paper} className="table-container">
            <Table sx={{ minWidth: 650 }} aria-label="query results table" className="response-table">
                <TableHead className="table-head">
                    <TableRow>
                        {getColumns.map((item, index) => (
                            <TableCell key={index} align="left" className="table-header-cell">
                                {item}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody className="table-body">
                    {getData.map((row, rowIndex) => (
                        <TableRow
                            key={rowIndex}
                            className="table-row"
                        >
                            {getColumns.map((item, colIndex) => (
                                <TableCell key={colIndex} align="left" className="table-cell">
                                    {row[item] === null ? <span className="null-value">null</span> : row[item]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
  );
}