// ClassroomForm.js
import { Box, Button, TextField, Typography } from '@mui/material';
import HostContext from '../Context/HostContext';
import React, { useContext, useState } from 'react';

const ClassroomForm = ({addClassroom, onCancel, setClassrooms, classrooms}) => {
  const [className, setClassName] = useState('');
  const {host} = useContext(HostContext);
  const handleSubmit = (e) => {
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

    setLecture();
 
    fetch(createAPI, requestOptions)
      .then(response => {
        if(response.ok){
          // addClassroom({
          //   id: Math.floor(Math.random() * 10000),
          //   text: className,
          // });
          
          const lectures = setLecture();
          if (lectures.includes(className)) {
            throw new Error('Class name already exists.');
          }
          setClassName('');
          
          return response.json();
        }
        else{
          throw new Error('Network response was not ok.');
        }
      })
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };

  const setLecture = () => {
    try{
      var requestOptions = {
        credentials: 'include',
        method: 'GET',
        redirect: 'follow'
      };
      
      const getAPI = host + "lecture/getlecture";

      fetch(host, requestOptions)
        .then(response => {
          if(response.ok){
            return response.json();
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
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        '& .MuiButton-root': { m: 1 },
        marginTop: 5
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      
      <Typography variant="h6" sx={{marginLeft:1, marginRight:1}}>
        Your New Classroom
      </Typography>
      <TextField
        required
        id="class-name"
        label="Class Name"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 2 }}>
        <Button type="submit" variant="contained" color="primary">Create</Button>
        <Button onClick={onCancel} variant="contained" color="primary">Cancel</Button>
      </Box>
      
    </Box>
  );
};

export default ClassroomForm;
