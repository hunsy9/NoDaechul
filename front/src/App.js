import './App.css';
import React from 'react';
import Login from './sign/Login';
import Signup from './sign/Signup';
import {Routes, Route, Link} from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <Signup/> */}
      <Login/>
    </div>
  );
}

export default App;
