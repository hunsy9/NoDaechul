import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';




const columns = [
  { field: 'studentID', headerName: 'Student ID', width: 200 },
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



const rows = [
  { id: 1, studentID: 201944521, name: 'Snow', status: 'O', accuracy: 35 },
  { id: 2, studentID: 201944522, name: 'Lannister', status: 'O', accuracy: 42 },
  { id: 3, studentID: 201944523, name: 'Lannister', status: 'X', accuracy: 45 },
  { id: 4, studentID: 201944524, name: 'Stark', status: 'O', accuracy: 16 },
  { id: 5, studentID: 201944525, name: 'Targaryen', status: 'O', accuracy: null },
  { id: 6, studentID: 201944526, name: 'Melisandre', status: 'X', accuracy: 150 },
  { id: 7, studentID: 201944527, name: 'Clifford', status: 'X', accuracy: 44 },
  { id: 8, studentID: 201944528, name: 'Frances', status: 'O', accuracy: 36 },
  { id: 9, studentID: 201944529, name: 'Roxie', status: 'X', accuracy: 65 },
];

const DataTable = () => {
  return (
    <div style={{ height: 300, width: '80%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
export default DataTable; 