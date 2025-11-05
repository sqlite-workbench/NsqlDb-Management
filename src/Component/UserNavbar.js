import React, { useContext } from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Divider } from '@mui/material';
import ContextRouter from '../contextAPI/ContextRouter';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyIcon from '@mui/icons-material/Key';
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
        {/* Animated Background */}
        <div className='nav-background'>
            <div className='nav-shape nav-shape-1'></div>
            <div className='nav-shape nav-shape-2'></div>
        </div>

        <div className='user-nav-sub'>
            <div className='user-nav-icon'>
                <div className='logo-wrapper'>
                    <img src='/mainPage.png' alt='NSQLDB Logo' className='logo-image'/>
                    <span className='logo-text'>NSQLDB</span>
                </div>
                <div className='logo-tagline'>Cloud Database Management</div>
            </div>

            <div className='user-nav-profile'>
                <button
                    id="basic-button"
                    className='profile-button'
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <PersonIcon className='profile-icon' />
                    <span className='profile-name'>{context.getUser.name}</span>
                </button>

                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                    className='custom-menu'
                    PaperProps={{
                        className: 'custom-menu-paper'
                    }}
                >
                    <MenuItem className='profile-menu-item user-info-item' disableRipple>
                        <div className='user-profile'>
                            <div className='user-avatar'>
                                <PersonIcon className='avatar-icon' />
                            </div>
                            <div className='user-details'>
                                <div className='username'>
                                    {context.getUser.name}
                                </div>
                                <div className='otherinfo'>
                                    <div className='info-row'>
                                        <EmailIcon className='info-icon' />
                                        <span className='user-emailid'>{context.getUser.emailid}</span>
                                    </div>
                                    <div className='info-row'>
                                        <PhoneIcon className='info-icon' />
                                        <span className='user-contact'>{context.getUser.contactnumber}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MenuItem>
                    
                    <Divider className='menu-divider' />
                    
                    <MenuItem onClick={handleCopyAPI} className='profile-menu-item action-item'>
                        <KeyIcon className='menu-item-icon' />
                        <span>Copy API Key</span>
                    </MenuItem>
                    
                    <MenuItem onClick={handleLogout} className='profile-menu-item logout-menu-item'>
                        <LogoutIcon className='menu-item-icon' />
                        <span>Logout</span>
                    </MenuItem>
                </Menu>
            </div>
        </div>
    </div>
  )
}
