// ClassroomForm.js
import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const ClassroomForm = ({addClassroom, onCancel}) => {
  const [className, setClassName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    addClassroom({
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
      <TextField
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 2 }}>
        <Button type="submit" variant="contained" color="primary">Create</Button>
        <Button onClick={onCancel} variant="contained" color="primary">Cancel</Button>
      </Box>
      
    </Box>
  );
};

export default ClassroomForm;
