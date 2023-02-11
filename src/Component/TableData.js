import React,{useState,useEffect, useContext} from 'react'
import {deleteResponse, fetchResponse} from "../BackendServices/FetchServices"
import {Button,Grid} from "@mui/material"
import DbTable from './DbTable'
import RunQuery from './RunQuery'
import DbDialog from './DbDialog'
import ContextRouter from '../contextAPI/ContextRouter'
export default function TableData(props) {
    const context=useContext(ContextRouter)
    const [getData,setData]=useState({data:[]})
    const [getColumn,setColumn]=useState({column:[]})
    const [getOpen,setOpen]=useState(false)
    const getDataUrl=async()=>{
        let body={dbname:context.getDatabase,tablename:props.tablename}
        let res=await fetchResponse("/getalldata",body)
        if(res.status){
            setData({data:res.data})
        }
        else{
            alert(res.err)
        }
    }
    const getColumnUrl=async()=>{
        let body={dbname:context.getDatabase,tablename:props.tablename}
        let res=await fetchResponse("/tableinfo",body)
        if(res.status){
            let data=res.data
            setColumn({column:data})
            // let outPut=[]
            // for(let key of data){
            //     outPut.push({title:key.name,field:key.name})
            // }
            // setColumn({column:outPut})
        }
        else{
            alert(res.err)
        }
    }
    useEffect(()=>{
        getColumnUrl()
        getDataUrl()
    },[props.tablename])

    const handleDropTable=async()=>{
        let user_want=window.confirm(`Are You Sure You Want to Drop '${props.tablename}' Table`)
    if(user_want){
        context.setLoader(true)
      let body={"dbname":context.getDatabase,"tablename":props.tablename}
    let res=await deleteResponse("/droptable",body)
    if(res.status){
        context.setAlert({status:true,msg:"Table Drop Successfully","color":"green"})
        context.fetchTable()
      }
    else{
        context.setAlert({status:true,msg:res.err,"color":"red"})
    }
    context.setLoader(false)
  }
    }
    
  return (
    <div style={{display:"flex",flexDirection:"column"}}>
        <Grid containor>
            <Grid item xs={12} style={{fontSize:30,fontWeight:"350",textDecoration:"lowercase",textAlign:"center",margin:20,textTransform:"uppercase"}}>
        {props.tablename}
            </Grid>
            <Grid xs={6} style={{margin:20,display:"flex"}}>
                <div className='ct-addcolumn' style={{width:"15%"}}>
                    <button  onClick={handleDropTable} >Drop Table</button>
                </div>
                <div style={{width:"15%"}} className='ct-addcolumn'>

                    <button  onClick={()=>setOpen(true)} >Add Data</button>
                </div>
            </Grid>
            <Grid xs={12} style={{marginBottom:20}}>

    <DbTable getDataUrl={getDataUrl} tablename={props.tablename} rows={getData['data']} columns={getColumn['column']}/>
            </Grid>
        </Grid>
    <DbDialog key={1} tablename={props.tablename} fetchData={getDataUrl} column={getColumn['column']} setOpen={setOpen} open={getOpen}/>
    </div> 
  )
}
