import './App.css';
import React from 'react';
import AppRoutes from './AppRoutes';
import CreateAttendance from './Pages/CreateAttendance';
import {BrowserRouter} from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import AuthProvider from './auth/AuthProvider';
// import React, { useCallback } from 'react';
// import {useDropzone} from 'react-dropzone';

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
         <AuthProvider>
           <BrowserRouter>
             <AppRoutes/>
           </BrowserRouter> 
         </AuthProvider>
      {/* 테스트용, ThemeProvider를 제외한 나머지 주석 처리 후, 밑의 내용 주석 해제 */}
      {/* <CreateAttendance/> */}

    </ThemeProvider>
    
  );
}

export default App;
