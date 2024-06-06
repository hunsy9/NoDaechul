
import { Box, Typography, Button } from '@mui/material';

const CreateAttendanceComplete = ({setIsLoading,
    setIsComplete,
    setShowAttendance}) => {

    const handleShows = () => {
        setIsComplete(false);
        setIsLoading(false);
        setShowAttendance(true);
    }
    
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
            Attendance Created!
            </Typography>
            <Button variant="contained" onClick={handleShows}
                sx={{ width:150, float:'right',borderRadius: 3.5, backgroundColor: '#F4F4F4', fontFamily:'Inter', color:'#000000', fontWeight:'bold', boxShadow: 'none' }}>
                Check
            </Button>

        </Box>
        
    );
}


export default CreateAttendanceComplete;
