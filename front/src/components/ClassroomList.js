import React from 'react'
import Classroom from './Classroom'
import { Box } from '@mui/material'

export const ClassroomList = (props) => {
  return (
    <Box className="classroom-list" >
      <Classroom 
        classrooms={props.classrooms} 
        setClassName={props.setClassName} 
        setShowClassroom={props.setShowClassroom} 
        classroomClick={props.classroomClick}
      ></Classroom>
    </Box>
  )
}

export default ClassroomList