import React, { useContext, useEffect, useState } from 'react'
import { Typography, ListItemButton, ListItemIcon, SvgIcon } from '@mui/material';
import TabIcon from '@mui/icons-material/Tab';
import HostContext from '../Context/HostContext';
import packageIcon from '../assets/package-01.svg'
import { useNavigate } from "react-router-dom";
import AuthContext from "../auth/AuthContext";

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
  const { logout } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   getLecture();
  // }, [classObj]);

  useEffect(() => {
    if (classObj.id !== -1) { 
      getLecture();
    }
  }, [classObj]);

  useEffect(() => {
    if(!isLoading){
      console.log("getLecture API");
      getLecture();
      setIsLoading(true);
    }
  }, []);

  useEffect(() => {
    if (classObj.id != -1) {  // classObj.id가 유효한 경우에만 getStudents를 호출합니다.
      getStudents(classObj);
      console.log(students);
    }
  }, [classObj]);

  const getLecture = async () => {
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
      
      await fetch(getAPI, requestOptions)
        .then(response => {
          if(response.ok){
            return response.json();
          }
          if (response.status === 401) {
            logout();
            navigate('/Login');
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

  const getStudents = async (clickedClass) => {
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
      
      await fetch(getAPI, requestOptions)
        .then(response => {
          if(response.ok){
            console.log(response.json);
            return response.json();
          }
          if (response.status === 401) {
            logout();
            navigate('/Login');
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
          <div key={classroom.id} style={{paddingLeft: 16, paddingRight: 16}}>
          <ListItemButton
            sx={{ pl: 4, margin: 1, padding: 3, height: 20, borderRadius: 3, backgroundColor: 'rgba(248,248,248,0.55)'}}
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
              <img src={packageIcon} style={{marginRight: 10}}/>
            <Typography style={{color: '#000000'}}>
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
