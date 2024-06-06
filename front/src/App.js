import './App.css';
import React, { Component } from 'react';
import AppRoutes from './AppRoutes';
import {BrowserRouter} from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import AuthProvider from './auth/AuthProvider';
import HostProvider from './Context/HostProvider';
import ClassAttendance from './Pages/ClassAttendance';
import MainContent from './Pages/MainContent';




// test
// import DropzoneAreaComponent from './components/dropzone';
import MainAdmin from './components/MainAdmin';
import ClassroomFormStudent from './components/ClassroomFormStudent';
import CreateAttendance from './components/CreateAttendance';
import MainStudent from './components/MainStudent';
import Classroom from './components/classroom';
// import Signup from './Pages/Signup';
import CreateAttendanceLoading from './components/CreateAttendanceLoading';
import CreateAttendanceComplete from './components/CreateAttendanceComplete';

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
