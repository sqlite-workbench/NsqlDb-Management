import React,{useState} from 'react'
import {TextField,Checkbox} from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import TableChartIcon from '@mui/icons-material/TableChart';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ContextRouter from "../contextAPI/ContextRouter"
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {fetchResponse} from "../BackendServices/FetchServices"
import { useContext } from 'react';
import "../CSS/createtable.css"

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
                                        <th className='table-header-cell action-cell'>
                                            Action
                                        </th>
                                        <th className='table-header-cell'>
                                            Column Name
                                        </th>
                                        <th className='table-header-cell'>
                                            Data Type
                                        </th>
                                        <th className='table-header-cell'>
                                            Primary Key
                                        </th>
                                        <th className='table-header-cell'>
                                            Not Null
                                        </th>
                                        <th className='table-header-cell'>
                                            Auto Increment
                                        </th>
                                        <th className='table-header-cell'>
                                            Unique
                                        </th>
                                        <th className='table-header-cell'>
                                            Default Value
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='table-body'>
                                    {getColumns['column'].length === 0 ? (
                                        <tr>
                                            <td colSpan="8" className='empty-row'>
                                                <div className='empty-state'>
                                                    <span className='empty-icon'>📋</span>
                                                    <span className='empty-text'>No columns added yet</span>
                                                    <span className='empty-subtext'>Click "Add Column" to get started</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        getColumns['column'].map((item,index)=>{
                                            return(
                                                <tr key={index} className="table-row">
                                                    <td onClick={()=>handleDelete(index)} className="action-cell">
                                                        <button className="delete-btn">
                                                            <DeleteIcon className='delete-icon'/>
                                                        </button>
                                                    </td>
                                                    <td className='input-cell'>
                                                        <TextField 
                                                            value={item.columnName} 
                                                            variant="outlined" 
                                                            label="Column Name" 
                                                            size="small"
                                                            className='cell-input'
                                                            onChange={(e)=>{handleChange(e,"columnName",index)}}
                                                        />
                                                    </td>
                                                    <td className='input-cell'>
                                                        <FormControl fullWidth size="small">
                                                            <InputLabel id={`datatype-label-${index}`}>Data Type</InputLabel>
                                                            <Select
                                                                labelId={`datatype-label-${index}`}
                                                                id={`datatype-${index}`}
                                                                value={item.dataType}
                                                                label="Data Type"
                                                                className='cell-select'
                                                                onChange={(e)=>{handleChange(e,"dataType",index)}}
                                                            >
                                                                <MenuItem value={"integer"}>Integer</MenuItem>
                                                                <MenuItem value={"text"}>Text</MenuItem>
                                                                <MenuItem value={"real"}>Real</MenuItem>
                                                                <MenuItem value={"boolean"}>Boolean</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </td>
                                                    <td className='checkbox-cell'>
                                                        <Checkbox 
                                                            checked={item.isPrimary} 
                                                            onChange={(e)=>{handleChange(e,"isPrimary",index)}} 
                                                            className='custom-checkbox'
                                                        />
                                                    </td>
                                                    <td className='checkbox-cell'>
                                                        <Checkbox 
                                                            checked={item.isUnique} 
                                                            onChange={(e)=>{handleChange(e,"isUnique",index)}}  
                                                            className='custom-checkbox'
                                                        />
                                                    </td>
                                                    <td className='checkbox-cell'>
                                                        <Checkbox 
                                                            checked={item.isNotNull} 
                                                            onChange={(e)=>{handleChange(e,"isNotNull",index)}}  
                                                            className='custom-checkbox'
                                                        />
                                                    </td>
                                                    <td className='checkbox-cell'>
                                                        <Checkbox 
                                                            checked={item.isAuto} 
                                                            onChange={(e)=>{handleChange(e,"isAuto",index)}}  
                                                            className='custom-checkbox'
                                                        />
                                                    </td>
                                                    <td className='input-cell'>
                                                        <TextField 
                                                            onChange={(e)=>{handleChange(e,"defaultValue",index)}} 
                                                            value={item.defaultValue} 
                                                            variant="outlined" 
                                                            label="Default Value"
                                                            size="small"
                                                            className='cell-input'
                                                        />
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    )}
                                </tbody>
                    </table>
                    </div>
                </div>
            );
      }
    return (
    <div className='create-table-main-div'>
            <div className='ct-sub-div'>
                {/* Header */}
                <div className='ct-header'>
                    <div className='header-content'>
                        <TableChartIcon className='header-icon' />
                        <h2 className='header-title'>Create New Table</h2>
                    </div>
                </div>

                {/* Table Name Section */}
                <div className='ct-section'>
                    <div className='section-label'>
                        <span className='label-icon'>🏷️</span>
                        <span>Table Name</span>
                    </div>
                    <div className='ct-tablename'>
                        <div className='text-area'>
                            <TextField 
                                fullWidth 
                                onChange={(e)=>setTableName(e.currentTarget.value)} 
                                value={getTableName} 
                                variant='outlined' 
                                label="Table Name"
                                className='ct-input'
                                placeholder='e.g., users, products, orders'
                            />
                        </div>
                        <button className='ct-btn add-column-btn' onClick={handleAddColumn}>
                            <AddIcon className='btn-icon' />
                            <span>Add Column</span>
                        </button>
                    </div>
                </div>

                {/* Additional Query Section */}
                <div className='ct-section'>
                    <div className='section-label'>
                        <span className='label-icon'>⚙️</span>
                        <span>Additional Configuration</span>
                    </div>
                    <div className='ct-tablename'>
                        <div className='text-area'>
                            <TextField 
                                onChange={(e)=>setAdditional(e.currentTarget.value)} 
                                multiline 
                                rows={2} 
                                value={getAdditional} 
                                fullWidth 
                                variant='outlined' 
                                label="Additional Query"
                                className='ct-input'
                                placeholder='e.g., FOREIGN KEY constraints'
                            />
                        </div>
                        <button className='ct-btn create-table-btn' onClick={handleCreateTable}>
                            <TableChartIcon className='btn-icon' />
                            <span>Create Table</span>
                        </button>
                    </div>
                </div>

                {/* Table Columns Section */}
                <div className='ct-main-window'>
                    {DbTable()}
                </div>
                
            </div>
    </div>
  )
}
