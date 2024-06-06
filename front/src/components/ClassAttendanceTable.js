import React, { useState, useEffect, useContext } from 'react';
import HostContext from '../Context/HostContext';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';

const DataTable = (props) => {
  console.log(props)
  const { host } = useContext(HostContext);
  // todo : GetAttendanceAPI port와 lectureId 추가 (잘 안됨)

  const GetAttendanceAPI = host + 'attendance/get';
  // 테스트 필요
  
  const url = new URL(GetAttendanceAPI);
  const lectureId = props.classObj.id;
  const attendanceId = props.attendances.id;
  url.searchParams.append('lectureId', lectureId);
  

  // url 확인
  console.log(url);
  
  const [rows, setRows] = useState([]);

  // 수업 참가 수, 수업 학생수, 결석 수
  const [attendCount, setAttendCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);

  
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = {
          lectureId,
          attendanceId,
        };
        console.log("p ", postData);

        const requestOptions = {
          method: 'POST',
          body: postData,
          redirect: 'follow',
        };
        const response = await fetch(url, requestOptions);
        // const response = await fetch(url, {
        //   credentials: 'include',
        //   method: 'POST',
        //   redirect: 'follow'
        //   // headers: {
        //   //   'Content-Type': 'application/json'
        //   // },
        //   // body: JSON.stringify({ lectureId: 12 })
        // });

        if (response.ok) {
          const data = await response.json();
          setTotalCount(data.attendance.attendanceMetaData.total_students);
          setAttendCount(data.attendance.attendanceMetaData.attend_students);
          setAbsentCount(data.attendance.attendanceMetaData.absent_students);
          setRows(data.attendance.attendanceUserRecords);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
              Total {totalCount} Attend {attendCount} Absent {absentCount}
      </Typography>      
      <div style={{ height: 300, width: '80%'}}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          pagination
        />
      </div>
    </Box>
  );
}

export default DataTable;
