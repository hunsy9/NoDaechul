import React, {useState} from 'react';
import { CssBaseline, Grid, Box, Typography, IconButton, Button, SvgIcon } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

import ClassroomForm from '../components/ClassroomForm';
import Side from '../components/Side';
import PackageIcon from '../../src/assets/package-01.png';
import classImg from '../assets/class_example.png';
import DataTable from '../components/ClassAttendanceTable';



const ClassAttendance = () => {
  const [classrooms, setClassrooms] = useState([]);
  
  

  const handleBackClick = () => {
    window.history.back(); // 이전 페이지로 이동
  };
  
  


  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <Grid container>
        <Grid item xs={3}>
          <Side classrooms={classrooms}/> {/* 사이드바 컴포넌트 */}
        </Grid>
        <Grid item xs={9} sx={{ padding: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: 2 }}>
            
            {/* TODO: 유저 이름 가져와야됨*/}
            <Typography variant="subtitle1" sx={{marginRight: 2}}>
              Kim Tae Un
            </Typography>
            {/* TODO: 설정버튼 기능 추가 */}
            <IconButton>
              <SettingsIcon />
            </IconButton>
          </Box>
          
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100vh',
              marginTop: 8 // Adjust this value based on your actual AppBar height
            }}
          >
            
            
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" alignItems="center">
                <img src={PackageIcon} alt="Package Icon" style={{ marginTop: 5, marginRight: 10, width: 20, height: 20 }} />
                <Typography variant="h5">
                  {/*Todo: Class 이름 가져오기*/}
                  Cloud Computing
                </Typography>
              </Box>
              <Button variant="contained" onClick={handleBackClick}
                sx={{ width:150, borderRadius: 3.5, backgroundColor: '#F4F4F4', marginRight: 10, fontFamily:'Inter', color:'#000000', fontWeight:'bold', boxShadow: 'none' }}>
                Back
              </Button>
            </Box>

            <Box sx={{marginTop: '10vh'}}></Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%'}}>

                <img src={classImg} alt="Face ID" style={{maxWidth: '30vw', height: 'auto', marginBottom : 30}} />
                <DataTable/>

              
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ClassAttendance;