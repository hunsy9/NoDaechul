import React, { useState, useContext } from "react";
import HostContext from '../Context/HostContext';
import { Box, Typography, SvgIcon, Grid, IconButton, Button } from '@mui/material'
import CreateAttendance from "./CreateAttendance";
import StudentsByLecture from "./StudentsByLecture ";
import ClassAttendance from "./ClassAttendance";
import PackageIcon from '../../src/assets/package-01.svg';
import { useNavigate } from "react-router-dom";
import AuthContext from "../auth/AuthContext";

const ClassroomContent = ({ 
  classObj, 
  students, 
  attendances, 
  showCreate,
  showAttendance,
  setShowCreate,
  setShowAttendance,
  showSide,
  setShowSide,
}) => {
  //TODO: 수업 날짜 목록, 날짜당 출석부를 API호출을 통해 가져와서 리스트로 표시
  // 테스트용 데이터
  const role = localStorage.getItem('role');
  let navigate = useNavigate();
  let date = '';
  const { host } = useContext(HostContext);
  const { logout } = useContext(AuthContext);

  const handleCreate = () => {
    setShowCreate(!showCreate);
  }
  const handleShowAttendance = () => {
    setShowAttendance(!showAttendance);
  }
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const [Images, setImages] = useState([]);

  const [attendanceData, setAttendanceData] = useState([
    {
      publicImageUrl:'',
      lectureImageBoundingBoxes:[
        {
          width: 0,
          height: 0,
          left_pos: 0,
          top_pos: 0
        },
      ],
      attendance:{
        attendanceMetaData:{
          total_students:0,
          attend_students:0,
          absent_students:0
        },
        attendanceUserRecords:[
          {
            user_id:-1,
            student_id:'',
            name:'',
            similarity:0,
            status:''
          }
        ]
      }
    }
  ]);

  const [attendanceId, setAttendanceId] = useState(-1);

  const onhandleGet = (id) => {

    const getHost = host + "attendance/get";

    const getData = {
      lectureId : classObj.id,
      attendanceId: id
    }

    console.log(getData);

    setIsLoading(true);
    setShowSide(false);

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
      if(response.ok){
        return response.text();
      }
      if (response.status === 401) {
        logout();
        navigate('/Login');
      }
      else{
        throw new Error(response.json());
      }
    })
    .then(result => {
      var newAttendanceData = [...attendanceData];
      newAttendanceData = result;
      setAttendanceData(newAttendanceData);

      newAttendanceData = JSON.parse(newAttendanceData);
      console.log(newAttendanceData.publicImageUrl);
      setImages(newAttendanceData.publicImageUrl);

      setIsLoading(false);
      setShowSide(true);
    })
    .catch(error => {
      console.log(error);
    })
  }

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
        .then(response => 
        {
          // 확인 
          if (response.status === 401) {
            logout();
            navigate('/Login');
          }
          if (response.ok) {
            response.text()
          }
        }
        )
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


  return(
    <>
      <Grid container direction={"row"} sx={{marginBottom:1.5}}>
        <Grid item xs={7}>
          <Box
            sx={{
            fontSize: 23, // Adjust emoji size
              fontWeight: 'bold'
            }}
          >
            <img src={PackageIcon} style={{marginRight: 5, verticalAlign:'middle'}}/>
            {classObj.name}
          </Box>
        </Grid>
        <Grid container justifyContent="flex-end" item xs={5} >
          {/* 버튼 스타일 변경 */}
          {!showCreate && !showAttendance &&  role == "Admin" ? 
            <>
              <Button variant="contained" onClick={handleInvite} sx={{ 
                 width:130, borderRadius: 3.5, textTransform: 'none', backgroundColor: '#F4F4F4', marginRight: 2, fontFamily:'Inter', color:'#000000', fontWeight:'bold', boxShadow: 'none'
              }}>
              Invite Member
              </Button>
              <Button variant="contained" onClick={handleCreate} sx={{ 
                 width:150, borderRadius: 3.5, textTransform: 'none', backgroundColor: '#3D3D3D', fontFamily:'Inter', color:'#FFFFFF', fontWeight:'bold', boxShadow: 'none', marginRight:'50px'
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
      {!showCreate && !showAttendance && !isLoading && !isComplete &&
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
                  console.log(attendance.id);
                  setAttendanceId(attendance.id);
                  onhandleGet(attendance.id);
                  handleShowAttendance();
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
          showSide={showSide}
          setShowSide={setShowSide}
          setAttendanceId={setAttendanceId}
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
