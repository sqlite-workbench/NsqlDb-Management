import React, { useContext } from 'react'
import ContextRouter from '../contextAPI/ContextRouter'
import "../CSS/alert.css"
export default function Alert(props) {
  const context=useContext(ContextRouter)
  setTimeout(()=>{
      context.setAlert({...context.getAlert,status:false})
  },2000)
  return (
    <div className='alert-main'>
      <div  style={{backgroundColor:props.color}}>
        {props.msg}
      </div>
    </div>
  )
}
