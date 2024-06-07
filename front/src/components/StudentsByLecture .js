import React from "react";
import { Box, Typography, SvgIcon, Grid, IconButton, Button } from '@mui/material'

const StudentsByLecture = (props) => {
    const alterImage = "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=1800"

    return (
    <>
      <Grid container direction={"row"}>
      <Grid item xs={3}>
        <Typography variant="h6" fontWeight={'bold'}  sx={{marginLeft:3, marginTop:2, marginBottom:2}}>
          Members
        </Typography>
      </Grid>
      <Grid item xs={7}></Grid>
      <Grid item xs={2}>
        <Typography variant="subtitle1" sx={{marginLeft:2, marginTop:2, marginBottom:2}}>
          Total: {props.students && props.students.length}
        </Typography>
      </Grid>
    </Grid>
    {props.students && props.students.map((students, index) => (
      <Button key={index} variant="contained" className="Shadow" sx={{ 
        width:600, height:80, marginTop:1, marginBottom:1, borderRadius: 3.5, fontSize:13, backgroundColor: '#FBFCFE', fontFamily:'Inter', color:'#000000', fontWeight:'bold', paddingBottom:2, paddingTop:2 
      }}>
        <Grid container direction={"row"}>
          <Grid item xs={2}>
            <Box sx={{width:50, height:50, borderRadius:'50%'}}>
              <img src={students.avatar_url} onError={alterImage} style={{width: '100%', borderRadius:'50%', height: '100%'}} />
            </Box>
          </Grid>
          <Grid item xs={10} sx={{display:'flex', flexDirection: 'column', alignItems:'flex-start'}}>
            <Typography fontSize={16} fontWeight={'bold'}>
              {students.name}
            </Typography>
            <Typography fontSize={14} sx={{marginTop:1}}>
              Student Id: {students.student_id}
            </Typography>
          </Grid>
        </Grid>
      </Button>
    ))}
  </>
  )
}

export default StudentsByLecture;
