import React from 'react'
import {RingLoader} from 'react-spinners'
import StorageIcon from '@mui/icons-material/Storage';
import "../CSS/loader.css"

export default function NsqlLoader(props) {
  return (
    <div className='loader-main'>
      <div className='loader-content'>
        <div className='loader-icon-wrapper'>
          <StorageIcon className='loader-icon' />
        </div>
        <RingLoader
          color="#667eea"
          loading={true}
          size={120}
          aria-label="Loading..."
          data-testid="loader"
          speedMultiplier={0.8}
        />
        <div className='loader-text'>
          <h3 className='loader-title'>Loading...</h3>
          <p className='loader-subtitle'>Please wait while we process your request</p>
        </div>
        <div className='loader-dots'>
          <span className='dot'></span>
          <span className='dot'></span>
          <span className='dot'></span>
        </div>
      </div>
    </div>
  )
}
