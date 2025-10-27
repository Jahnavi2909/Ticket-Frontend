
import React from 'react';
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import CreateAcc from './pages/CreateAcc/CreateAcc'
import ChangePassword from './pages/ChangePassword/ChangePassword';

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Admin from './pages/Admin/Admin';
import Agent from './pages/Agent/Agent';
import User from './pages/User/User';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
const App = () => {

  return (

<div>
    {/*the Routes is for the login pages. if we uncomment the routes  then we will get login pages*/ }
    <Routes Routes >
         <Route path="/" element={<Home/>}></Route>
          <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<Login/>}></Route>
         <Route path="/Register" element={<CreateAcc/>}></Route>
          <Route path="/ChangePassword" element={<ChangePassword />} />
          

         <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Admin />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <User />
          </ProtectedRoute>
        }
      />

      <Route
        path="/agent"
        element={
          <ProtectedRoute allowedRoles={["agent"]}>
            <Agent />
          </ProtectedRoute>
        }
      />
         </Routes >






</div>
  );
};





    
    


export default App;
