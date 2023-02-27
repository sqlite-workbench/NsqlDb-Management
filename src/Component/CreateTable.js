import React,{useState} from 'react'
import {TextField,Checkbox} from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ContextRouter from "../contextAPI/ContextRouter"
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {fetchResponse} from "../BackendServices/FetchServices"
import { useContext } from 'react';
import "../CSS/ct.css"

export default function CreateTable(props) {
    const [getTableName,setTableName]=useState("")
    const [getAdditional,setAdditional]=useState("")
    const [getColumns,setColumns]=useState({column:[]})
    const context=useContext(ContextRouter)
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
                ourObj['defaultValue']=""
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
            context.setAlert({status:true,msg:"Enter Table Name",color:"red"})
        }
        else{
            context.setLoader(true)
            let tableData={}
            let arr=getColumns['column']
            for(let index in arr){
                let obj=arr[index]
                if(obj.columnName!=="" && obj.dataType!==""){
                    tableData[index]=obj
                }
            }
            if(Object.keys(tableData).length===0){
                context.setAlert({status:true,msg:"Enter Some Column",color:"red"})
            }
            else{
                let additional=getAdditional===""?undefined:getAdditional
                let body={dbname:context.getDatabase,tablename:getTableName,tableData,additional}
                let res=await fetchResponse("/createtable",body)
                context.setLoader(false)
                if(res.status){

                    context.setAlert({status:true,msg:"Table Created",color:"green"})
                    context.fetchTable()
                }
                else{
                    context.setAlert({status:true,msg:res.err,color:"red"})
                }

            }
            context.setLoader(false)
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
                <div className='table-cell-main'>
                    <div className='table-cell-sub'>
                            <table className='table-main'>
                                <thead className='table-head'>
                                    <tr className='main-row'>
                                        <th >
                                            Action
                                        </th>
                                        <th className='text-btn'>
                                            Column Name
                                        </th>
                                        <th className='text-btn'>
                                            Data Type
                                        </th>
                                        <th className='text-btn'>
                                            Primary Key
                                        </th>
                                        <th className='text-btn'>
                                            Not Null
                                        </th>
                                        <th className='text-btn'>
                                            Auto Increment
                                        </th>
                                        <th className='text-btn'>
                                            Unqiue
                                        </th>
                                        <th className='text-btn'>
                                            Default Value
                                        </th>
                                    </tr>
                                </thead>
                                    {
                                        getColumns['column'].map((item,index)=>{
                                            return(
                                                <tr key={index} className="table-rows">
                                                    <th onClick={()=>handleDelete(index)} className="action-btn">
                                                        <DeleteIcon/>
                                                    </th>
                                                    <th className='text-btn'>
                                                    <TextField value={item.columnName} variant="standard" label="Column Name" onChange={(e)=>{handleChange(e,"columnName",index)}}/>
                                                    </th>
                                                    <th className='text-btn'>
                                                        <FormControl fullWidth>
                                                            <InputLabel variant='standard' id="demo-simple-select-label"></InputLabel>
                                                            <Select
                                                              labelId="demo-simple-select-label"
                                                              id="demo-simple-select"
                                                              variant='standard'
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
                                                    </th>
                                                    <th align="left"><Checkbox checked={item.isPrimary} onChange={(e)=>{handleChange(e,"isPrimary",index)}} size="large" /></th>
                                                    <th align="left"><Checkbox checked={item.isUnique} onChange={(e)=>{handleChange(e,"isUnique",index)}}  size="large" /></th>
                                                    <th align="left"><Checkbox checked={item.isNotNull} onChange={(e)=>{handleChange(e,"isNotNull",index)}}  size="large" /></th>
                                                    <th align="left"><Checkbox checked={item.isAuto} onChange={(e)=>{handleChange(e,"isAuto",index)}}  size="large" /></th>
                                                    <th  className='text-btn'align="left"><TextField onChange={(e)=>{handleChange(e,"defaultValue",index)}} value={item.defaultValue} variant="standard" label="Default Value"/></th>
                                                </tr>
                                            )
                                        })
                                    }
                                
                    </table>
                    </div>
                </div>
            );
      }
    return (
    <div className='create-table-main-div'>
            <div className='ct-sub-div'>
                <div className='heading'>
                    Create Table
                </div>
                <div className='ct-tablename'>
                    <div className='text-area'>
                    <TextField fullWidth onChange={(e)=>setTableName(e.currentTarget.value)} value={getTableName} variant='outlined' label="Table Name"/>
                    </div>
                    <div className='ct-addcolumn'>
                        <button  onClick={handleAddColumn}  >Add Column</button>
                    </div>
                </div>
                <div className='ct-tablename'>
                    <div className='text-area'>
                        <TextField onChange={(e)=>setAdditional(e.currentTarget.value)} multiline rows={2} value={getAdditional} fullWidth variant='outlined' label="Additional Query"/>
                    </div>
                    <div className='ct-addcolumn'>
                        <button onClick={handleCreateTable}>Create Table</button>
                    </div>
                </div>
                <div className='ct-main-window'>
                    {DbTable()}
                </div>
                
            </div>
    </div>
  )
}
