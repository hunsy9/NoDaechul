import './App.css';
import React, { useContext } from 'react';
import SignIn from './Pages/Signin';
import Signup from './Pages/Signup';
import Landing from './Pages/Landing';
import MainContent from './Pages/MainContent';
import CreateAttendance from './Pages/CreateAttendance';
import {Routes, Route, Link, BrowserRouter} from "react-router-dom";
import AuthContext from './auth/AuthContext';

const AppRoutes = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/Login" element={<SignIn />} />
      <Route path="/Signup" element={<Signup />} />
      {isLoggedIn ? (
        <Route path="/MainContent" element={<MainContent/>}/>
      ) : null}
    </Routes>
  );
};

export default AppRoutes;