import React, {useState} from 'react';
// import { useNavigate } from 'react-router-dom';
import { CssBaseline, Grid, Box, Typography, IconButton, Button, SvgIcon } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import {DropzoneArea} from 'material-ui-dropzone'

import ClassroomForm from '../components/ClassroomForm';
import Side from '../components/Side';
import AddIcon from '@mui/icons-material/Add';
import PackageIcon from '../../src/assets/package-01.png'


const CreateAttendance = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [showForm, setShowForm] = useState(false); 
  
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
  // drop file zone 
  
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
           
            
            <Typography variant="h5">
              There is no classroom in your Account
            </Typography>
            <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
              Please make your classroom!
            </Typography>
            <Button variant="contained" onClick={handleCreateClassroomClick} sx={{ width: 300, backgroundColor: '#F6F6F6', color: '#000000', marginTop: 5, padding: 2}}>
              Create Your Classroom
              <SvgIcon component={AddIcon} sx={{marginLeft: 2}}/>
            </Button>
            {showForm && <ClassroomForm addClassroom={addClassroom} onCancel={handleCreateClassroomClick}/>}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CreateAttendance;