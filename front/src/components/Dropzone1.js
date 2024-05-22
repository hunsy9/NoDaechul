import React, { useCallback } from 'react';
import {useDropzone} from 'react-dropzone';

function MyDropzone () {

    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles)
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop})

    return (
        <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
            isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drop the files here ...</p>
        }
        </div>
    )
}
// export default MyDropzone; 