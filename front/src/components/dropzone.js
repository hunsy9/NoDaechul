import React, { useEffect } from 'react';
import useFileDrop from '@zih0/use-file-drop';

const DropzoneAreaComponent = () => {
  const { inputRef, labelRef, files, isDragActive } = useFileDrop();

  return (
    <div>
      <input ref={inputRef} id="upload" />
      <label ref={labelRef} htmlFor="upload">
        {isDragActive ? <span>Drop the file!</span> : <span>Drag and drop the file.</span>}
      </label>
    </div>
  );
};
export default DropzoneAreaComponent; 

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
