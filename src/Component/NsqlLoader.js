import React from 'react'
import {RingLoader} from 'react-spinners'
import "../CSS/loader.css"
export default function NsqlLoader(props) {
  return (
    <div className='loader-main' >
    <RingLoader
        color="black"
        loading={true}
        size={150}
        aria-label="Fetching...."
        data-testid="loader"
        />
    </div>
  )
}
