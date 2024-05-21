import React from "react";
import { Box, Typography, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const MainHeader = ({userRole, userName}) => {
  return(
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: 2 }}>
      { userRole == 'Admin' ? 
      <Box style={{border: '1px solid'}} sx={{borderRadius: 7, textAlign: 'center', marginRight: 2}}>
        <Typography variant="subtitle2" sx={{marginLeft:1, marginRight:1}}>
          {userRole}
        </Typography>
      </Box> : 
      <></>
      }
      <Typography variant="subtitle1" sx={{marginRight: 2}}>
        {userName}
      </Typography>
      {/* TODO: 설정버튼 기능 추가 */}
      <IconButton>
        <SettingsIcon />
      </IconButton>
    </Box>
  );
}
export default MainHeader;