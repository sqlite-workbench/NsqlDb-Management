import {useContext} from "react"
import Navbar from "./Component/Navbar"
import Home from "./Component/Home"
import {Switch,Route, useHistory} from "react-router-dom"
import Dashboard from "./Component/Dashboard";
import Login from "./Component/Login";
import SignUp from "./Component/SignUp";
import UserDashboard from "./Component/UserDashboard";
import Documentation from "./Component/Documentation";
import NsqlLoader from "./Component/NsqlLoader";
import LoadingBar from 'react-top-loading-bar';
import ContextRouter from "./contextAPI/ContextRouter";
import Alert from "./Component/Alert";
import UserNavbar from "./Component/UserNavbar";
function App() {
  const context=useContext(ContextRouter)
  const history=useHistory()
  return (
    <>
      {history.location.pathname!=="/dashboard"?<Navbar/>:<UserNavbar/>}
      <LoadingBar
        color='#f11946'
        height={5}
        progress={context.getProgress}
        onLoaderFinished={()=>{context.setProgress(0)}}
    />
    {context.getAlert.status && <Alert msg={context.getAlert.msg} color={context.getAlert.color}/>}
    {context.getLoader && <NsqlLoader />}
    <Switch>
      <Route exact path="/">
        <Home/>
      </Route>
      <Route exact path="/documentation">
        <Documentation/>
      </Route>
      <Route exact path="/dashboard">
         <UserDashboard/>
      </Route>
      <Route exact path="/login">
         <Login/>
      </Route>
      <Route exact path="/signup">
         <SignUp/>
      </Route>
    </Switch>
    </>
  );
}

export default App;
