import React from 'react'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from "./pages/login";
import Register from "./pages/register";
import Misson from "./pages/missons";
import  Equipments from './pages/equipments';
import Home from './pages/home';
import Dashboard from './pages/dashbord';
import Base from './pages/base';
import AddEquipment from './pages/assign_equipment';
import AddMission from './pages/add_mission';

export const Routes  = () => {

    return(
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/equipment" component={Equipments} />
            <Route path="/mission" component={Misson} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/base" component={Base} />
            <Route path="/addequipment" component={AddEquipment} />
            <Route path="/addmission" component={AddMission} />
            <Route path='/' component={Home} />
          </Switch>
      </Router>
    );

}