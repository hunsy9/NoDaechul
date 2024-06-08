 import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const CreateAttendanceLoading = () => {


    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',

          }}>
           <Typography component="h1" variant="h3"
            sx={{
              color: "#0a0a0a", 
              fontFamily: 'Inter',
              fontWeight: 'bold',
              fontSize: '23px', 
              marginBottom: '30px',
              marginTop: '30px',
              }}>
            Getting Attendance...
            </Typography>
            <CircularProgress color="secondary" />

        </Box>
        
    );
}


export default CreateAttendanceLoading;
