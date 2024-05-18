// ClassroomForm.js
import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';

const ClassroomForm = (props) => {
  const [className, setClassName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    props.addClassroom({
      id: Math.floor(Math.random() * 10000),
      text: className,
      password: password,
    });
  
    setClassName('');
    setPassword('');
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        '& .MuiButton-root': { m: 1 }
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        required
        id="class-name"
        label="Class Name"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">Create</Button>
    </Box>
  );
};

export default ClassroomForm;
