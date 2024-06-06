import React from "react";
import { CssBaseline, Grid, Box, Typography, IconButton, Button, SvgIcon } from '@mui/material';
import DataTable from '../components/ClassAttendanceTable';
import PackageIcon from '../../src/assets/package-01.png';
import classImg from '../assets/class_example.png';

const ClassAttendance = ({ classObj, handleShowAttendance }) => {
  return(
    <>
      <Button variant="contained" onClick={handleShowAttendance}
        sx={{ width:150, float:'right',borderRadius: 3.5, backgroundColor: '#F4F4F4', fontFamily:'Inter', color:'#000000', fontWeight:'bold', boxShadow: 'none' }}>
        Back
      </Button>

    <Box sx={{marginTop: '10vh'}}></Box>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%'}}>

        <img src={classImg} alt="Face ID" style={{maxWidth: '30vw', height: 'auto', marginBottom : 30}} />
        <DataTable classObj={classObj}/>

    </Box>
    </>
  )
}

export default ClassAttendance;