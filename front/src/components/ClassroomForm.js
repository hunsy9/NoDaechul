import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'

const ClassroomForm = (props) => { // props 안에는 객체안에 key값으로 onSubmit 함수가 key 값으로 들어가 있습니다.
// input에 입력한 값을 저장하기 위해서 useState를 이용해서 input 변수를 생성합니다.
  const [className, setClassName] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = e => {
    e.preventDefault()

    props.onSubmit({ //부모 컴포넌트에서 받아온 함수를 실행합니다. 그러면 인자 값이 부모 컴포넌트로 넘어갑니다. 즉, id, text 값이 넘어갑니다.
      id: Math.floor(Math.random() * 10000),
      text: className,
      password: password,
    })

    setClassName('') // 값을 초기화 합니다. <input value={input}/> 태그안의 text를 사라지게 만듭니다.
    setPassword('')
  }

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        '& .MuiButton-root': { m: 1 }
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        required
        id="class-name"
        label="Class Name"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">Create</Button>
      <Button variant="outlined" color="secondary" >Cancel</Button>
    </Box>
  )
}

export default ClassroomForm