import React, { useEffect, useRef } from "react";
import { CssBaseline, Grid, Box, Typography, IconButton, Button, SvgIcon } from '@mui/material';
import DataTable from '../components/ClassAttendanceTable';
import PackageIcon from '../../src/assets/package-01.png';
import classImg from '../assets/class_example.png';
import CreateAttendanceLoading from "./CreateAttendanceLoading";
import CreateAttendanceComplete from "./CreateAttendanceComplete";

const ClassAttendance = ({ 
    handleShowAttendance, 
    isLoading,  
    setIsLoading,
    isComplete,
    setIsComplete,
    setShowAttendance,
    attendanceData,
    Images,
  }) => {
  const boundingBoxes = attendanceData.lectureImageBoundingBoxes;
  const imgRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.src = Images[0];
    img.onload = () => {
      const canvas = canvasRef.current
      const ctv = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      boundingBoxes.forEach(box => {
        const { width, height, left_pos, top_pos } = box;
        ctx.beginPath();
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.rect(
          left_pos * img.width,
          top_pos * img.height,
          width * img.width,
          height * img.height
        );
        ctx.stroke();
      });
    };
  }, [Images, boundingBoxes]);

  return(
    <>
      {!isLoading && !isComplete &&
        <Button variant="contained" onClick={handleShowAttendance}
        sx={{ width:150, float:'right',borderRadius: 3.5, backgroundColor: '#F4F4F4', fontFamily:'Inter', color:'#000000', fontWeight:'bold', boxShadow: 'none' }}>
        Back
        </Button>
      }

    <Box sx={{marginTop: '10vh'}}></Box>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
      <canvas ref={canvasRef} />
      {!isLoading && !isComplete &&
        <DataTable 
          attendanceData={attendanceData} 
        />
      }
      {isLoading && !isComplete &&
        <CreateAttendanceLoading />
      }
      {!isLoading && isComplete &&
        <CreateAttendanceComplete 
          setIsComplete={setIsComplete}
          setIsLoading={setIsLoading}
          setShowAttendance={setShowAttendance}
        />
      } 

    </Box>
    </>
  )
}

export default ClassAttendance;