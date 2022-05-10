import React from 'react';
import {Grid,TextField} from '@mui/material'
export default function Profile(props) {
  return (
    <div style={{padding:10,marginBlock:30,display:"flex",width:"95%",justifyContent:"center"}}>
        <Grid containor style={{border:"1px solid black",padding:20,width:"50%",backgroundColor:"#e5f1cc",boxShadow:"12px 12px 12px gray"}}>
            <Grid item xs={12} style={{margin:10,fontSize:25,fontWeight:600,textAlign:"center"}}>
                Profile
            </Grid>
            <Grid item xs={12} style={{margin:10}}>
                <TextField  value={props.user.name} disabled fullWidth variant="outlined" label="Name" required />
            </Grid>
            <Grid item xs={12} style={{margin:10}}>
                <TextField  value={props.user.emailid} disabled fullWidth variant="outlined" label="Email Id" type="email" required />
            </Grid>
            <Grid item xs={12} style={{margin:10}}>
                <TextField  value={props.user.contactnumber} disabled  variant="outlined" fullWidth label="Contact Number" required  />
            </Grid>
            <Grid item xs={12} style={{margin:10}}>
                <TextField  value={props.user.apikey} multiline rows={2} disabled  variant="outlined" fullWidth label="Api Key" type='text' required />
            </Grid>
        </Grid>
    </div>
  );
}
