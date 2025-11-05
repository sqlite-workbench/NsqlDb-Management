import axios from "axios"
let Server_Url="https://nsqldb-backend.onrender.com"
// let Server_Url="http://localhost:5000"
const fetchResponse=async(url,body,config={headers:{"content-type":"application/json",auth:localStorage.getItem("auth")}},isString=true)=>{
    try{
        let data={
            method:"post",
            ...config,
            body:isString?JSON.stringify(body):body
        }
        console.log(data)
        let res=await fetch(`${Server_Url}${url}`,data)
        res=await res.json()
        return res;
    }
    catch(e){
        return {err:"Internal Error....."}
    }
}
const postRequestFile=async(url,body,config)=>{
    try{
        let res=await axios.post(`${Server_Url}/${url}`,body,{
            ...config
        })
        return res.data;
    }
    catch(e){
        if(e && e.response && e.response.data){
            return e.response.data
        }
        return {status:false,err:"Server Error..."}
    }
}
const deleteResponse=async(url,body,config={headers:{"content-type":"application/json",auth:localStorage.getItem("auth")}})=>{
    try{
        let res=await fetch(`${Server_Url}${url}`,{
            method:"post",
            ...config,
            body:JSON.stringify(body)
        })
        res=await res.json()
        return res;
    }
    catch(e){
        return {err:"Internal Error....."}
    }
}
const updateResponse=async(url,body,config={headers:{"content-type":"application/json",auth:localStorage.getItem("auth")}})=>{
    try{
        let res=await fetch(`${Server_Url}${url}`,{
            method:"post",
            ...config,
            body:JSON.stringify(body)
        })
        res=await res.json()
        return res;
    }
    catch(e){
        return {err:"Internal Error....."}
    }
}

export {fetchResponse,Server_Url,deleteResponse,updateResponse,postRequestFile};