import React, { useEffect, useState } from 'react'
import { Typography, ListItemButton, ListItemIcon, SvgIcon } from '@mui/material';
import TabIcon from '@mui/icons-material/Tab';

const Classroom = ({ classrooms, setClassrooms, setClassObj, setShowClassroom, setShowForm }) => {
  // props로 구조 분해 할당으로 받으면 변수처럼 사용할 수 있습니다.

  useEffect(() => {
    getLecture();
  }, []);

  const getLecture = () => {
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
          let newClassrooms = [...classrooms];
          newClassrooms = result;
          setClassrooms(newClassrooms);
        })
        .catch(error => console.log('error', error));
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      {classrooms.map((classroom, index) => (
        <div key={index}>
          <div key={classroom.id}>
          <ListItemButton 
            sx={{ pl: 4, margin: 1, padding: 2 }}
            onClick={() => {
              setClassObj({name: classroom.name, id: classroom.id});
              setShowClassroom(true);
              setShowForm(false);
              console.log({name: classroom.name, id: classroom.id});
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