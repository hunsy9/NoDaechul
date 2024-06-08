import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ImageSection from '../components/ImageSection';
import sampleImage from '../assets/sample.svg'
import HeaderAppBar from '../components/HeaderAppBar';

const Landing = () => {
  return (
    <>
    <HeaderAppBar/>
      <Container maxWidth="md" style={{textAlign: 'center', marginTop: '50px'}}>
        <Typography className="landing-text" variant="h4">
        Prevent proxy attendance in your class!
        </Typography>
        <ImageSection src={sampleImage} alt="Content Image"/>
        <Button className="pulse" variant="contained" color="secondary" sx={{borderRadius: 5}} size="large"
                component={Link} to="/Signup" style={{marginTop: '20px', textTransform: 'none', fontWeight: 'bold'}}>
          Get Started!
        </Button>
      </Container>
    </>
  );
};

export default Landing;
