import React from "react";
import { Box, Typography, SvgIcon, Grid, IconButton, Button } from '@mui/material'
import TabIcon from '@mui/icons-material/Tab';

const ClassroomContent = (props) => {
  //TODO: 수업 날짜 목록, 날짜당 출석부를 API호출을 통해 가져와서 리스트로 표시
  return(
    <>
      <Grid container direction={"row"} sx={{marginBottom:1.5}}>
        <Grid item xs={7}>
          <Box
            sx={{
            fontSize: 32 // Adjust emoji size
            }}
          >
            <SvgIcon component={TabIcon} sx={{marginRight: 2}}/>
            {props.className}
          </Box>
        </Grid>
        <Grid item xs={5}>
          {/* 버튼 스타일 변경 */}
          <Button variant="contained" sx={{ width: 170, backgroundColor: '#F6F6F6', color: '#000000', marginRight:2}}>
            Invite Member
          </Button>
          <Button variant="contained" sx={{ width: 170, backgroundColor: '#F6F6F6', color: '#000000'}}>
            New Attendance
          </Button>
        </Grid>
      </Grid>
      <Grid container direction={"row"} spacing={3}>
        <Grid item xs={3}>
          {/* TODO: 스크롤바 추가 */}
          <Box sx={{borderRadius: 5, height: 500}} className="date">
            {/* TODO: 여기에 날짜들이 들어가야 함 */}
          </Box>
        </Grid>
        <Grid item xs={8.5}>
          <Box sx={{borderRadius: 5, height: 500}} className="attendance">
            {/* TODO: 여기에 출석부가 들어가야 함 */}
          </Box>
        </Grid>
      </Grid>
    </>
    
  );
}

export default ClassroomContent;
