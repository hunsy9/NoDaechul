// import React, { useEffect, useState } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import axios from 'axios';


// const DataTable = () => {


  
//   const columns = [
//     { field: 'studentID', headerName: 'Student ID', width: 250 },
//     { field: 'name', headerName: 'Name', width: 200 },
//     { field: 'status', headerName: 'Status', width: 200 },
  
//     {
//       field: 'accuracy',
//       headerName: 'Accuracy',
//       description: 'This column has a value getter and is not sortable.',
//       sortable: false,
//       width: 200,
//     },
//   ];
  
//   // test 
//   // const rows = [
//   //   { id: 1, studentID: 201944521, name: 'Snow', status: 'O', accuracy: 35 },
//   //   { id: 2, studentID: 201944522, name: 'Lannister', status: 'O', accuracy: 42 },
//   //   { id: 3, studentID: 201944523, name: 'Lannister', status: 'X', accuracy: 45 },
//   //   { id: 4, studentID: 201944524, name: 'Stark', status: 'O', accuracy: 16 },
//   //   { id: 5, studentID: 201944525, name: 'Targaryen', status: 'O', accuracy: null },
//   //   { id: 6, studentID: 201944526, name: 'Melisandre', status: 'X', accuracy: 150 },
//   //   { id: 7, studentID: 201944527, name: 'Clifford', status: 'X', accuracy: 44 },
//   //   { id: 8, studentID: 201944528, name: 'Frances', status: 'O', accuracy: 36 },
//   //   { id: 9, studentID: 201944529, name: 'Roxie', status: 'X', accuracy: 65 },
//   // ];
//   return (
//     <div style={{ height: 300, width: '80%'}}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 5 },
//           },
//         }}
//         pageSizeOptions={[5, 10]}
//         // checkboxSelection
        
//       ></DataGrid>
//     </div>
//   );
// }
// export default DataTable; 

import React, { useState, useEffect, useContext } from 'react';
import HostContext from '../Context/HostContext';
import { DataGrid } from '@mui/x-data-grid';

const DataTable = () => {
  const { host } = useContext(HostContext);
  // todo : GetAttendanceAPI port와 lectureId 추가 (잘 안됨)
  const GetAttendanceAPI = host + 'lecture/getattendance';

  const url = new URL(GetAttendanceAPI);
  const lectureId = 12;
  url.searchParams.append('lectureId', lectureId);
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
