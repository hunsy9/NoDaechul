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
  let data;
  if(typeof attendanceData !== 'object'){
    data = JSON.parse(attendanceData);
  }
  else{
    data = attendanceData;
  }
  
  console.log(data);

  const attendance = data?.attendance.attendanceMetaData;
  const attendanceUser = data.attendance?.attendanceUserRecords;

  const attendanceFormat = attendanceUser?.map((user) => {
    let row = new Object();
    row.id = user.student_id;
    row.studentID = user.student_id;
    row.name = user.name;
    row.status = user.status;
    row.accuracy = user.similarity + "%";
    return row;
  }) || [];
  console.log(attendanceFormat);

  return (
    <Box>
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 35, marginBottom: 10}}>
            <Typography component="h1" variant="h6">
                Attendance
            </Typography>
            <div style={{paddingLeft: 10, paddingRight: 10, borderRadius: 5, backgroundColor: '#fafafa'}}>
                <Typography component="h1" variant="h5">
                    <span style={{fontSize: 'medium'}}>Total {attendance && attendance.total_students}         </span>
                    <span style={{fontSize: 'medium', color: '#6edc3d'}}>Attend {attendance && attendance.attend_students}        </span>
                    <span style={{fontSize: 'medium', color: '#f35483'}}>Absent {attendance && attendance.absent_students}       </span>
                </Typography>
            </div>
        </div>
        <div style={{height: 300, width: '100%'}}>
            <DataGrid
                rows={attendanceFormat}
          columns={columns}
          pageSizeOptions={[5, 10]}
          pagination
                sx={{fontWeight: 'bold'}}
        />
      </div>
    </Box>
  );
}

export default DataTable;
