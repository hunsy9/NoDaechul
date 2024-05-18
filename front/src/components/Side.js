import * as React from 'react';
import Box from '@mui/material/Box';
import { Collapse, ListItemButton, ListItemIcon, ListItemText, SvgIcon, Typography, List } from '@mui/material';
import ClassroomList from './ClassroomList';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import faceIdImage from './faceid.png';
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';

export default function Side() {

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const DrawerList = (
    <Box sx={{ width: 300, height: 1000, borderRadius: 3}} className="sideBar" role="presentation" align="center">
      <Box display="flex" alignItems="center" style={{ flexGrow: 1, marginBottom: 30 }}>
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
      <Typography fontSize={18} sx={{margin: 1, display: "flex", alignItems: "center", textAlign: 'center'}} align="left">
        <SvgIcon component={BookmarkIcon} fontSize='medium' align="left"/>
        Dashboard
      </Typography>
      <ListItemButton onClick={handleClick} sx={{ width: 250, borderRadius: 3, backgroundColor: '#F3F7FF'}}>
        <ListItemIcon>
          <ArticleOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Your Classroom" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              {/* Classroom이 위치할 곳 */}
              <ClassroomList>
              </ClassroomList>
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Collapse>
    </Box>
  );

  return (
    <div>
      {DrawerList}
    </div>
  );
}
