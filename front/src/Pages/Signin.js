import React, { useContext } from 'react';
import { Box, Button, TextField, Typography, CssBaseline, Container, Grid, Link } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthContext from '../auth/AuthContext';
import HostContext from '../Context/HostContext';
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function SignIn() {
  const { login } = useContext(AuthContext);
  const { host } = useContext(HostContext);
  const LoginAPI = host + "user/login";
  let navigate = useNavigate();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const loginData = {
      email: data.get('email'),
      password: data.get('password'),
    };

    const raw = JSON.stringify(loginData);

    var name = '';
    var role = '';

    const requestOptions = {
        credentials: 'include',
      method: 'POST',
      body: raw,
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    fetch(LoginAPI, requestOptions)
      .then(response => {
        if(response.ok){
          return response.json();
        } 
        if (response.status === 401) {
          navigate('/Login');
        }
        else {
          throw new Error('Network response was not ok.');
        }
      })
      .then(result => {
        name = result.name;
        role = result.user_role;
        console.log(`${name}, ${role}`);
        localStorage.setItem('name', name);
        localStorage.setItem('role', role);
        login(true);
        navigate("/MainContent");
      })
      .catch(error => console.log('error', error));
      
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            
          <Typography component="h1" variant="h5" sx={{
              color: "#0a0a0a", 
              fontFamily: 'Inter',
              fontWeight: 'bold',
              fontSize: '35px', 
              marginBottom: '30px',
              marginTop: '30px',
              }}>
            {/* fontFamily: Inter */}
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              sx = {{
                marginBottom: '15px',
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              sx = {{
                marginBottom: '20px',
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              
              sx={{ mt: 3, mb: 2,  
                fontFamily: 'sans-serif',
                fontWeight: 'bold',
                fontSize: '16px', 
                textTransform: 'none',
                backgroundColor: '#3d3d3d'
                }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/" variant="body2" 
                sx={{
                  color: "#0a0a0a", 
                  fontFamily: 'Inter',
                  }}>
                  Back to Home
                </Link>
              </Grid>

            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
