import './App.css';
import React from 'react';
import SignIn from './Pages/Signin';
import Signup from './Pages/Signup';
import Landing from './Pages/Landing';
import MainContent from './Pages/MainContent';
import HeaderAppBar from './components/HeaderAppBar';
import {Routes, Route, Link, BrowserRouter} from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { AuthProvider, useAuth } from './auth/AuthContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF', // 툴바 색상
    },
    secondary: {
      main: '#000000', // 버튼 색상
    },
  },
});

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <BrowserRouter>
        <div className='App'>
          {!isAuthenticated && <HeaderAppBar />}
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/Login" element={<SignIn />} />
            <Route path="/Signup" element={<Signup />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
    
  );
}

export default App;
