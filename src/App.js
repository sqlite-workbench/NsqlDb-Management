import Navbar from "./Component/Navbar"
import Home from "./Component/Home"
import {Switch,Route} from "react-router-dom"
import Dashboard from "./Component/Dashboard";
import Login from "./Component/Login";
import SignUp from "./Component/SignUp";
import UserDashboard from "./Component/UserDashboard";
import Documentation from "./Component/Documentation";
function App() {
  return (
    <>
      <Navbar/>
    <Switch>
      <Route exact path="/">
        <Home/>
      </Route>
      <Route exact path="/documentation">
        <Documentation/>
      </Route>
      <Route exact path="/database">
         <Dashboard/>
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
