import React,{useState,useEffect} from 'react'
import {deleteResponse, fetchResponse} from "../BackendServices/FetchServices"
import {Button,Grid} from "@mui/material"
import DbTable from './DbTable'
import RunQuery from './RunQuery'
import DbDialog from './DbDialog'
export default function TableData(props) {
    const [getData,setData]=useState({data:[]})
    const [getColumn,setColumn]=useState({column:[]})
    const [getOpen,setOpen]=useState(false)
    const getDataUrl=async()=>{
        let body={dbname:localStorage.getItem("dbname"),tablename:props.tablename}
        let res=await fetchResponse("/getalldata",body)
        if(res[0]){
            console.log(res[1].data)
            setData({data:res[1].data})
        }
        else{
            alert(res[1])
        }
    }
    const getColumnUrl=async()=>{
        let body={dbname:localStorage.getItem("dbname"),tablename:props.tablename}
        let res=await fetchResponse("/tableinfo",body)
        if(res[0]){
            console.log(res[1].data)
            let data=res[1].data
            setColumn({column:data})
            // let outPut=[]
            // for(let key of data){
            //     outPut.push({title:key.name,field:key.name})
            // }
            // setColumn({column:outPut})
        }
        else{
            alert(res[1])
        }
    }
    useEffect(()=>{
        getColumnUrl()
        getDataUrl()
    },[props.tablename])

    const handleDropTable=async()=>{
        let user_want=window.confirm(`Are You Sure You Want to Drop '${props.tablename}' Table`)
    if(user_want){
      let body={data:{"dbname":localStorage.getItem("dbname"),"tablename":props.tablename}}
    let res=await deleteResponse("/droptable",body)
    if(res[0]){
        alert("Table Deleted")
        props.fetchTable()
        props.handleSetContent(<RunQuery/>)
      }
    else{
      alert(JSON.stringify(res[1]))
    }
  }
    }
    
  return (
    <div style={{display:"flex",flexDirection:"column"}}>
        <Grid containor>
            <Grid item xs={12} style={{fontSize:30,fontWeight:"bold",textDecoration:"lowercase",textAlign:"center",margin:20}}>
        {props.tablename}
            </Grid>
            <Grid xs={12} style={{margin:20}}>
        <Button style={{margin:20}} variant="outlined" onClick={handleDropTable} color="secondary">Drop Table</Button>
        <Button style={{margin:20}} variant="outlined" onClick={()=>setOpen(true)} color="primary">Add Data</Button>
            </Grid>
            <Grid xs={12} style={{marginBottom:20}}>

    <DbTable getDataUrl={getDataUrl} tablename={props.tablename} rows={getData['data']} columns={getColumn['column']}/>
            </Grid>
        </Grid>
    <DbDialog key={1} tablename={props.tablename} fetchData={getDataUrl} column={getColumn['column']} setOpen={setOpen} open={getOpen}/>
    </div> 
  )
}
