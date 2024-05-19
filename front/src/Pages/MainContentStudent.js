import React, {useState} from 'react';
import { CssBaseline, Grid, Box, Typography, IconButton, Button, SvgIcon } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

import ClassroomForm from '../components/ClassroomForm';
import Side from '../components/Side';
import AddIcon from '@mui/icons-material/Add';

const MainContentStudent = () => {
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
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <Grid container>
        <Grid item xs={3}>
          <Side classrooms={classrooms}/> {/* 사이드바 컴포넌트 */}
        </Grid>
        <Grid item xs={9} sx={{ padding: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: 2 }}>
            <Box style={{border: '1px solid'}} sx={{borderRadius: 7, textAlign: 'center', marginRight: 2}}>
              {/* TODO: 유저 role에 따라 표시유무 변경*/}
              <Typography variant="subtitle2" sx={{marginLeft:1, marginRight:1}}>
                Admin
              </Typography>
            </Box>
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
              alignItems: 'center',
              justifyContent: 'center',
              height: '100vh',
              marginTop: -8 // Adjust this value based on your actual AppBar height
            }}
          >
            <Box
              sx={{
                fontSize: 64 // Adjust emoji size
              }}
            >
              😢
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

export default MainContentStudent;