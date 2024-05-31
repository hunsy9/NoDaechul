import './App.css';
import React from 'react';
import AppRoutes from './AppRoutes';
// import CreateAttendance from './Pages/CreateAttendance';
import {BrowserRouter} from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import AuthProvider from './auth/AuthProvider';
import ClassAttendance from './Pages/ClassAttendance';
import MainContent from './Pages/MainContent';

// import DropzoneAreaComponent from './components/dropzone';

import ClassroomFormStudent from './components/ClassroomFormStudent';

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
         {/* <CssBaseline/>
         <AuthProvider>
           <BrowserRouter>
             <AppRoutes/>
           </BrowserRouter> 
         </AuthProvider>  */}
      {/* ClassAttendance 테스트 시 http://localhost:3000/ClassAttendance 입력*/}
      {/* <ClassAttendance/> */}
      {/* <MainContent/> */}
      <ClassroomFormStudent/>
      {/* <DropzoneAreaComponent/> */}
    </ThemeProvider>
    
  );
}

export default App;
