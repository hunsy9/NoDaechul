import React, { useState, useContext } from "react";
import { CssBaseline, Grid, Box, Typography, IconButton, Button, SvgIcon } from '@mui/material';
import DataTable from '../components/ClassAttendanceTable';
import PackageIcon from '../../src/assets/package-01.png';
import classImg from '../assets/class_example.png';
import CreateAttendanceLoading from "../Pages/ClassAttendance";
import CreateAttendanceComplete from "./CreateAttendanceComplete";

const ClassAttendance = ({ classObj, handleShowAttendance, attendances }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleIsLoading = () => {
    setIsLoading(!isLoading);
  }
  const handleShowIsComplete = () => {
    setIsComplete(!isComplete);
  }
  return(
    <>
      <Button variant="contained" onClick={handleShowAttendance}
        sx={{ width:150, float:'right',borderRadius: 3.5, backgroundColor: '#F4F4F4', fontFamily:'Inter', color:'#000000', fontWeight:'bold', boxShadow: 'none' }}>
        Back
      </Button>

    <Box sx={{marginTop: '10vh'}}></Box>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
      <img src={classImg} alt="Face ID" style={{maxWidth: '30vw', height: 'auto', marginBottom : 30}} />
      <DataTable classObj={classObj} attendances={attendances} />
      {/* {!isLoading && !isComplete &&
        <CreateAttendanceLoading />
      }
      {isLoading && !isComplete &&
        <CreateAttendanceComplete />
      } */}
      {/* {!isLoading && isComplete &&
        <DataTable classObj={classObj} attendances={attendances} />
      } */}
        
        

    </Box>
    </>
  )
}

export default ClassAttendance;