import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import DropzoneAreaComponent from '../components/dropzone';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const CreateAttendance = () => {
  return(
    <Box sx={{marginTop: '10vh'}}>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh'}}>
      <Box sx={{ alignItems: 'center', justifyContent: 'center'}}>
        <DropzoneAreaComponent>
        </DropzoneAreaComponent>
        <div style={{ textAlign: 'center' }}>
          <Typography variant="subtitle1" sx ={{fontFamily:'Inter', color:'#000000', fontWeight:'bold', marginTop: '30px'}}>
            Choose your Class Date.
          </Typography>
          <Box sx = {{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          
          <LocalizationProvider dateAdapter={AdapterDayjs} >

            <DatePicker label="Choose Class Date"  sx = {{ width : '200px', marginTop : '20px'}}>
            </DatePicker>
          </LocalizationProvider>

          {/** Save 버튼 기능 추가 필요 */}
          <Button variant="contained" 
            sx={{ width:150, borderRadius: 3.5, backgroundColor: '#F4F4F4', fontFamily:'Inter', color:'#000000', fontWeight:'bold', boxShadow: 'none', marginTop : '30px' }}>
            Save
          </Button>
          </Box>
        </div> 
      </Box>
    </Box>
    </Box>
  )
}

export default CreateAttendance;