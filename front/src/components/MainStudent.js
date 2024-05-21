import React from "react";
import {  Box, Typography, Button, SvgIcon } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClassroomForm from './ClassroomForm';
const MainStudent = (props) => {
  return(
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
        🤔
      </Box>
      <Typography variant="h5">
        There is no classroom in your Account
      </Typography>
      <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
        Please make your classroom!
      </Typography>
      <Button variant="contained" onClick={props.handleClick} sx={{ width: 300, backgroundColor: '#F6F6F6', color: '#000000', marginTop: 5, padding: 2}}>
        Join New Classroom
        <SvgIcon component={AddIcon} sx={{marginLeft: 2}}/>
      </Button>
      {props.showForm && <ClassroomForm addClassroom={props.addClassroom} onCancel={props.handleClick}/>}
    </Box>
  );
}

export default MainStudent;