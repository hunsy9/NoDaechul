import React, { useState, useEffect, useContext } from 'react';
import HostContext from '../Context/HostContext';
import { DataGrid } from '@mui/x-data-grid';

const DataTable = (props) => {
  const { host } = useContext(HostContext);
  // todo : GetAttendanceAPI port와 lectureId 추가 (잘 안됨)
  const GetAttendanceAPI = host + 'lecture/getattendance?';
  // 예시 API : http://localhost:5555/api/lecture/getattendance?lectureId=12
  // 테스트 필요
  
  const url = new URL(GetAttendanceAPI);
  const lectureId = props.classObj.id;
  url.searchParams.append('lectureId', lectureId);

  // url 확인
  console.log(url);
  
  const [rows, setRows] = useState([]);
  
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
        const response = await fetch(url, {
          // method: 'GET',
          credentials: 'include',
          method: 'GET',
          redirect: 'follow'
          // headers: {
          //   'Content-Type': 'application/json'
          // },
          // body: JSON.stringify({ lectureId: 12 })
        });

        if (response.ok) {
          const data = await response.json();
          setRows(data);
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
    <div style={{ height: 300, width: '80%'}}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10]}
        pagination
      />
    </div>
  );
}

export default DataTable;
