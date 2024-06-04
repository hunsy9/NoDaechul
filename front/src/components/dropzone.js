
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { CssBaseline, Grid, Box, Typography, IconButton, Button, SvgIcon } from '@mui/material';

const MyDropzone = () => {

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const inputBox = {
    width: '30vw',
    height: '40vh',
    // backgroundColor: '#FFFFFF',
    borderRadius: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' // 그림자
  };

  return (
    <div style={inputBox} {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p style={{ textAlign: 'center' }}>
            <div >
              <Button variant="contained"
                sx={{ width: 150, borderRadius: 3.5, backgroundColor: '#000000', fontFamily: 'Inter', color: '#F4F4F4', fontWeight: 'bold', boxShadow: 'none', marginTop: '18%' }}>
                Upload Image
              </Button>
              <Typography variant="subtitle2" sx={{ fontFamily: 'Inter', color: '#000000', fontWeight: 'bold', marginTop: '13%' }}>
                or drop a file.
              </Typography>
              <Typography variant="subtitle2" sx={{ fontFamily: 'Inter', color: '#b0b0b0' }}>
                paste image or URL
              </Typography>
            </div>
          </p>

      }
    </div>
  )
}
export default MyDropzone; 
