import React, {useState} from 'react';
// import { useNavigate } from 'react-router-dom';
import { CssBaseline, Grid, Box, Typography, IconButton, Button, SvgIcon } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import DropzoneAreaComponent from '../components/dropzone';
import { LocalizationProvider } from '@mui/x-date-pickers';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider, AdapterDateFns } from '@mui/lab';

import ClassroomForm from '../components/ClassroomForm';
import Side from '../components/Side';
import AddIcon from '@mui/icons-material/Add';
import PackageIcon from '../../src/assets/package-01.png';
import { DatePicker } from '@mui/x-date-pickers-pro';


const CreateAttendance = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [showForm, setShowForm] = useState(false); 
  const [date, setDate] = useState('');
  
  const addClassroom = (classroom) => {
    if (!classroom.text || /^\s*$/.test(classroom.text)) {
      return;
    }
    const newClassrooms = [classroom, ...classrooms];
    setClassrooms(newClassrooms);
  };
  const handleCreateClassroomClick = () => {
    setShowForm(!showForm); // 현재 상태의 반대값으로 토글
  };

  // useNavigate 로 뒤로가기 -> react-router-dom 사용 필요
  // const navigateBackClick = useNavigate(); 
  // const handleBackClick = () => { // Back 버튼에서 사용
  //   navigateBackClick(-1); // -1은 이전 페이지로 이동
  // };
  const handleBackClick = () => {
    window.history.back(); // 이전 페이지로 이동
  };

  

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleDateSubmit = (e) => {
    e.preventDefault();

    console.log('Entered Date:', date);
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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh'}}>
              <Box sx={{ alignItems: 'center', justifyContent: 'center'}}>
                <DropzoneAreaComponent  />
                <div style={{ textAlign: 'center' }}>
                  <Typography variant="subtitle1" sx ={{fontFamily:'Inter', color:'#000000', fontWeight:'bold', marginTop: '30px'}}>
                    Choose your Class Date.
                  </Typography>
                  <Box sx = {{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                  
                  <LocalizationProvider dateAdapter={AdapterDayjs} >

                    <DatePicker label="Choose Class Date"  sx = {{ width : '200px', marginTop : '20px'}}/>
                  </LocalizationProvider>

                  {/** Save 버튼 기능 추가 필요 */}

                  <Button variant="contained" 
                    sx={{ width:150, borderRadius: 3.5, backgroundColor: '#F4F4F4', fontFamily:'Inter', color:'#000000', fontWeight:'bold', boxShadow: 'none', marginTop : '30px' }}>
                    Save
                  </Button>
                  </Box>
                </div> 
              </Box>
              
              
            </Box>

          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CreateAttendance;