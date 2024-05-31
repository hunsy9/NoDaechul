import React, { useEffect, useState } from 'react'
import { Typography, ListItemButton, ListItemIcon, SvgIcon } from '@mui/material';
import TabIcon from '@mui/icons-material/Tab';

const Classroom = ({ classrooms, setClassName, setShowClassroom, setShowForm }) => { // props로 구조 분해 할당으로 받으면 변수처럼 사용할 수 있습니다.
  //TODO: 수업목록 가져오는 API 호출로 바꿔야함
  const[classroomList, setClassroomList] = useState([]);
  
  useEffect(() => {
    getLecture();
  }, []);

  const getLecture = async () => {
    try{
      var requestOptions = {
        credentials: 'include',
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("http://localhost:5555/api/lecture/getlecture", requestOptions)
        .then(response => {
          if(response.ok){
            return response.json();
          }
        })
        .then(result => {
          console.log(result);
          let newClassroomList = [...classroomList];
          newClassroomList = JSON.parse(result);
          setClassroomList(newClassroomList);
        })
        .catch(error => console.log('error', error));
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      {classroomList && classroomList.map((classroom, index) => (
        <div key={index}>
          <div key={classroom.id}>
          <ListItemButton 
            sx={{ pl: 4, margin: 1, padding: 2 }}
            onClick={() => {
              setClassName(classroom.name);
              setShowClassroom(true);
              setShowForm(false);
            }}
          >
            <ListItemIcon>
              <SvgIcon component={TabIcon} sx={{ marginRight: 2 }} />
            <Typography>
              {classroom.name}
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