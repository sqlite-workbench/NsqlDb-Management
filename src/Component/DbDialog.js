import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import {Button,Grid,TextField} from '@mui/material';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {fetchResponse,updateResponse} from "../BackendServices/FetchServices"
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function DbDialog(props) {
  const [getValues,setValues]=useState({})
  const [getRun,setRun]=useState(false)
  useEffect(()=>{
      let obj={}
        for(let key of props.column){
            if(props.isUpdate){
                obj[key.name]={"old":props.row[key.name],new:props.row[key.name]}
            }
            else{
                obj[key.name]=""
            }
        }
        setValues(obj)
        setRun(!getRun)
  },[props.open])
  const handleClose = () => {
    props.setOpen(false);
  };
const handleChange=(e,item)=>{
    let obj=getValues
    // console.log("Object : ",obj)
    if(props.isUpdate){
        obj[item]['new']=e.currentTarget.value
        setValues(obj)
        setRun(!getRun)
    }
    else{
        obj[item]=e.currentTarget.value
        setValues(obj)
        setRun(!getRun)
    }
}
const handleAddRecord=async()=>{
    if(props.isUpdate){
        let body={dbname:localStorage.getItem("dbname"),tablename:props.tablename,data:getValues}
        console.log("Body : ",body)
        let res=await updateResponse("/updatedata",body)
        if(res[0]){
            alert("Update Data SuccessFully")
            handleClose()
            props.fetchData()
        }
        else{
            alert(res[1])
        }
    }
    else{

        let columns=[]
    let response="("
    for(let key in getValues){
        if(getValues[key]!==""){
            columns.push(key)
            response+=`'${getValues[key]}',`
        }
    }
    if(columns.length!==0){
        response=response.substring(0,response.length-1)+")"
        columns=`(${columns.join(",")})`
        let body={dbname:localStorage.getItem("dbname"),tablename:props.tablename,columnname:columns,columnvalues:response}
        let res=await fetchResponse("/insertdata",body)
        if(res[0]){
            alert("Insert Data SuccessFully")
            handleClose()
            props.fetchData()
        }
        else{
            alert(res[1])
        }
    }
    else{
        alert("Write Some Calues")
    }
    }
}
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {props.isUpdate?"Update":"Add"} Record
        </BootstrapDialogTitle>
        <DialogContent dividers style={{width:"500px"}}>
            <Grid containor style={{width:"99%"}}>
                {
                    Object.keys(getValues).map((item)=>{
                        let val=getValues[item];
                        return(
                            <Grid item xs={12}>
                                <TextField value={props.isUpdate?val.new:val}  style={{margin:10}} variant="outlined" label={item} fullWidth onChange={(e)=>{handleChange(e,item)}} />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </DialogContent> 
        <DialogActions>
          <Button autoFocus onClick={handleAddRecord}>
          {props.isUpdate?"Update":"Add"} Record
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
