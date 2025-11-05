import React from 'react';
import '../CSS/navbar.css';

export default function Navbar() {
  return (
    <nav className='nav-head'>
      <div className='nav-container'>
        <div className='nav-brand'>
          <img src='/mainPage.png' alt='NSQLDB Logo' className='nav-logo'/>
          <span className='nav-title'>NSQLDB</span>
        </div>
        <div className='nav-tagline'>
          Sqlite Database Management System
        </div>
      </div>
    </nav>
  )
}
