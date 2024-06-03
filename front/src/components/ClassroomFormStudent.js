import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState, useContext } from 'react';
import HostContext from '../Context/HostContext';
// import DropzoneAreaComponent from '../components/dropzone';
import FileUpload from './FileUpload';
// import Classroom from './classroom';

const ClassroomFormStudent = ({ onCancel }) => {
  const [classCode, setClassCode] = useState('');
  const [password, setPassword] = useState('');

  const { host } = useContext(HostContext);

  const handleSubmit = e => {
    e.preventDefault();

    const createAPI = host + "lecture/joinlecture";

  
    const loginData = {
      code: classCode,
      password: password,
    }
    
    const raw = JSON.stringify(loginData);

    var requestOptions = {
      method: 'POST',
      body: raw,
      redirect: 'follow'
    };

    fetch(createAPI, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    setClassCode('');
    setPassword('');
  };

  const onImage = () => {
    console.log('onImage');
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
        autoFocus
        id="class-name"
        label="Invitation Code"
        value={classCode}
        onChange={(e) => setClassCode(e.target.value)}
      />
      <TextField
        fullWidth
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Typography variant="h6" sx={{marginRight:16, marginTop: 2, marginBottom: 2}}>
        Upload Your Selfie Image
      </Typography>
      
      {/* <DropzoneAreaComponent/> */}
      <FileUpload/>
      
      {/* <Box sx={{
        width: 300,
        height: 300,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        '& .MuiButton-root': { m: 1 },
        borderRadius:5
        }} 
        className="Shadow"
        >
        <Box sx={{height: 50}}></Box> */}
        {/* TODO: 이미지 업로드 기능 구현 */}
        {/* <Button sx={{ marginTop:5 }} onClick={onImage} variant="contained" color="secondary">
          Upload Image
        </Button>
        <Typography variant="subtitle1" sx={{marginTop:5}}>
          or drop a file
        </Typography>
        <Typography variant="subtitle1" sx={{marginTop:2, color:'gray'}}>
          paste image or URL
        </Typography>
      </Box> */}

      

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 2 }}>
        <Button type="submit" variant="contained" color="primary">Create</Button>
        <Button onClick={onCancel} variant="contained" color="secondary">Cancel</Button>
      </Box>
      
    </Box>
  );
};

export default ClassroomFormStudent;
