import React, { useState, useContext } from "react";
import HostContext from '../Context/HostContext';
import { Box, Typography, SvgIcon, Grid, IconButton, Button } from '@mui/material'
import CreateAttendance from "./CreateAttendance";
import StudentsByLecture from "./StudentsByLecture ";
import ClassAttendance from "./ClassAttendance";
import PackageIcon from '../../src/assets/package-01.svg';

const ClassroomContent = ({ classObj, students, attendances, showCreate,
  showAttendance,
  setShowCreate,
  setShowAttendance }) => {
  //TODO: 수업 날짜 목록, 날짜당 출석부를 API호출을 통해 가져와서 리스트로 표시
  // 테스트용 데이터
  const role = localStorage.getItem('role');

  let date = '';
  const { host } = useContext(HostContext);

  const handleCreate = () => {
    setShowCreate(!showCreate);
  }
  const handleShowAttendance = () => {
    setShowAttendance(!showAttendance);
  }
  // isLoading false -> true
  const [isLoading, setIsLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  const [Images, setImages] = useState([]);

  const [attendanceData, setAttendanceData] = useState([]);

  const [attendanceId, setAttendanceId] = useState(-1);

  const handleInvite = () => {
    try{
      var text = '';

      var requestOptions = {
        credentials: 'include',
        method: 'GET',
        redirect: 'follow',
      };

      const inviteAPI = host + "lecture/invitelecture" + `?id=${classObj.id}`;
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

  const onhandleGet = () => {
    console.log(classObj);

    const getHost = host + "attendance/get";

    const getData = {
      lectureId : classObj.id,
      attendanceId: attendanceId
    }

    const raw = JSON.stringify(getData);

    const requestOptions = {
      credentials: 'include',
      method: 'POST',
      body: raw,
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch(getHost, requestOptions)
    .then(response => {
      console.log("loading, complete" , isLoading, isComplete);
      if(response.ok){
        // state 변수 상태 추가
        setIsLoading(false);
        setIsComplete(true);
        
        return response.text();
      }
      else{
        // state 변수 상태 추가
        setIsLoading(true);
        setIsComplete(false);
        throw new Error(response.json());
      }
    })
    .then(result => {
      var newAttendanceData = [...attendanceData];
      newAttendanceData = result;
      setAttendanceData(newAttendanceData);
      console.log(newAttendanceData);
    })
    .catch(error => {
      console.log(error);
    })
  }



  return(
    <>
      <Grid container direction={"row"} sx={{marginBottom:1.5}}>
        <Grid item xs={7}>
          <Box
            sx={{
            fontSize: 23, // Adjust emoji size
            }}
          >
            <img src={PackageIcon} style={{marginRight: 5, verticalAlign:'middle'}}/>
            {classObj.name}
          </Box>
        </Grid>
        <Grid item xs={5}>
          {/* 버튼 스타일 변경 */}
          {!showCreate && !showAttendance &&  role == "Admin" ? 
            <>
              <Button variant="contained" onClick={handleInvite} sx={{ 
                 width:130, borderRadius: 3.5, textTransform: 'none', backgroundColor: '#F4F4F4', marginRight: 2, fontFamily:'Inter', color:'#000000', fontWeight:'bold', boxShadow: 'none'
              }}>
              Invite Member
              </Button>
              <Button variant="contained" onClick={handleCreate} sx={{ 
                 width:150, borderRadius: 3.5, textTransform: 'none', backgroundColor: '#3D3D3D', fontFamily:'Inter', color:'#FFFFFF', fontWeight:'bold', boxShadow: 'none'
              }}>
                New Attendance
              </Button>
            </> : role == "Admin" && !showAttendance &&
            <Button variant="contained" onClick={handleCreate}
            sx={{ width:80, borderRadius: 3.5, backgroundColor: '#F4F4F4',textTransform: 'none', marginRight: 10, fontFamily:'Inter', color:'#000000', fontWeight:'bold', boxShadow: 'none' }}>
            Back
            </Button>
            }
        </Grid>
      </Grid>
      {/* !isLoading -> isLoading  */}
      {!showCreate && !showAttendance && isLoading && !isComplete &&
      <Grid container direction={"row"} spacing={3}>
        <Grid item xs={3}>
          <Box sx={{borderRadius: 5, height: 500, display: 'flex', flexDirection: 'column', alignItems: 'center', overflow:'scroll'}} className="Shadow">
            <Typography variant="h6" fontWeight={'bold'} sx={{marginTop:2, marginBottom:2, marginRight:9}}>
              Attendance
            </Typography>
            {attendances.map((attendance, index) => (
              <Button 
                key={index}
                variant="contained" 
                className="Shadow" 
                onClick={() => {
                  handleShowAttendance();
                  setAttendanceId(attendance.id);
                  onhandleGet();
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
            <StudentsByLecture students={students}></StudentsByLecture>
          </Box>
        </Grid>
      </Grid> 
      }
      {showCreate && !showAttendance &&
        <CreateAttendance 
          classObj={classObj} 
          attendanceId={attendanceId}
          setIsLoading={setIsLoading}
          setIsComplete={setIsComplete}
          setShowCreate={setShowCreate}
          setShowAttendance={setShowAttendance}
          attendanceData={attendanceData}
          setAttendanceData={setAttendanceData}
          Images={Images}
          setImages={setImages}
        />
      }
      {!showCreate && showAttendance &&
        <ClassAttendance 
          handleShowAttendance={handleShowAttendance} 
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          isComplete={isComplete}
          setIsComplete={setIsComplete}
          setShowCreate={setShowCreate}
          setShowAttendance={setShowAttendance}
          attendanceData={attendanceData}
          Images={Images}
        />
      }
    </>
    
  );
}

export default ClassroomContent;
