import React from "react";
import { CssBaseline, Grid, Box, Typography, IconButton, Button, SvgIcon } from '@mui/material';
import DataTable from '../components/ClassAttendanceTable';
import PackageIcon from '../../src/assets/package-01.png';
import classImg from '../assets/class_example.png';

const ClassAttendance = ({ classObj, handleShowAttendance }) => {
  return(
    <>
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box display="flex" alignItems="center">
        <img src={PackageIcon} alt="Package Icon" style={{ marginTop: 5, marginRight: 10, width: 20, height: 20 }} />
        <Typography variant="h5">
          {/*Todo: Class 이름 가져오기*/}
          {classObj.name}
        </Typography>
      </Box>
      <Button variant="contained" onClick={handleShowAttendance}
        sx={{ width:150, borderRadius: 3.5, backgroundColor: '#F4F4F4', marginRight: 10, fontFamily:'Inter', color:'#000000', fontWeight:'bold', boxShadow: 'none' }}>
        Back
      </Button>
    </Box>

    <Box sx={{marginTop: '10vh'}}></Box>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%'}}>

        <img src={classImg} alt="Face ID" style={{maxWidth: '30vw', height: 'auto', marginBottom : 30}} />
        <DataTable/>

    </Box>
    </>
  )
}

export default ClassAttendance;