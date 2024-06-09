import React, { useState } from "react";
import HostContext from "./HostContext";

const HostProvider = ({ children }) => {
  const [host, setHost] = useState('http://localhost:5555/api/');

  return (
    <HostContext.Provider value={{ host }}>
      {children}
    </HostContext.Provider>
  );
}

export default HostProvider;
