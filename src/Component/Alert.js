import React, { useContext, useEffect, useState } from 'react'
import ContextRouter from '../contextAPI/ContextRouter'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import "../CSS/alert.css"

export default function Alert(props) {
  const context = useContext(ContextRouter)
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev <= 0) {
          clearInterval(progressInterval)
          return 0
        }
        return prev - 2
      })
    }, 40)

    // Auto dismiss after 2 seconds
    const timer = setTimeout(() => {
      handleClose()
    }, 2000)

    return () => {
      clearTimeout(timer)
      clearInterval(progressInterval)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      context.setAlert({...context.getAlert, status: false})
    }, 300)
  }

  const getAlertIcon = () => {
    const colorLower = props.color?.toLowerCase()
    switch(colorLower) {
      case 'green':
        return <CheckCircleIcon className='alert-icon' />
      case 'red':
        return <ErrorIcon className='alert-icon' />
      case 'yellow':
      case 'orange':
        return <WarningIcon className='alert-icon' />
      default:
        return <InfoIcon className='alert-icon' />
    }
  }

  const getAlertType = () => {
    const colorLower = props.color?.toLowerCase()
    switch(colorLower) {
      case 'green':
        return 'success'
      case 'red':
        return 'error'
      case 'yellow':
      case 'orange':
        return 'warning'
      default:
        return 'info'
    }
  }

  return (
    <div className={`alert-container ${isVisible ? 'alert-visible' : 'alert-hidden'}`}>
      <div className={`alert-box alert-${getAlertType()}`}>
        <div className='alert-content'>
          <div className='alert-icon-wrapper'>
            {getAlertIcon()}
          </div>
          <div className='alert-message'>
            {props.msg}
          </div>
          <IconButton 
            className='alert-close-btn'
            onClick={handleClose}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div className='alert-progress'>
          <div 
            className='alert-progress-bar' 
            style={{width: `${progress}%`}}
          ></div>
        </div>
      </div>
    </div>
  )
}
