import React, { useState } from "react";
import HostContext from "./HostContext";

const HostProvider = ({ children }) => {
  const [host, setHost] = useState('https://nodaechul.site/api/');

  return (
    <HostContext.Provider value={{ host }}>
      {children}
    </HostContext.Provider>
  );
}

export default HostProvider;
