import React,{useState} from 'react'
import {Grid,Button,TextField,Checkbox} from "@mui/material"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import RunQuery from "./RunQuery"
import {fetchResponse} from "../BackendServices/FetchServices"

export default function CreateTable(props) {
    const [getTableName,setTableName]=useState("")
    const [getAdditional,setAdditional]=useState("")
    const [getColumns,setColumns]=useState({column:[]})
    const handleAddColumn=()=>{
        let obj={columnName:"",dataType:"",isPrimary:false,isNotNull:false,isUnique:false,isAuto:false,isDefault:false,defaultValue:""}
        let arr=getColumns['column']
        arr.push(obj)
        setColumns({column:arr})
    }
    const handleChange=(e,name,index)=>{
        let arr=getColumns['column']
        let ourObj=arr[index]
        if(name==="columnName"){
            ourObj['columnName']=e.currentTarget.value
        }
        else if(name==="dataType"){
            ourObj[name]=e.target.value 
        }
        else if(name==="defaultValue"){
            let val=e.currentTarget.value
            if(val!==""){
                ourObj['defaultValue']=val
                ourObj['isDefault']=true
            }
            else{
                ourObj['isDefault']=false 
            }
        }
        else{
            ourObj[name]=!ourObj[name]
        }
        arr[index]=ourObj
        setColumns({column:arr})
    }
    const handleCreateTable=async()=>{
        if(getTableName===""){
            alert("Enter Table Name")
        }
        else{
            let tableData={}
            let arr=getColumns['column']
            for(let index in arr){
                let obj=arr[index]
                if(obj.columnName!=="" && obj.dataType!==""){
                    tableData[index]=obj
                }
            }
            if(Object.keys(tableData).length===0){
                alert("Add Some Column or set it's name")
            }
            else{
                let additional=getAdditional===""?undefined:getAdditional
                let body={dbname:localStorage.getItem("dbname"),tablename:getTableName,tableData,additional}
                let res=await fetchResponse("/createtable",body)
                if(res[0]){
                    alert("Table Create")
                    props.fetchTable()
                    props.setComponent(<RunQuery/>)
                }
                else{
                    alert(res[1])
                }

            }
        }
    }
    const handleDelete=(index)=>{
        let arr=getColumns['column']
        arr=arr.filter((_,position)=>{
            return position!==index
        })
        setColumns({column:arr})
    }
    function DbTable() {
        return (
          <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                <TableCell align="left">Action</TableCell>
                <TableCell align="left">Column Name</TableCell>
                <TableCell align="left">Data Type</TableCell>
                <TableCell align="left">Primary Key</TableCell>
                <TableCell align="left">Unique</TableCell>
                <TableCell align="left">Not Null</TableCell>
                <TableCell align="left">Auto Increment</TableCell>
                <TableCell align="left">Default</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                    getColumns['column'].map((item,index)=>{
                        return(
                          <TableRow key={index}>
                              <TableCell style={{cursor:"pointer"}} align="left" onClick={()=>handleDelete(index)}>Delete</TableCell>
                                <TableCell align="left"><TextField value={item.columnName} variant="outlined" label="Column Name" onChange={(e)=>{handleChange(e,"columnName",index)}}/></TableCell>
                                <TableCell align="left">
                                <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Data Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
            value={item.dataType}
          label="Data Type"
          onChange={(e)=>{handleChange(e,"dataType",index)}}
        >
          <MenuItem value={"integer"}>Integer</MenuItem>
          <MenuItem value={"text"}>Text</MenuItem>
          <MenuItem value={"real"}>Real</MenuItem>
          <MenuItem value={"boolean"}>Boolean</MenuItem>
        </Select>
      </FormControl>
                                    </TableCell>
                                <TableCell align="left"><Checkbox checked={item.isPrimary} onChange={(e)=>{handleChange(e,"isPrimary",index)}} size="large" /></TableCell>
                                <TableCell align="left"><Checkbox checked={item.isUnique} onChange={(e)=>{handleChange(e,"isUnique",index)}}  size="large" /></TableCell>
                                <TableCell align="left"><Checkbox checked={item.isNotNull} onChange={(e)=>{handleChange(e,"isNotNull",index)}}  size="large" /></TableCell>
                                <TableCell align="left"><Checkbox checked={item.isAuto} onChange={(e)=>{handleChange(e,"isAuto",index)}}  size="large" /></TableCell>
                                <TableCell align="left"><TextField onChange={(e)=>{handleChange(e,"defaultValue",index)}} value={item.defaultValue} variant="outlined" label="Default Value"/></TableCell>
                          </TableRow>  
                        )
                    })
                }
              </TableBody>
            </Table>
          </TableContainer>
       </>
            );
      }
    return (
    <div style={{width:"100%"}}>
        <Grid containor style={{width:"100%"}}>
            <Grid item xs={12} style={{margin:10,fontSize:30,fontWeight:500,textAlign:"center"}}>
                Create Table
            </Grid>
            <Grid item xs={12} style={{width:"98%",display:"flex",margin:10}}>
                <Grid item xs={12} style={{marginInline:20,width:"50%"}}>
                    <TextField onChange={(e)=>setTableName(e.currentTarget.value)} value={getTableName} fullWidth variant='outlined' label="Table Name"/>
                </Grid>
                <Grid item xs={12} style={{width:"50%"}}>
                    <Button style={{fontSize:18,padding:10,marginInline:30}} onClick={handleAddColumn} variant="outlined" color="primary">Add Column</Button>
                </Grid>
            </Grid>
            <Grid item xs={12} style={{width:"98%",display:"flex",margin:10}}>
                <Grid item xs={12} style={{marginInline:20,width:"50%"}}>
                    <TextField onChange={(e)=>setAdditional(e.currentTarget.value)} value={getAdditional} fullWidth variant='outlined' label="Additional"/>
                </Grid>
                <Grid item xs={12} style={{width:"50%"}}>
                    <Button style={{fontSize:18,padding:10,marginInline:30}} onClick={handleCreateTable} variant="outlined" color="primary">Create Table</Button>
                </Grid>
            </Grid>
            <Grid item xs={12} style={{marginBlock:20}}>
                {DbTable()}
            </Grid>
        </Grid>

    </div>
  )
}
