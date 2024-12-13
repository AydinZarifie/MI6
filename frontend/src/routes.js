import React from 'react'
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Login from "./pages/login";
import Register from "./pages/register";
import Misson from "./pages/missons";
import  Equipments from './pages/equipments';
import Home from './pages/home';
import Dashboard from './pages/dashbord';
import Base from './pages/base';
import AddEquipment from './pages/assign_equipment';
import AddMission from './pages/add_mission';
import ProtectedRoute from './utils/ProtectRoute';

export const Rout  = () => {

    return(
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<ProtectedRoute element={<Register/>} />}/>
            <Route path="/mission" element={<ProtectedRoute element={<Misson/>} />}/>
            <Route path="/equipment" element={<ProtectedRoute element={<Equipments/>} />}/>
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard/>} />}/>
            <Route path="/base" element={<ProtectedRoute element={<Base/>} />}/>
            <Route path="/addequipment" element={<ProtectedRoute element={<AddEquipment/>} />}/>
            <Route path="/addmission" element={<ProtectedRoute element={<AddMission/>} />}/>
            <Route path="/topsecret" element={<ProtectedRoute element={<Home/>} />}/>
          </Routes>
      </Router>
    );

}