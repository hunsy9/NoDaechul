import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Collapse, ListItemButton, ListItemIcon, ListItemText, SvgIcon, Typography, List, Button } from '@mui/material';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddIcon from '@mui/icons-material/Add';
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';

import faceIdImage from '../assets/faceid.png';
import Classroom from './classroom';

export default function Side(props) {
  
  // const [showForm, setShowForm] = useState(false);
  
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  
  

  const DrawerList = (
    <Box sx={{ width: 300, height: "100vh", borderRadius: 3, overflow:'scroll', backgroundColor: '#FBFCFE'}} className="SideBar" role="presentation" align="center">
      <Box display="flex" alignItems="center" style={{ flexGrow: 1, marginBottom: 30 }}>
        <img src={faceIdImage} alt="Face ID" style={{ marginLeft:10, marginRight: 10, width: 40, height: 40 }} />
        <Box>
          <Typography variant="h6" align="left" style={{fontWeight:'bold'}}>
            No Dae Chul
          </Typography>
          <Typography variant="caption" align="left">
            Forbidden Proxy Attendance
          </Typography>
        </Box>
      </Box>  
      <Typography fontSize={18} sx={{margin: 1, display: "flex", alignItems: "center", textAlign: 'center'}} align="left">
        <SvgIcon component={BookmarkIcon} fontSize='medium' align="left" style={{marginRight: 10, marginLeft: 10}}/>
        Dashboard
      </Typography>
      <ListItemButton onClick={handleClick} sx={{ width: 250, borderRadius: 3, backgroundColor: '#F3F7FF'}}>
        {/*<ListItemIcon>*/}
        {/*  <ArticleOutlinedIcon />*/}
        {/*</ListItemIcon>*/}
        <ListItemText primary="Your Classroom" style={{fontWeight: 'bolder'}}/>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {/* Classroom이 위치할 곳 */}
          <Classroom
          classrooms={props.classrooms} 
          setClassObj={props.setClassObj} 
          setShowClassroom={props.setShowClassroom}
          setShowForm={props.setShowForm}
          setClassrooms={props.setClassrooms}
          setStudents={props.setStudents}
          classObj={props.classObj}
          students={props.students}
          attendances={props.attendances}
          setAttendances={props.setAttendances}
          handleShows={props.handleShows}
        />
        </List>
          <Button
              variant="contained"
              onClick={() => {
                  props.setShowForm(true);
                  props.setShowClassroom(false);
              }}
              sx={{ width: 250, borderRadius: 3, textTransform: 'none', backgroundColor: '#F6F6F6', color: '#000000', boxShadow: 'none', padding:1.5, marginBottom:2}}>
              Create Classroom
              <SvgIcon component={AddIcon} sx={{marginLeft: 8}}/>
          </Button>
      </Collapse>

    </Box>
    
  );

  return (
    <div>
      {DrawerList}
    </div>
  );
}
