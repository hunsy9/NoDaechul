import React, {useState, useContext, useCallback, useEffect, useRef} from 'react';
import { Box, Typography, Button } from '@mui/material';
// import DropzoneAreaComponent from '../components/dropzone';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDropzone } from 'react-dropzone';
import HostContext from '../Context/HostContext';
import dayjs, { Dayjs } from 'dayjs';
import { useNavigate } from "react-router-dom";

const CreateAttendance = ({classObj,
  attendances,
  setIsLoading,
  setIsComplete,
  setShowCreate,
  setShowAttendance,
  attendanceData,
  attendanceId,
  setAttendanceData,
  Images,
  setImages,
  setShowSide,
  setAttendanceId,
}) => {
  // const [classObj, setClassObj] = useState({name: '', id: -1});
  // setClassObj={setClassObj};
  // classObj={classObj};
  // console.log("class object id ", props.classObj.id);
  const { host } = useContext(HostContext);
  // console.log(classObj.id);
  let navigate = useNavigate();

  
  const onDrop = useCallback(acceptedFiles => {
    setImages(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const [value, setValue] = useState();
  const dateFormat = dayjs(value).format("YYYY-MM-DD");
  const localhost = host + "attendance";
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(new Blob(Images));
  }, [onDrop, Images]);


  ////////////// 추가

  const [imgStyle, setImgStyle] = useState({});
  const imgRef = useRef(null);
  const adjustImageSize = () => {
    if (imageUrl && imgRef.current) {
      const img = imgRef.current;
      const parent = img.parentElement;

      const parentWidth = parent.clientWidth;
      const parentHeight = parent.clientHeight;

      const maxDim = Math.max(img.naturalWidth, img.naturalHeight);
      const scaleFactor = (parentWidth * 0.7) / maxDim;
      const newWidth = img.naturalWidth * scaleFactor;
      const newHeight = img.naturalHeight * scaleFactor;

      setImgStyle({
        width: `${newWidth}px`,
        height: `${newHeight}px`,
        borderRadius: '10px',
        objectFit: 'contain',
      });
    }
  };

  // useEffect(() => {
  //   const adjustImageSize = () => {
  //     if (imgRef.current) {
  //       const img = imgRef.current;
  //       const parent = img.parentElement;

  //       const parentWidth = parent.clientWidth;
  //       const parentHeight = parent.clientHeight;

  //       const maxDim = Math.max(img.naturalWidth, img.naturalHeight);
  //       const scaleFactor = (parentWidth * 0.7) / maxDim;
  //       const newWidth = img.naturalWidth * scaleFactor;
  //       const newHeight = img.naturalHeight * scaleFactor;

  //       setImgStyle({
  //         width: `${newWidth}px`,
  //         height: `${newHeight}px`,
  //         borderRadius: '10px',
  //         objectFit: 'contain',
  //       });
  //     }
  //   };

  //   if (imageUrl) {
  //     adjustImageSize();
  //   }

  //   window.addEventListener('resize', adjustImageSize);
  //   return () => window.removeEventListener('resize', adjustImageSize);
  // }, [imageUrl]);

  const imageContainer = {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30px',
    paddingTop: '5%',
  };

  /////////////
  const inputBox = {
    width: '27vw',
    height: '40vh',
    borderRadius: '20px',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // 그림자
  };

  // const inputBox = {
  //   width: '100%',
  //   height: '100%',
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   flexDirection: 'column',
  // };

  const onhandleGet = (id) => {

    const getHost = host + "attendance/get";

    const getData = {
      lectureId : classObj.id,
      attendanceId: id
    }

    console.log("attendance ID : ",id);

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
      setIsComplete(true);
      setShowSide(true);

    })
    .catch(error => {
      console.log(error);
    })
  }

  const onhandlePost = () => {
    const postData = {
      lectureId : classObj.id,
      attendanceDate : dateFormat,
    };

    const formData = new FormData();
    formData.append("createAttendanceDto", new Blob([JSON.stringify(postData)], {type: "application/json"}));
    formData.append("lectureImage", Images[0])

    const requestOptions = {
      credentials: 'include',
      method: 'POST',
      body: formData,
      redirect: 'follow',
    };



    fetch(localhost, requestOptions)
      .then(response => {
        if(!response.ok){
          if (response.status === 401) {
            navigate('/Login');
          }
          else {
            throw new Error(response.json())
          }
        }
        alert('출석부가 생성되었습니다.');

      return response.json();


      })
      .then(result => {
        setAttendanceId(result);
        onhandleGet(result);
      })
      .catch((e)=>{
        alert(e.message)
      })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setShowCreate(false);
    setShowAttendance(true);
    setIsLoading(true);
    setShowSide(false);

    onhandlePost();
    
  };


  return(
    <Box sx={{marginTop: '10vh'}}>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh'}}>
      {/* component="form" noValidate onSubmit={handleSubmit} 속성 추가함 */}
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ alignItems: 'center', justifyContent: 'center'}}>

        {/* Image FileUpload */}
          <div style={inputBox} {...getRootProps()}>
            <input {...getInputProps()} />
            {
              isDragActive ?
                  <p>Drop the files here...</p> : (
                      (imageUrl != null && Images.length != 0) ? <div>
                            {/* <div style={{
                              height: '50%',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              paddingTop: '10%',
                            }}> */}
                            <div style={imageContainer}>
                              {/* <img style={{
                                width: '70%',
                                maxHeight: '20%',
                                // maxHeight: '200px',
                                borderRadius: '10px',
                                // objectFit: 'contain',
                              }} src={imageUrl}/> */}
                              <img
                                ref={imgRef}
                                style={imgStyle}
                                src={imageUrl}
                                alt="Uploaded"
                                onLoad={adjustImageSize}
                              />
                            </div>
                            <p style={{textAlign: "center", color: '#888888'}}>Drop file to edit!</p>
                          </div>
                          : <p style={{textAlign: 'center'}}>
                            <div>
                              <Button variant="contained"
                                      sx={{
                                        width: 150,
                                        borderRadius: 3.5,
                                        backgroundColor: '#000000',
                                        fontFamily: 'Inter',
                                        color: '#F4F4F4',
                                        fontWeight: 'bold',
                                        boxShadow: 'none',
                                        marginTop: '30%'
                                      }}>
                                Upload Image
                              </Button>
                              <Typography variant="subtitle2" sx={{
                                fontFamily: 'Inter',
                                color: '#000000',
                                fontWeight: 'bold',
                                marginTop: '20%'
                              }}>
                                or drop a file.
                              </Typography>
                              <Typography variant="subtitle2" sx={{
                                fontFamily: 'Inter',
                                color: '#b0b0b0'
                              }}>
                                paste image or URL
                              </Typography>
                            </div>
                          </p>
                  )
            }
          </div>

        <div style={{ textAlign: 'center' }}>
          <Typography variant="subtitle1" sx ={{fontFamily:'Inter', color:'#000000', fontWeight:'bold', marginTop: '30px'}}>
            Choose your Class Date.
          </Typography>
          <Box sx = {{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          
          <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DatePicker 
              label="Choose Class Date"  
              sx = {{ width : '200px', marginTop : '20px'}}
              value={value}
              onChange={(newValue) => setValue(newValue)}>
            </DatePicker>
          </LocalizationProvider>

          {/** Save 버튼 기능 확인 필요 */}
          <Button type="submit" variant="contained" 
            sx={{ width:150, borderRadius: 3.5, backgroundColor: '#F4F4F4', fontFamily:'Inter', color:'#000000', fontWeight:'bold', boxShadow: 'none', marginTop : '30px' }}>
            Save
          </Button>
          </Box>
        </div> 
      </Box>
    </Box>
    </Box>
  )
}

export default CreateAttendance;
