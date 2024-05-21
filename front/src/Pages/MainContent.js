import React, {useState, useEffect} from 'react';
import { CssBaseline, Grid, Box, Typography, IconButton, Button, SvgIcon } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

import ClassroomForm from '../components/ClassroomForm';
import Side from '../components/Side';
import MainAdmin from '../components/MainAdmin';
import MainStudent from '../components/MainStudent';

const MainContent = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [showForm, setShowForm] = useState(false); 
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const UserAPI = "http://localhost:5555/api/user"
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

  useEffect(() => {
    // const requestOptions = {
    //   method: 'GET',
    //   redirect: 'follow'
    // };

    
    // fetch(UserAPI, requestOptions)
    //   .then(response => console.log(response.json()))
    //   .then(result => {
    //     // setUserName(result.name);
    //     // setUserRole(result.user_role);
    //     console.log(result);
    //   })
    //   .catch(error => console.log('error', error));
    setUserName(localStorage.getItem('name'));
    setUserRole(localStorage.getItem('role'));
  }, []);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <Grid container>
        <Grid item xs={3}>
          <Side classrooms={classrooms}/> {/* 사이드바 컴포넌트 */}
        </Grid>
        <Grid item xs={9} sx={{ padding: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: 2 }}>
            { userRole == 'Admin' ? 
            <Box style={{border: '1px solid'}} sx={{borderRadius: 7, textAlign: 'center', marginRight: 2}}>
              <Typography variant="subtitle2" sx={{marginLeft:1, marginRight:1}}>
                {userRole}
              </Typography>
            </Box> : 
            <></>
            }
            <Typography variant="subtitle1" sx={{marginRight: 2}}>
              {userName}
            </Typography>
            {/* TODO: 설정버튼 기능 추가 */}
            <IconButton>
              <SettingsIcon />
            </IconButton>
          </Box>
          { userRole == 'Admin' ? 
          <MainAdmin 
            classrooms={classrooms}
            showForm={showForm}
            handleClick={handleCreateClassroomClick}
            addClassroom={addClassroom}
          /> :
          <MainStudent
            classrooms={classrooms}
            showForm={showForm}
            handleClick={handleCreateClassroomClick}
            addClassroom={addClassroom}
          />
          }
        </Grid>
      </Grid>
    </Box>
  );
}

export default MainContent;