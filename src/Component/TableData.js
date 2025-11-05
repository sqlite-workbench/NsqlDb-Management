import React,{useState,useEffect, useContext} from 'react'
import {deleteResponse, fetchResponse} from "../BackendServices/FetchServices"
import {Button,Grid} from "@mui/material"
import DbTable from './DbTable'
import RunQuery from './RunQuery'
import DbDialog from './DbDialog'
import ContextRouter from '../contextAPI/ContextRouter'
import CreateTable from './CreateTable'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import AddIcon from '@mui/icons-material/Add'
import TableChartIcon from '@mui/icons-material/TableChart'
import '../CSS/tabledata.css'

export default function TableData(props) {
    const context=useContext(ContextRouter)
    const [getData,setData]=useState({data:[]})
    const [getColumn,setColumn]=useState({column:[]})
    const [getOpen,setOpen]=useState(false)
    if(context.getTableList===0){
        props.handleSetContent(<CreateTable fetchTable={context.fetchTable} setComponent={props.handleSetContent}/>)
    }
    const getDataUrl=async()=>{
        let body={dbname:context.getDatabase,tablename:context.getTable}
        let res=await fetchResponse("/getalldata",body)
        context.setLoader(true)
        if(res.status){
            setData({data:res.data})
        }
        else{
            context.setAlert({status:true,msg:res.err,"color":"red"})
        }
        context.setLoader(false)
    }
    const getColumnUrl=async()=>{
        let body={dbname:context.getDatabase,tablename:context.getTable}
        let res=await fetchResponse("/tableinfo",body)
        context.setLoader(true)
        if(res.status){
            let data=res.data
            setColumn({column:data})
        }
        else{
            context.setAlert({status:true,msg:res.err,"color":"red"})
        }
        context.setLoader(false)
    }
    useEffect(()=>{
        getColumnUrl()
        getDataUrl()
    },[context.getTable])

    const handleDropTable=async()=>{
        let user_want=window.confirm(`Are You Sure You Want to Drop '${context.getTable}' Table`)
    if(user_want){
        context.setLoader(true)
      let body={"dbname":context.getDatabase,"tablename":context.getTable}
    let res=await deleteResponse("/droptable",body)
    if(res.status){
        context.setAlert({status:true,msg:"Table Drop Successfully","color":"green"})
        context.fetchTable()
        if(context.getTableList.length!==0)
        context.setTable(context.getTableList[0].name)
      }
    else{
        context.setAlert({status:true,msg:res.err,"color":"red"})
    }
    context.setLoader(false)
  }
    }
    
  return (
    <div className="table-data-container">
        {/* Header Section */}
        <div className="table-header">
            <div className="table-title-wrapper">
                <TableChartIcon className="table-icon" />
                <h2 className="table-title">{context.getTable}</h2>
                <span className="table-badge">
                    {getData['data'].length} {getData['data'].length === 1 ? 'row' : 'rows'}
                </span>
            </div>
            
            <div className="table-actions">
                <button className="action-btn add-btn" onClick={() => setOpen(true)}>
                    <AddIcon className="btn-icon" />
                    <span>Add Data</span>
                </button>
                <button className="action-btn drop-btn" onClick={handleDropTable}>
                    <DeleteOutlineIcon className="btn-icon" />
                    <span>Drop Table</span>
                </button>
            </div>
        </div>

        {/* Table Content */}
        <div className="table-content">
            <DbTable 
                getDataUrl={getDataUrl} 
                tablename={context.getTable} 
                rows={getData['data']} 
                columns={getColumn['column']}
            />
        </div>

        {/* Dialog */}
        <DbDialog 
            key={1} 
            tablename={context.getTable} 
            fetchData={getDataUrl} 
            column={getColumn['column']} 
            setOpen={setOpen} 
            open={getOpen}
        />
    </div> 
  )
}
