let Server_Url="https://nsqldb.glitch.me"

// let Server_Url="http://localhost:5000"
const fetchResponse=async(url,body,config={headers:{"content-type":"application/json",auth:localStorage.getItem("auth")}})=>{
    try{
        let data={
            method:"post",
            ...config,
            body:JSON.stringify(body)
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

export {fetchResponse,Server_Url,deleteResponse,updateResponse};