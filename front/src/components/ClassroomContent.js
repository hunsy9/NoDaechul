import React, { useState, useContext } from "react";
import HostContext from '../Context/HostContext';
import { Box, Typography, SvgIcon, Grid, IconButton, Button } from '@mui/material'
import TabIcon from '@mui/icons-material/Tab';
import CreateAttendance from "./CreateAttendance";
import StudentsByDate from "./StudentsByDate";

const ClassroomContent = (props) => {
  //TODO: 수업 날짜 목록, 날짜당 출석부를 API호출을 통해 가져와서 리스트로 표시
  // 테스트용 데이터
  const attendance = [
    {date:'2024/05/15'},
    {date:'2024/05/22'},
    {date:'2024/05/29'},
    {date:'2024/05/29'},
    {date:'2024/05/29'},
    {date:'2024/05/29'},
    {date:'2024/05/29'},
    {date:'2024/05/29'},
  ]

  const [showCreate, setShowCreate] = useState(false);
  const [showStudents, setShowStudents] = useState(false);
  const [students, setStudents] = useState([
    {name: 'Seunghun Yu', studentId: '201924515'},
    {name: 'SangJun Lee', studentId: '201924515'},
    {name: 'Seyoung Chae', studentId: '201924515'},
    {name: 'JongHoon Kim', studentId: '201924515'},
    {name: 'JongHoon Kim', studentId: '201924515'},
    {name: 'JongHoon Kim', studentId: '201924515'},
    {name: 'JongHoon Kim', studentId: '201924515'},
    {name: 'JongHoon Kim', studentId: '201924515'},
    {name: 'JongHoon Kim', studentId: '201924515'},
    
  ]);

  const { host } = useContext(HostContext);

  const handleCreate = () => {
    setShowCreate(!showCreate);
  }
  const handleShowStudents = () => {
    setShowStudents('true');
  }
  const handleInvite = () => {
    try{
      var text = '';
      
      const inviteData = {
        id: props.classObj.id
      };

      var requestOptions = {
        credentials: 'include',
        method: 'GET',
        redirect: 'follow',
      };

      const inviteAPI = host + "lecture/invitelecture" + `?id=${props.classObj.id}`;
      console.log(inviteAPI);

      fetch(inviteAPI, requestOptions)
        .then(response => response.text())
        .then(result => {
          text = result;
          copyURLToClipboard(text);
        })
        .catch(error => console.log('error', error));
        
    } 
    catch (e) {
      console.log(e);
    }
  }

  const copyURLToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("클립보드에 초대코드가 복사되었습니다.");
    } catch (e) {
      alert("복사에 실패하였습니다");
    }
};

  const handleAttendance = ({date, className}) => {
    let newStudents = [...students];
    //TODO: API를 통한 학생 변경
    setStudents(newStudents);
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
            {props.classObj.name}
          </Box>
        </Grid>
        <Grid item xs={5}>
          {/* 버튼 스타일 변경 */}
          {!showCreate ? 
            <>
              <Button variant="contained" onClick={handleInvite} sx={{ 
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
          {/* 테스트용 데이터 추가, attendance.map의 attendance에 API호출로 받아온 JSON값이 들어가야함 */}
          <Box sx={{borderRadius: 5, height: 500, display: 'flex', flexDirection: 'column', alignItems: 'center', overflow:'scroll'}} className="Shadow">
            <Typography variant="h6" fontWeight={'bold'} sx={{marginTop:2, marginBottom:2, marginRight:9}}>
              Attendance
            </Typography>
            {attendance.map((attendance, index) => (
              <Button 
                key={index}
                variant="contained" 
                className="Shadow" 
                onClick={() => {
                  handleShowStudents();
                  handleAttendance(attendance.date, props.className);
                }} 
                sx={{ 
                width:200, marginTop:1, marginBottom:1, borderRadius: 3, fontSize:13, backgroundColor: '#FBFCFE', fontFamily:'Inter', color:'#000000', fontWeight:'bold', paddingBottom:2, paddingTop:2 
                }}>
                {attendance.date} Attendance
              </Button>
            ))}
          </Box>
        </Grid>
        <Grid item xs={8.5}>
          <Box sx={{borderRadius: 5, height: 500, display: 'flex', flexDirection: 'column', alignItems: 'center', overflow:'scroll'}} className="Shadow">
            {showStudents ? <StudentsByDate students={students}></StudentsByDate> : <></>}
          </Box>
        </Grid>
      </Grid> : 
      <CreateAttendance></CreateAttendance>

      }
    </>
    
  );
}

export default ClassroomContent;
