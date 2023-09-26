import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import ContextRouter from '../contextAPI/ContextRouter';
import "../CSS/home.css";
export default function Home() {
    const history=useHistory()
    const context=useContext(ContextRouter)
    if(localStorage.getItem("auth") && !localStorage.getItem("dbname")){
        history.replace({pathname:"/dashboard"})
    }
    else if(localStorage.getItem("dbname")){
        history.replace({pathname:"/database"}) 
    }
  return (
      <div className='home-head'>
            <div className='home-part-1'>
                <div className='home-part-11'>
                    <div id='main-heading'>
                    NSQLDB System that provide Sqlite database on Cloud. 
                    </div>
                    <div id='sub-heading'>
                    Visulize the Sqlite database is not tough now 
                    </div>
                    <div id='start-now-btn' >
                        <button onClick={()=>{history.push("/login");context.runLoader(10)}}>Start Now</button>
                    </div>
                </div>
                <div className='home-part-12'>
                    <img src='/mainPage.png'/>
                </div>
            </div>
            <div className='home-part-2'>
                <div className='home-part-21'>
                    <div className='home-part-211'>
                        <div className='home-heading'>
                                Why We Use NSQLDB ?
                        </div>
                        <div className='home-sub-heading'>
                            <ul>
                                <li>
                                    It provide an interface to intract with sqlite database in visiual form.
                                </li>
                                <li>
                                    It provide platform where you can create a database for you application it will Deploy you database on server and provide security and accesibility.
                                </li>
                                <li>
                                    It provide a feature using which user can interact with his database from front-end side using a API and access_key povided by Nsqldb.
                                </li>
                                <li>
                                    Here user can manage his existing sqlite database. 
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='home-part-212 side-img'>
                            <img src='why.png'/>
                    </div>
                </div>
                <div className='home-part-21'>
                    <div className='home-part-211 side-img'>
                    <img src='how.png'/>
                    </div>
                    <div className='home-part-212'>
                        <div className='home-heading'>
                            How Does It Works ?
                        </div>
                        <div className='home-sub-heading'>
                        <ul>
                                <li>
                                   You have to login or signUp.
                                </li>
                                <li>
                                    Then You get a APIKEY for your account where you can create multiple database for manage them.
                                </li>
                                <li>
                                    Using APIKEY you can access you database from any other application either backend or frontend.
                                </li>
                                <li>
                                    For More Info Read Documentation Link Below. 
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='home-part-3'>
                <div className='home-part-31'>

                <div className='msg-founder'>
            "We needed to be able to provide our clients with a platform that is as reliable as we are.Nsqldb provide you an Visulize interface for sqlite database."
                </div>
                <div className='founder-name'>
            Nitin Gupta
            <div className='founder-position'>
            Founder
            </div>
                </div>
                </div>
                <div className='home-part-32'>
                    <img src='/founder.jpg'/>
                </div>
            </div>
            <div className='home-part-4'>
                <div className='home-part-41'>
                    Ready To
                </div>
                <div className='home-part-42'>
                    Start Building ?
                </div>
                <div className='home-part-43'>
                    Deploy a free database now
                </div>
                <div className='home-btns'>
                    <div className='home-start' >
                    <button onClick={()=>{history.push("/login");context.runLoader(10)}}>Try Now</button>
                    </div>
                    <div className='home-documentation-link' >
                    <button onClick={()=>{history.push("/documentation")}}>View Documentation</button>
                    </div>
                </div>
                <div className='copyright'>
                &#169; {new Date().getFullYear()} NSQLDB
                </div>
            </div>
      </div>
  )
}
