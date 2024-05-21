import './App.css';
import React from 'react';
import SignIn from './Pages/Signin';
import Signup from './Pages/Signup';
import Landing from './Pages/Landing';
import MainContent from './Pages/MainContent';
import CreateAttendance from './Pages/CreateAttendance';
import {Routes, Route, Link, BrowserRouter} from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/Login" element={<SignIn />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/MainContent" element={<MainContent/>}/>
    </Routes>
  );
};

export default AppRoutes;