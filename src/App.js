import Navbar from "./Component/Navbar"
import Home from "./Component/Home"
import {Switch,Route} from "react-router-dom"
import DbManagment from "./Component/DbManagment";
import Dashboard from "./Component/Dashboard";
function App() {
  return (
    <>
      <Navbar/>
    <Switch>
      <Route exact path="/">
        
        <Home/>
      </Route>
      <Route exact path="/createdb">
          <DbManagment key={1} heading={"Create Db"} isOpen={false} />
      </Route>
      <Route exact path="/opendb">
          <DbManagment key={2} heading={"Open Db"} isOpen={true} />
      </Route>
      <Route exact path="/dashboard">
         <Dashboard/>
      </Route>
    </Switch>
    </>
  );
}

export default App;
