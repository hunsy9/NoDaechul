import './App.css';
import React from 'react';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import MainContent from './components/MainContent'
import HeaderAppBar from './components/HeaderAppBar';
import {Routes, Route, Link, BrowserRouter} from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

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
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className='App'>
          <HeaderAppBar />
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
    
  );
}

export default App;
