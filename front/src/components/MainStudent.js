import React from "react";
import {  Box, Typography, Button, SvgIcon } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClassroomFormStudent from "./ClassroomFormStudent";
import ClassroomContent from "./ClassroomContent";
import packageIcon from "../assets/package-01.svg";
import tearImage from "../assets/tear 2.svg";
import thinkingImage from "../assets/thinking 1.svg";
const MainStudent = (props) => {
  return(
  (props.showClassroom) ?
    <ClassroomContent 
      classObj={props.classObj} 
      students={props.students} 
      attendances={props.attendances}
      showCreate={props.showCreate}
      showAttendance={props.showAttendance}
      setShowCreate={props.setShowCreate}
      setShowAttendance={props.setShowAttendance}
      setShowSide={props.setShowSide}
    /> : 
    
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
      
      {(!props.showForm && !props.showClassroom) &&
        <>
            <Box
                sx={{
                    marginBottom: 3
                }}
            >
                <img style={{width: 90}} src={props.classrooms && props.classrooms.length <= 0 ? tearImage : thinkingImage}/>
            </Box>
          <Typography variant="h5" style={{fontWeight: 600}}>
          {props.classrooms.length <= 0 ? 
          "There is no classroom in your Account" : 
          "Select classroom"}
          </Typography>
            {props.classrooms.length <= 0 ? 
            <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
            Please join new classroom!
            </Typography> : 
            <></>}
          <Button variant="contained" onClick={props.handleClick} sx={{ width: 220, textTransform : 'none', backgroundColor: '#F6F6F6', borderRadius: 3, color: '#000000', marginTop: 5, padding: 1}}>
            Join New Classroom
              <SvgIcon component={AddIcon} sx={{marginLeft: 2}}/>
          </Button>
        </>
      }
        {(props.showForm && !props.showClassroom) &&
      <ClassroomFormStudent 
        onCancel={props.handleClick}
        classrooms={props.classrooms}
        setClassrooms={props.setClassrooms}
      />}
    </Box>
  );
}

export default MainStudent;
