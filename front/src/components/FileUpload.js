import React, {useState} from 'react'
import DropzoneAreaComponent from './dropzone'
import axios from 'axios'


function FileUpload(){
    const [Images, setImages] = useState([])


    const dropHander = (files) => {
        let formData = new FormData();

        const config = {
            header : {'content-type':'multipart/form-data'}
        }
        formData.append("file", files[0])
        axios.post('/api/product/image', formData, config)
            
            .then(response =>{
                if(response.data.success){
                    setImages([...Images, response.data.filePath])
                }else{
                    alert('파일 저장 실패')
                }
            })

    } 

    return(
        <div style={{display: 'flex', justifyContent:'space-between'}}>
           <DropzoneAreaComponent onDrop={dropHander}>
  
            </DropzoneAreaComponent>
        </div>
    )
}

export default FileUpload