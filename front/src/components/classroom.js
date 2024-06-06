import React, { useContext, useEffect, useState } from 'react'
import { Typography, ListItemButton, ListItemIcon, SvgIcon } from '@mui/material';
import TabIcon from '@mui/icons-material/Tab';
import HostContext from '../Context/HostContext';

const Classroom = ({ 
    classrooms, 
    setClassrooms, 
    setClassObj, 
    setShowClassroom, 
    setShowForm, 
    students, 
    setStudents, 
    classObj,
    attendances,
    setAttendances, 
    handleShows
}) => {
  // props로 구조 분해 할당으로 받으면 변수처럼 사용할 수 있습니다.

  const { host } = useContext(HostContext);

  useEffect(() => {
    getLecture();
  }, []);

  useEffect(() => {
    if (classObj.id != -1) {  // classObj.id가 유효한 경우에만 getStudents를 호출합니다.
      getStudents(classObj);
      console.log(students);
    }
  }, [classObj]);

  const getLecture = () => {
    try{
      var requestOptions = {
        credentials: 'include',
        method: 'GET',
        redirect: 'follow',
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const getAPI = host + "lecture/getlecture"
      
      fetch(getAPI, requestOptions)
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

  const getStudents = (clickedClass) => {
    try{
      var requestOptions = {
        credentials: 'include',
        method: 'GET',
        redirect: 'follow',
        headers: {
          'Content-Type': 'application/json'
        }
      };
      console.log(clickedClass);
      const getAPI = host + "lecture/getattendance" + `?lectureId=${clickedClass.id}`
      console.log(getAPI);
      
      fetch(getAPI, requestOptions)
        .then(response => {
          if(response.ok){
            console.log(response.json);
            return response.json();
          }
        })
        .then(result => {
          let newStudents = [...students];
          newStudents = result.members;
          setStudents(newStudents);
          let newAttendances = [...attendances];
          newAttendances = result.attendance.map(entry => ({
            ...entry,
            date: entry.date.split('T')[0]
          }));
          console.log(newAttendances);
          setAttendances(newAttendances);
        })
        .catch(error => console.log('error', error));
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      {classrooms && classrooms.map((classroom, index) => (
        <div key={index}>
          <div key={classroom.id}>
          <ListItemButton 
            sx={{ pl: 4, margin: 1, padding: 2 }}
            onClick={() => {
              setClassObj({name: classroom.name, id: classroom.id, created_by: classroom.created_by});
              console.log(classObj);
              setShowClassroom(true);
              setShowForm(false);
              handleShows();
              console.log({name: classroom.name, id: classroom.id, created_by: classroom.created_by});
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