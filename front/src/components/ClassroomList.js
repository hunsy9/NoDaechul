import React from 'react'
import Classroom from './classroom'
import { Box } from '@mui/material'

export const ClassroomList = (props) => {
  return (
    <Box className="classroom-list" >
      <Classroom 
        classrooms={props.classrooms} 
        setClassName={props.setClassName} 
        setShowClassroom={props.setShowClassroom} 
        setShowForm={props.setShowForm}
        setClassrooms={props.setClassrooms}
      ></Classroom>
    </Box>
  )
}

export default ClassroomList