import React,{useState,useEffect} from 'react';
import {Button,Grid,TextField} from '@mui/material';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {fetchResponse,updateResponse} from "../BackendServices/FetchServices"
import { useContext } from 'react';
import ContextRouter from '../contextAPI/ContextRouter';
import '../CSS/dbdialog.css';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2),
  },
  '& .MuiPaper-root': {
    borderRadius: '16px',
    boxShadow: '0 20px 60px rgba(102, 126, 234, 0.3)',
    overflow: 'visible',
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, isUpdate, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 0 }} {...other}>
      <div className="dialog-header">
        <div className="dialog-header-content">
          {isUpdate ? (
            <EditIcon className="dialog-header-icon" />
          ) : (
            <AddIcon className="dialog-header-icon" />
          )}
          <span className="dialog-title">{children}</span>
        </div>
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            className="dialog-close-btn"
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </div>
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  isUpdate: PropTypes.bool,
};

export default function DbDialog(props) {
  const [getValues,setValues]=useState({})
  const [getRun,setRun]=useState(false)
  const context=useContext(ContextRouter)
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
  context.setLoader(true)
    if(props.isUpdate){
        let body={dbname:context.getDatabase,tablename:props.tablename,data:getValues}
        let res=await updateResponse("/updatedata",body)
        if(res.status){
          context.setAlert({status:true,msg:"Data Updated",color:"green"})
            handleClose()
            props.fetchData()
        }
        else{
          context.setAlert({status:true,msg:res.err,color:"red"})
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
        let body={dbname:context.getDatabase,tablename:props.tablename,columnname:columns,columnvalues:response}
        let res=await fetchResponse("/insertdata",body)
        if(res.status){
            context.setAlert({status:true,msg:"Data Inserted",color:"green"})
            handleClose()
            props.fetchData()
        }
        else{
          context.setAlert({status:true,msg:res.err,color:"red"})
        }
    }
    else{
      context.setAlert({status:true,msg:"Write Some Values",color:"yellow"})
    }
    }
    context.setLoader(false)
}
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
        maxWidth="sm"
        fullWidth
      >
        <BootstrapDialogTitle 
          id="customized-dialog-title" 
          onClose={handleClose}
          isUpdate={props.isUpdate}
        >
          {props.isUpdate?"Update":"Add"} Record
        </BootstrapDialogTitle>
        <DialogContent dividers className="dialog-content">
            <div className="dialog-form">
                {
                    Object.keys(getValues).map((item, index)=>{
                        let val=getValues[item];
                        return(
                            <div key={index} className="form-field">
                                <div className="field-label">
                                    <span className="field-icon">📝</span>
                                    <span className="field-name">{item}</span>
                                </div>
                                <TextField 
                                    value={props.isUpdate?val.new:val}  
                                    variant="outlined" 
                                    placeholder={`Enter ${item}`}
                                    fullWidth 
                                    className="dialog-input"
                                    onChange={(e)=>{handleChange(e,item)}} 
                                />
                            </div>
                        )
                    })
                }
            </div>
        </DialogContent> 
        <DialogActions className="dialog-actions">
          <Button 
            onClick={handleClose}
            className="dialog-cancel-btn"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleAddRecord}
            className={props.isUpdate ? "dialog-update-btn" : "dialog-add-btn"}
            variant="contained"
            startIcon={props.isUpdate ? <SaveIcon /> : <AddIcon />}
          >
            {props.isUpdate?"Update":"Add"} Record
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
