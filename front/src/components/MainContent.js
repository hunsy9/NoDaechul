import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import ImageSection from './ImageSection';
import sampleImage from '../assets/sample.png'
import { Link } from 'react-router-dom';

const MainContent = () => {
  return (
    <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Prevent proxy attendance in your class
      </Typography>
      <ImageSection src={sampleImage} alt="Content Image" />
      <Button variant="contained" color="secondary" size="large" component={Link} to="/Signup" style={{ marginTop: '20px' }}>
        Get Started!
      </Button>
    </Container>
  );
};

export default MainContent;
