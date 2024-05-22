import React, {useState, useEffect} from 'react';
import { CssBaseline, Grid, Box, Typography, IconButton, Button, SvgIcon } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

import ClassroomForm from '../components/ClassroomForm';
import Side from '../components/Side';
import MainAdmin from '../components/MainAdmin';
import MainStudent from '../components/MainStudent';
import MainHeader from '../components/MainHeader';

const MainContent = () => {
  
  const [classrooms, setClassrooms] = useState([]);
  const [className, setClassName] = useState('');
  const [showForm, setShowForm] = useState(false); 
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [showClassroom, setShowClassroom] = useState(false);

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
    setUserName(localStorage.getItem('name'));
    setUserRole(localStorage.getItem('role'));
  }, []);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <Grid container>
        <Grid item xs={3}>
          <Side 
            classrooms={classrooms} 
            setClassName={setClassName} 
            setShowClassroom={setShowClassroom} 
          /> {/* 사이드바 컴포넌트 */}
        </Grid>
        <Grid item xs={9} sx={{ padding: 3 }}>
          <MainHeader 
          userName={userName}
          userRole={userRole}
          />
          { userRole == 'Admin' ? 
          <MainAdmin 
            classrooms={classrooms}
            showForm={showForm}
            handleClick={handleCreateClassroomClick}
            addClassroom={addClassroom}
            showClassroom={showClassroom}
            className={className}
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