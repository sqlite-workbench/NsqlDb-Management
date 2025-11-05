import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MainListItems from './MainListItems';
import {useHistory} from "react-router-dom"
import RunQuery from './RunQuery';
import './Dashboard.css';

const drawerWidth = 260;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
  transition: theme.transitions.create(['width', 'margin', 'box-shadow'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  '&:hover': {
    boxShadow: '0 6px 30px rgba(102, 126, 234, 0.4)',
  },
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin', 'box-shadow'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)',
      borderRight: '1px solid rgba(102, 126, 234, 0.1)',
      boxShadow: '4px 0 20px rgba(0, 0, 0, 0.05)',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const [getContent,setContent]=React.useState(<RunQuery/>)
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleSetContent=(content)=>{
    setContent(content)
  }
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} className="dashboard-appbar">
          <Toolbar
            sx={{
              pr: '24px',
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              className="menu-icon-button"
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
              <span className="database-icon">💾</span>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className="database-title"
              >
                {localStorage.getItem("dbname")}
              </Typography>
              <span className="database-badge">Active</span>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open} className="dashboard-drawer">
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: [2],
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, display: open ? 'block' : 'none' }}>
              📊 Menu
            </Typography>
            <IconButton onClick={toggleDrawer} sx={{ color: 'white' }} className="close-drawer-button">
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider sx={{ borderColor: 'rgba(102, 126, 234, 0.2)' }} />
          <List component="nav" sx={{ px: 1, py: 2 }}>
            <MainListItems handleSetContent={handleSetContent}/>
          </List>
        </Drawer>
        <Box
          component="main"
          className="dashboard-main-content"
          sx={{
            backgroundColor: '#f8f9fa',
            backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(102, 126, 234, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(118, 75, 162, 0.05) 0%, transparent 50%)',
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box className="content-wrapper">
              {getContent}
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  const history=useHistory()
  if(!localStorage.getItem('dbname')){
    alert("No Database Selected")
    history.replace({pathname:"/"})
  }
  return (<DashboardContent />);
}