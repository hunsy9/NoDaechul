import React from 'react';
import { Box } from '@mui/material';

const ImageSection = ({ src, alt }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{ width: '100%', height: '300px', borderRadius:'20px', backgroundColor: '#FBFCFE', marginBottom: '50px', marginTop: '50px', padding: '20px'}}
    >
      <img src={src} alt={alt} style={{ maxWidth: '100%', maxHeight: '100%' }} />
    </Box>
  );
};

export default ImageSection;
