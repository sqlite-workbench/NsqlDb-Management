const axios=require("axios")
let Server_Url="https://nsqldb.glitch.me"
const fetchResponse=async(url,body,method)=>{
    try{
        let res=await axios.post(`${Server_Url}${url}`,body)
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
const deleteResponse=async(url,body)=>{
    try{
        let res=await axios.delete(`${Server_Url}${url}`,body)
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
const updateResponse=async(url,body)=>{
    try{
        let res=await axios.put(`${Server_Url}${url}`,body)
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