const axios=require("axios")
let Server_Url="https://nsqldb.glitch.me"
// let Server_Url="http://localhost:5000"
const fetchResponse=async(url,body,config={headers:{"content-type":"application/json",auth:localStorage.getItem("auth")}})=>{
    try{
        let res=await axios.post(`${Server_Url}${url}`,body,config)
        res=res.data
        return [true,res];
    
    }
    catch(e){
        if(e.response && e.response.data){
             let res=e.response.data;
            return [false,res.err]
        }
        else{
            return [false,e.message]
        }
    }
}
const deleteResponse=async(url,body,config={headers:{"content-type":"application/json",auth:localStorage.getItem("auth")}})=>{
    try{
        let res=await axios.post(`${Server_Url}${url}`,body,config)
        res=res.data
        return [true,res];
    
    }
    catch(e){
        if(e.response && e.response.data){
             let res=e.response.data;
            return [false,res.err]
        }
        else{
            return [false,e.message]
        }
    }
}
const updateResponse=async(url,body,config={headers:{"content-type":"application/json",auth:localStorage.getItem("auth")}})=>{
    try{
        let res=await axios.post(`${Server_Url}${url}`,body,config)
        res=res.data
        return [true,res];
    
    }
    catch(e){
        if(e.response && e.response.data){
             let res=e.response.data;
            return [false,res.err]
        }
        else{
            return [false,e.message]
        }
    }
}


export {fetchResponse,Server_Url,deleteResponse,updateResponse};