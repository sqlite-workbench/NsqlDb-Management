const axios=require("axios")
let Server_Url="https://nsqldb.glitch.me"
const fetchResponse=async(url,body,method)=>{
    try{
        let res=await axios.post(`${Server_Url}${url}`,body)
    res=res.data
    if(res.status){
        console.log(res)
        return [true,res];
    }
    else{
        return [false,res.err]
    }
    }
    catch(e){
        console.log(e)
        return [false,e.message]
    }
}


export {fetchResponse,Server_Url};