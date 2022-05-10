import React from 'react'
import {Grid} from '@mui/material'
export default function Documentation() {
  return (
    <div style={{padding:10,marginBlock:30,display:"flex",width:"95%",justifyContent:"center"}}>
        <Grid containor style={{border:"1px solid black",padding:20,width:"50%",backgroundColor:"#e5f1cc",boxShadow:"12px 12px 12px gray"}}>
            <Grid item xs={12} style={{margin:10,fontSize:25,fontWeight:600,textAlign:"center"}}>
            Documentation
            </Grid>
            <Grid item xs={12} style={{margin:10,fontSize:20}}>
                Api https://nsqldb.glitch.me
            </Grid>
            <Grid item xs={12} style={{margin:10,fontSize:20}}>
                Method Post
            </Grid>
            <Grid item xs={12} style={{margin:10,fontSize:20}}>
                Body:
                   <ul>
                 <li>
                   dbname (Database Name)
                 </li>
                 <li>
                   Query (sqlite query)
                 </li>
                   </ul>
            </Grid>
            <Grid item xs={12} style={{margin:10,fontSize:20}}>
              Api Key:
              Pass in headers or body any one
              <ul>
                <li>
              headers:{"{apikey:key}"}
                </li>
                <li>
              body:{"{apikey:key}"}
                </li>
              </ul>
            </Grid>
            <Grid item xs={12} style={{margin:10,fontSize:20}}>
              Example:
                  request.post("https://nsqldb.gltich.me/run",{"{dbname:'test',query:'select * from tem;'}"},{"{content-type:'application/json','apikey':'key'}"});
            </Grid>
            </Grid>

    </div>
  )
}
