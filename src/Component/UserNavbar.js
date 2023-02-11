import React, { useContext } from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Divider } from '@mui/material';
import ContextRouter from '../contextAPI/ContextRouter';
import "../CSS/usernavbar.css"
export default function UserNavbar() {
    const context=useContext(ContextRouter)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event)=> {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleCopyAPI=()=>{
        navigator.clipboard.writeText(context.getUser.apikey);
        context.setAlert({status:true,msg:"API Copied",color:"green"})
    }
    const handleLogout=()=>{
        localStorage.removeItem("auth");
        context.setIsFetch(!context.isFetch);
    }
  return (
    <div className='user-nav-main'>
        <div className='user-nav-sub'>
            <div className='user-nav-icon'>
                    <img src='/mainPage.png'/>
                    NSQLDB
            </div>
            <div className='user-nav-profile'>
            <button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {context.getUser.name}
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem >
        <div className='user-profile'>
            <div className='username'>
            {context.getUser.name}
            </div>
            <div className='otherinfo'>
                    <div className='user-emailid'>
                    {context.getUser.emailid}
                    </div>
                    <div className='user-contact'>
                    {context.getUser.contactnumber}
                    </div>
            </div>
            {/* <div className='apikey'>
            {context.getUser.apikey}
            </div> */}
            <Divider/>
        </div>
        </MenuItem>
        <MenuItem onClick={handleCopyAPI} >
        <div className='user-profile'>
            Copy API KEY
        </div>
        </MenuItem>
        <MenuItem onClick={handleLogout} >
        <div className='user-profile'>
        Logout
        </div>
        </MenuItem>
      </Menu>
    </div>
            </div>
        </div>
  )
}
