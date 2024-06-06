import React, { useState, useEffect, useContext } from 'react';
import HostContext from '../Context/HostContext';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';

const DataTable = (props) => {

  
  const columns = [
    { field: 'studentID', headerName: 'Student ID', width: 250 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'status', headerName: 'Status', width: 200 },
    {
      field: 'accuracy',
      headerName: 'Accuracy',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 200,
    },
  ];
  console.log(props.attendances.attendanceMetaData);
  console.log(props.attendanceData);
  console.log(props.setAttendanceData);

  return (
    <Box>
      <Typography component="h1" variant="h3"
              sx={{
                color: "#0a0a0a", 
                fontFamily: 'Inter',
                fontWeight: 'bold',
                fontSize: '23px', 
                marginBottom: '30px',
                marginTop: '30px',
                }}>
              {/* Total {totalCount} Attend {attendCount} Absent {absentCount} */}
      </Typography>      
      <div style={{ height: 300, width: '80%'}}>
        {/* <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          pagination
        /> */}
      </div>
    </Box>
  );
}

export default DataTable;
