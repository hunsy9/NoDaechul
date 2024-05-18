import React, { useState } from 'react'
import ClassroomForm from './ClassroomForm'
import Classroom from './classroom'
import { Box } from '@mui/material'

const ClassroomList = () => {
  const [classrooms, setClassrooms] = useState([]) // 👈 useState Hook으로 classrooms 데이터 저장or조작

  // classroom "추가"하는 함수
  const addClassroom = classroom => {
    if (!classroom.text || /^\s*$/.test(classroom.text)) {
      return
    }
    const newClassrooms = [classroom, ...classrooms]
    console.log(newClassrooms)
    setClassrooms(newClassrooms)
  }


  return (
    <Box className="classroom-list" >
      {/* <ClassroomForm onSubmit={addClassroom}></ClassroomForm> */}
      {/* addClassroom함수는 메인화면에 버튼 추가 후 연결  */}
      <Classroom
        classrooms={classrooms} // classroom 데이터
      ></Classroom>
    </Box>
  )
}

export default ClassroomList