import React, {useState, useContext} from 'react';
import {TextField, IconButton, Tooltip} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ContextRouter from '../contextAPI/ContextRouter';
import '../CSS/profile.css';
export default function Profile(props) {
  const [copiedField, setCopiedField] = useState(null);
  const context = useContext(ContextRouter);

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    
    // Show alert notification based on the field
    if (field === 'api') {
      context.setAlert({status: true, msg: "API Key copied to clipboard!", color: "green"});
    } else if (field === 'email') {
      context.setAlert({status: true, msg: "Email copied to clipboard!", color: "green"});
    } else if (field === 'phone') {
      context.setAlert({status: true, msg: "Phone number copied to clipboard!", color: "green"});
    }
    
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  return (
    <div className='profile-container'>
      <div className='profile-card'>
        {/* Header */}
        <div className='profile-header'>
          <div className='profile-avatar'>
            <PersonIcon className='avatar-icon' />
          </div>
          <h2 className='profile-title'>Profile Information</h2>
          <p className='profile-subtitle'>Your account details and API credentials</p>
        </div>

        {/* Profile Content */}
        <div className='profile-content'>
          {/* Name Field */}
          <div className='profile-field'>
            <div className='field-label'>
              <PersonIcon className='label-icon' />
              <span className='label-text'>Full Name</span>
            </div>
            <div className='field-input-wrapper'>
              <TextField  
                value={props.user.name} 
                disabled 
                fullWidth 
                variant="outlined" 
                placeholder="Your name"
                className='profile-input'
              />
            </div>
          </div>

          {/* Email Field */}
          <div className='profile-field'>
            <div className='field-label'>
              <EmailIcon className='label-icon' />
              <span className='label-text'>Email Address</span>
            </div>
            <div className='field-input-wrapper'>
              <TextField  
                value={props.user.emailid} 
                disabled 
                fullWidth 
                variant="outlined" 
                type="email"
                placeholder="your.email@example.com"
                className='profile-input'
              />
              <Tooltip title={copiedField === 'email' ? "Copied!" : "Copy email"} arrow>
                <IconButton 
                  className='copy-btn'
                  onClick={() => handleCopy(props.user.emailid, 'email')}
                >
                  {copiedField === 'email' ? (
                    <CheckCircleIcon className='check-icon' />
                  ) : (
                    <ContentCopyIcon />
                  )}
                </IconButton>
              </Tooltip>
            </div>
          </div>

          {/* Contact Number Field */}
          <div className='profile-field'>
            <div className='field-label'>
              <PhoneIcon className='label-icon' />
              <span className='label-text'>Contact Number</span>
            </div>
            <div className='field-input-wrapper'>
              <TextField  
                value={props.user.contactnumber} 
                disabled  
                variant="outlined" 
                fullWidth 
                placeholder="+1234567890"
                className='profile-input'
              />
              <Tooltip title={copiedField === 'phone' ? "Copied!" : "Copy phone"} arrow>
                <IconButton 
                  className='copy-btn'
                  onClick={() => handleCopy(props.user.contactnumber, 'phone')}
                >
                  {copiedField === 'phone' ? (
                    <CheckCircleIcon className='check-icon' />
                  ) : (
                    <ContentCopyIcon />
                  )}
                </IconButton>
              </Tooltip>
            </div>
          </div>

          {/* API Key Field */}
          <div className='profile-field api-field'>
            <div className='field-label'>
              <VpnKeyIcon className='label-icon' />
              <span className='label-text'>API Key</span>
              <span className='api-badge'>Secret</span>
            </div>
            <div className='field-input-wrapper'>
              <TextField  
                value={props.user.apikey} 
                multiline 
                rows={2} 
                disabled  
                variant="outlined" 
                fullWidth 
                placeholder="Your API key"
                className='profile-input api-input'
              />
              <Tooltip title={copiedField === 'api' ? "Copied!" : "Copy API key"} arrow>
                <IconButton 
                  className='copy-btn api-copy-btn'
                  onClick={() => handleCopy(props.user.apikey, 'api')}
                >
                  {copiedField === 'api' ? (
                    <CheckCircleIcon className='check-icon' />
                  ) : (
                    <ContentCopyIcon />
                  )}
                </IconButton>
              </Tooltip>
            </div>
            <div className='api-warning'>
              <span className='warning-icon'>🔒</span>
              <span className='warning-text'>Keep your API key secure and never share it publicly</span>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className='profile-footer'>
          <div className='footer-item'>
            <span className='footer-icon'>🛡️</span>
            <span className='footer-text'>Your data is encrypted and secure</span>
          </div>
        </div>
      </div>
    </div>
  );
}
