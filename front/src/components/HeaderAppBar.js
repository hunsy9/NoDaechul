import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const HeaderAppBar = () => {
  return (
    <AppBar position="static" color='primary'>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          No Dae Chul
        </Typography>
        <Button variant='contained' color="primary" component={Link} to="/Login">Sign in</Button>
        <Button variant='contained' color="secondary" component={Link} to="/Signup">Sign up</Button>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderAppBar;
