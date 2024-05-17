import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import faceIdImage from '../assets/faceid.png'; // 이미지 경로를 올바르게 설정

const HeaderAppBar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Box display="flex" alignItems="center" style={{ flexGrow: 1 }}>
          <img src={faceIdImage} alt="Face ID" style={{ marginRight: 20, width: 40, height: 40 }} />
          <Box>
            <Typography variant="h6" align="left">
              No Dae Chul
            </Typography>
            <Typography variant="caption" align="left">
              Forbidden Proxy Attendance
            </Typography>
          </Box>
        </Box>
        {/* <Button variant="contained" color="secondary" component={Link} to="/">
          Main
        </Button> */}
        <Button variant="contained" color="primary" component={Link} to="/Login" style={{marginRight: 10, marginLeft: 10,}}>
          Sign in
        </Button>
        <Button variant="contained" color="secondary" component={Link} to="/Signup" style={{marginRight: 10, marginLeft: 10,}}>
          Sign up
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderAppBar;
