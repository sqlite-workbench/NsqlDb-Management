import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useHistory } from 'react-router-dom';

export default function Navbar(props) {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const history=useHistory()
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };


  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="small" onClick={()=>{history.push("/opendb")}} aria-label="show 4 new mails" color="inherit">
          Open Db
        </IconButton>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="small"
          aria-label="show 17 new notifications"
          color="inherit"
          onClick={()=>{history.push("/createdb")}}
        >
          Create Db
        </IconButton>
        
      </MenuItem>
      <MenuItem onClick={()=>{history.push("/uploaddb")}}>
        <IconButton
          size="small"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          Upload Db
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          
          <Typography
            variant="h6"
            noWrap
            style={{cursor:"pointer"}}
            onClick={()=>{history.replace({pathname:"/"})}}
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            NsqlDb Management
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="small" aria-label="show 4 new mails" color="inherit" onClick={()=>{history.push("/opendb")}}>
              Open Db
            </IconButton>
            <IconButton
              size="small"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={()=>{history.push("/createdb")}}
            >
              Create Db
            </IconButton>
            <IconButton
            onClick={()=>{history.push("/uploaddb")}}
              size="small"
              edge="end"
              aria-label="account of current user"
              
              aria-haspopup="true"
              
              color="inherit"
            >
              Upload Db
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
