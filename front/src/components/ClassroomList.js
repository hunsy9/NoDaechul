import React from 'react'
import Classroom from '../components/classroom'
import { Box } from '@mui/material'

export const ClassroomList = (props) => {
  return (
    <Box className="classroom-list" >
      <Classroom classrooms={props.classrooms}></Classroom>
    </Box>
  )
}

export default ClassroomList