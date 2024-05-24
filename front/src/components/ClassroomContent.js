import React, {useState} from "react";
import { Box, Typography, SvgIcon, Grid, IconButton, Button } from '@mui/material'
import TabIcon from '@mui/icons-material/Tab';
import CreateAttendance from "./CreateAttendance";

const ClassroomContent = (props) => {
  //TODO: 수업 날짜 목록, 날짜당 출석부를 API호출을 통해 가져와서 리스트로 표시

  const [showCreate, setShowCreate] = useState(false);
  const handleCreate = () => {
    setShowCreate(!showCreate);
  }

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
          {!showCreate ? 
            <>
              <Button variant="contained" sx={{ 
                 width:150, borderRadius: 3.5, backgroundColor: '#F4F4F4', marginRight: 2, fontFamily:'Inter', color:'#000000', fontWeight:'bold', boxShadow: 'none' 
              }}>
              Invite Member
              </Button>
              <Button variant="contained" onClick={handleCreate} sx={{ 
                 width:170, borderRadius: 3.5, backgroundColor: '#3D3D3D', fontFamily:'Inter', color:'#FFFFFF', fontWeight:'bold', boxShadow: 'none' 
              }}>
                New Attendance
              </Button>
            </> :
            <Button variant="contained" onClick={handleCreate}
            sx={{ width:150, borderRadius: 3.5, backgroundColor: '#F4F4F4', marginRight: 10, fontFamily:'Inter', color:'#000000', fontWeight:'bold', boxShadow: 'none' }}>
            Back
            </Button>
            }
        </Grid>
      </Grid>
      {!showCreate ? 
      <Grid container direction={"row"} spacing={3}>
        <Grid item xs={3}>
          {/* TODO: 스크롤바 추가 */}
          <Box sx={{borderRadius: 5, height: 500}} className="Shadow">
            {/* TODO: 여기에 날짜들이 들어가야 함 */}
          </Box>
        </Grid>
        <Grid item xs={8.5}>
          <Box sx={{borderRadius: 5, height: 500}} className="Shadow">
            {/* TODO: 여기에 출석부가 들어가야 함 */}
          </Box>
        </Grid>
      </Grid> : 
      <CreateAttendance>
      </CreateAttendance>

      }
    </>
    
  );
}

export default ClassroomContent;
