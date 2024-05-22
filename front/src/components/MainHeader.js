import React, { useState, useContext } from "react";
import { Box, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { useNavigate } from "react-router-dom";
import SettingsIcon from '@mui/icons-material/Settings';
import AuthContext from "../auth/AuthContext";
import cookie from 'react-cookies';

const MainHeader = ({ userRole, userName }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout } = useContext(AuthContext);
  
  let navigate = useNavigate();
  const LogoutAPI = "http://localhost:5555/api/user/logout";
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose(); // 메뉴 닫기
    onLogout(); // 로그아웃 처리 함수 호출
  };

  const onLogout = () => {
    

    const requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };
    
    fetch(LogoutAPI, requestOptions)
      .then(response => {
        if(response.ok){
          cookie.remove("SESSION", {path : '/'})
          localStorage.removeItem('name');
          localStorage.removeItem('role');
          logout();
          navigate("/");
          alert("로그아웃!");
        }
        return response.text();
      })
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  return(
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: 4 }}>
      {userRole === 'Admin' && 
        <Box style={{border: '1px solid'}} sx={{borderRadius: 7, textAlign: 'center', marginRight: 2}}>
          <Typography variant="subtitle2" sx={{marginLeft:1, marginRight:1}}>
            {userRole}
          </Typography>
        </Box>
      }
      <Typography variant="subtitle1" sx={{marginRight: 2}}>
        {userName}
      </Typography>
      <IconButton onClick={handleMenuOpen}>
        <SettingsIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default MainHeader;
