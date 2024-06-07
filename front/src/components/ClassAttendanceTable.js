import React, { useState, useEffect, useContext } from 'react';
import HostContext from '../Context/HostContext';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';

const DataTable = ({
  attendanceData
}) => {

  
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

  let data = JSON.parse(attendanceData);

  const attendance = data.attendance.attendanceMetaData;
  const attendanceUser = data.attendance.attendanceUserRecords;

  const attendanceFormat = attendanceUser.map((user) => {
    let row = new Object();
    row.id = user.student_id;
    row.studentID = user.student_id;
    row.name = user.name;
    row.status = user.status;
    row.accuracy = user.similarity;
    return row;
  });
  console.log(attendanceFormat);

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
        Total {attendance && attendance.total_students} 
        Attend {attendance && attendance.attend_students} 
        Absent {attendance && attendance.absent_students}
      </Typography>      
      <div style={{ height: 300, width: '80%'}}>
        <DataGrid
          rows={attendanceFormat}
          columns={columns}
          pageSizeOptions={[5, 10]}
          pagination
        />
      </div>
    </Box>
  );
}

export default DataTable;
