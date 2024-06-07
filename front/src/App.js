import './App.css';
import React, { Component } from 'react';
import AppRoutes from './AppRoutes';
import {BrowserRouter} from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import AuthProvider from './auth/AuthProvider';
import HostProvider from './Context/HostProvider';
import MainContent from './Pages/MainContent';


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
      
      <CssBaseline/>
      <HostProvider>
        <AuthProvider>
          <BrowserRouter>
            <AppRoutes/>
          </BrowserRouter> 
        </AuthProvider> 
       {/* <ClassAttendance/> */}
      </HostProvider>

      {/* ClassAttendance 테스트 시 1 입력*/}
      
       {/* <MainContent/> */}
       {/* <ClassroomFormStudent/> */}

       
     </ThemeProvider>
     
    
  );
}

export default App;
