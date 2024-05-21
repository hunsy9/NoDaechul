import './App.css';
import React, { useContext, useEffect } from 'react';
import SignIn from './Pages/Signin';
import Signup from './Pages/Signup';
import Landing from './Pages/Landing';
import MainContent from './Pages/MainContent';
import CreateAttendance from './Pages/CreateAttendance';
import {Routes, Route, Navigate} from "react-router-dom";
import AuthContext from './auth/AuthContext';

const AppRoutes = () => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>;  // 또는 로딩 스피너
  }

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/Login" element={<SignIn />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/MainContent" element={isLoggedIn ? <MainContent /> : <Navigate to="/Login" replace/>} />
    </Routes>
  );
};

export default AppRoutes;