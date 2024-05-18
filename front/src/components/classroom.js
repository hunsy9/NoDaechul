import React, { useState } from 'react'
import { Typography } from '@mui/material';

const Classroom = ({ classrooms }) => { // props로 구조 분해 할당으로 받으면 변수처럼 사용할 수 있습니다.
  return (
    <div className="todo">
      {classrooms.map((classroom, index) => (
        <div key={index}>
          <div key={classroom.id}>
            <Typography variant='h6'>
              {classroom.text}
            </Typography>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Classroom;