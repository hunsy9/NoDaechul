// ClassroomForm.js
import { Box, Button, TextField, Typography } from '@mui/material';
import HostContext from '../Context/HostContext';
import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import AuthContext from "../auth/AuthContext";

const ClassroomForm = ({addClassroom, onCancel, setClassrooms, classrooms}) => {
  const [className, setClassName] = useState('');
  
  let navigate = useNavigate();
  const {host} = useContext(HostContext);
  const { logout } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const createAPI = host + "lecture/createlecture";
    

    const Data = {
      name: className,
    }
    
    const raw = JSON.stringify(Data);

    const requestOptions = {
      credentials: 'include',
      method: 'POST',
      body: raw,
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    // await setLecture();
    const lectures = await setLecture();
 
    await fetch(createAPI, requestOptions)
      .then(response => {
        if(response.ok){
          // addClassroom({
          //   id: Math.floor(Math.random() * 10000),
          //   text: className,
          // });
          
          // const lectures = await setLecture();
          if (lectures && lectures.includes(className)) {
            throw new Error('Class name already exists.');
          }
          setClassName('');
          
          return response.json();
        }
        if (response.status === 401) {
          logout();
          navigate('/Login');
        }
        else{
          throw new Error('Network response was not ok.');
        }
      })
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };

  const setLecture = async () => {
    try{
      var requestOptions = {
        credentials: 'include',
        method: 'GET',
        redirect: 'follow'
      };
      
      const getAPI = host + "lecture/getlecture";

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
          const lectureNames = result.map(lecture => lecture.name);
          let newClassrooms = [...classrooms];
          newClassrooms = result;
          setClassrooms(newClassrooms);

          return lectureNames;
        })
        .catch(error => console.log('error', error));
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& .MuiTextField-root': { m: 3, width: '35ch' },
        '& .MuiButton-root': { m: 1 }
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >

      <Typography variant="h6" sx={{marginLeft:1, marginRight:1, marginBottom:3, fontWeight : 'bold'}}>
        Your New Classroom
      </Typography>
      <TextField
        required
        id="class-name"
        label="Class Name"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
      />
      <Box sx={{ width: '90%', display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <Button onClick={onCancel} variant="contained" sx={{borderRadius: 3, backgroundColor: '#EDEDED', textTransform: 'none', fontWeight: 'bold'}}>Cancel</Button>
        <Button type="submit" variant="contained" sx={{borderRadius: 3, backgroundColor: '#3D3D3D', textTransform: 'none', color: 'white', fontWeight: 'bold'}}>Create</Button>
      </Box>
      
    </Box>
  );
};

export default ClassroomForm;
