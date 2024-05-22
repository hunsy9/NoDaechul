import React from 'react'
import { Typography, ListItemButton, ListItemIcon, SvgIcon } from '@mui/material';
import TabIcon from '@mui/icons-material/Tab';

const Classroom = ({ classrooms, setClassName, setShowClassroom }) => { // props로 구조 분해 할당으로 받으면 변수처럼 사용할 수 있습니다.
  //TODO: 수업목록 가져오는 API 호출로 바꿔야함
  return (
    <div>
      {classrooms.map((classroom, index) => (
        <div key={index}>
          <div key={classroom.id}>
          <ListItemButton 
            sx={{ pl: 4, margin: 1, padding: 2 }}
            onClick={() => {
              setClassName(classroom.text);
              setShowClassroom(true);
            }}
          >
            <ListItemIcon>
              <SvgIcon component={TabIcon} sx={{ marginRight: 2 }} />
            <Typography>
              {classroom.text}
            </Typography>
            </ListItemIcon>
          </ListItemButton>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Classroom;