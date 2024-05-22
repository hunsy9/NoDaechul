// import React, { useEffect } from 'react';
// import useFileDrop from '@zih0/use-file-drop';

// const DropzoneAreaComponent = () => {
//   const { inputRef, labelRef, files, isDragActive } = useFileDrop();

//   return (
//     <div>
//       <input ref={inputRef} id="upload" />
//       <label ref={labelRef} htmlFor="upload">
//         {isDragActive ? <span>Drop the file!</span> : <span>Drag and drop the file.</span>}
//       </label>
//     </div>
//   );
// };
// export default DropzoneAreaComponent; 

// import React from 'react';
// import useFileDrop from '@zih0/use-file-drop';

// const DropzoneAreaComponent = () => {
//   const { inputRef, labelRef, files, isDragActive } = useFileDrop();

//   return (
//     <div>
//       <input ref={inputRef} id="upload" />
//       <label ref={labelRef} htmlFor="upload">
//         {isDragActive ? <span>Drop the file!</span> : <span>Drag and drop the file.</span>}
//       </label>
//     </div>
//   );
// };

// export default DropzoneAreaComponent;

import React, { useCallback } from 'react';
import {useDropzone} from 'react-dropzone';

const MyDropzone = () => {

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
export default MyDropzone; 
