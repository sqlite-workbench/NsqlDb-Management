import React from 'react'
import { useHistory } from 'react-router-dom'
export default function Home() {
    const history=useHistory()
    if(localStorage.getItem("auth") && !localStorage.getItem("dbname")){
        history.replace({pathname:"/dashboard"})
    }
    else if(localStorage.getItem("dbname")){
        history.replace({pathname:"/database"}) 
    }
  return (
      <div style={{width:"100%"}}>
          <img style={{width:"100%",height:"43vw"}} src="https://arctype.com/blog/content/images/2021/11/database-blue.png" alt="..."/>
      </div>
  )
}
