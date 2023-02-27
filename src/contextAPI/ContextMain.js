import React,{useEffect, useState} from 'react'
import ContextRouter from './ContextRouter'
import { fetchResponse } from '../BackendServices/FetchServices'
import { useHistory } from 'react-router-dom'
export default function ContextMain(props) {
    const history=useHistory()
    const [getProgress,setProgress]=useState(0)
    const [getLoader,setLoader]=useState(false)
    const [getDatabase,setDatabase]=useState("")
    const [getDatabaseList,setDatabaseList]=useState([])
    const [isFetch,setIsFetch]=useState(false)
    const [getTable,setTable]=useState("")
    const [getTableList,setTableList]=useState([])
    const [getAlert,setAlert]=useState({status:false,msg:"Server Error.....",color:"red"})
    const [getUser,setUser]=useState({"name":"",emailid:"",contactnumber:"",apikey:""})
    
    const ActiveLoader=()=>{
        document.body.style.overflow="none"
        setLoader(true);
    }
    const DeactiveLoader=()=>{
        document.body.style.overflow="auto"
        setLoader(false);
    }
    const fetchUser=async()=>{
        setLoader(true)
        try{
            let res;
            if(localStorage.getItem("auth")){
                res=await fetchResponse("/profile",{});
            }
            else{
                res={err:"Not Valid"}
            }
            if(res.status){
                let data=res.data
                setUser({...data})
                await fetchDatabase()
            }
            else{
                setUser({name:"",emailid:"",contactnumber:"",apikey:""})
                if(localStorage.getItem('auth')){
                    setAlert({status:true,msg:"Session Expired","color":"yellow"})
                }
            }
        }
        catch(e){
            setAlert({status:true,msg:"Server Error...","color":"red"})
        }
        finally{
            runLoader(10)
            history.replace({"pathname":"/"})
        }
        setLoader(false);
    }
    const runLoader=async(timer)=>{
        for(let i=0;i<10;i++){
            setProgress(timer);
            let a=await sleep(10);
            timer+=10;
            // console.log(getProgress,timer)
        }
    }
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    const fetchDatabase=async()=>{
        setLoader(true)
        try{
            let res=await fetchResponse("/getalldatabase",{}) 
            if(res.status){
                setDatabaseList(res.data)
                if(res.data.length>0){
                    setDatabase(`${res.data[0].databasename}`)
                }
            }
            else{
                setAlert({status:true,msg:"Session Expired","color":"yellow"})
                history.replace({"pathname":"/"})
            }
        }
        catch(e){
            setAlert({status:true,msg:"Internal Error...",color:"red"})
            history.replace({"pathname":"/"})
        }
        setLoader(false)
    }
    const fetchTable=async(databasename)=>{
        setLoader(true)
        try{
            let body={dbname:databasename?databasename:getDatabase}
            let res=await fetchResponse("/table",body)
            if(res.status){
                setTableList(res.data)
            }
            else{
                setAlert({status:true,msg:"Session Expired","color":"yellow"})
                history.replace({"pathname":"/"})
            }
        }
        catch(e){
            setAlert({status:true,msg:"Internal Error...",color:"red"})
            history.replace({"pathname":"/"})
        }
        setLoader(false);
    }
    useEffect(()=>{
        fetchUser()
    },[isFetch])
    useEffect(()=>{
        if(getDatabase!="")
            fetchTable()
    },[getDatabase])
  return (
    <ContextRouter.Provider value={{fetchTable,getTable,setTable,getTableList,setTableList,getDatabaseList,setDatabaseList,getDatabase,setDatabase,runLoader,setIsFetch,isFetch,fetchUser,getUser,getProgress,setProgress,getAlert,setAlert,getLoader,ActiveLoader,DeactiveLoader,setLoader,fetchDatabase}}>
            {props.children}
    </ContextRouter.Provider>
  )
}
