import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import faceIdImage from '../assets/faceid.png'; // 이미지 경로를 올바르게 설정

const HeaderAppBar = () => {
  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Toolbar>
        <Box display="flex" alignItems="center" style={{ flexGrow: 1 }}>
          <img src={faceIdImage} alt="Face ID" style={{ marginRight: 15, width: 40, height: 40 }}/>
          <Box>
            <Typography variant="h6" align="left" style={{fontWeight:'bold'}}>
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
        <Button variant="contained" color="primary" sx={{borderRadius: 5}} component={Link} to="/Login" style={{marginRight: 10, marginLeft: 10, textTransform: 'none'}}>
          Sign in
        </Button>
        <Button variant="contained" color="secondary" sx={{borderRadius: 5}} component={Link} to="/Signup" style={{marginRight: 10, marginLeft: 10, textTransform: 'none'}}>
          Sign up
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderAppBar;
