import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState, useContext } from 'react';
import HostContext from '../Context/HostContext';
// import DropzoneAreaComponent from '../components/dropzone';
import FileUpload from './FileUpload';
// import Classroom from './classroom';

const ClassroomFormStudent = ({ onCancel, classrooms, setClassrooms }) => {
  const [classCode, setClassCode] = useState('');

  const { host } = useContext(HostContext);

  const handleSubmit = e => {
    e.preventDefault();

    const createAPI = host + "lecture/joinlecture";
    
    console.log(createAPI);

    const data = {
      invitation_code: classCode,
    }
    
    const raw = JSON.stringify(data);
    
    console.log(raw);
    var requestOptions = {
      credentials: 'include',
      method: 'POST',
      body: raw,
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    fetch(createAPI, requestOptions)
      .then(response => {
        if(response.ok) return response.text();
        else {
          alert("서버와의 통신이 불안정합니다.\n다시 시도해주세요.")
          throw new Error("error");
        };
      })
      .then(result => {
        console.log(result);
        getLecture();
        alert("수업이 추가되었습니다.");
      })
      .catch(error => console.log('error', error));
    getLecture();
    setClassCode('');
  };

  const getLecture = () => {
    try{
      var requestOptions = {
        credentials: 'include',
        method: 'GET',
        redirect: 'follow'
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

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& .MuiTextField-root': { m: 1, width: '40ch' },
        '& .MuiButton-root': { m: 1 },
        marginTop: 5
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      {/*TODO: 과목이름 중복 방지기능이 필요할거 같아요  -> 학생이면 중복 확인 필요 없을 것 같아요*/}
      <Typography variant="h6" sx={{marginLeft:1, marginRight:1, marginBottom:3}}>
        Join New Classroom
      </Typography>
      <TextField
        required
        fullWidth
        id="class-name"
        label="Invitation Code"
        value={classCode}
        onChange={(e) => setClassCode(e.target.value)}
      />
      
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 2 }}>
        <Button type="submit" variant="contained" color="primary">Create</Button>
        <Button onClick={onCancel} variant="contained" color="secondary">Cancel</Button>
      </Box>
      
    </Box>
  );
};

export default ClassroomFormStudent;
