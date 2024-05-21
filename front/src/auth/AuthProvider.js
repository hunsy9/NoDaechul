import React, { useState, useEffect } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"; // 'true' 문자열로 저장됨
    setIsLoggedIn(loggedIn);
  }, []);

  const login = (status) => {
    localStorage.setItem("isLoggedIn", status); // 로그인 상태를 localStorage에 저장
    setIsLoggedIn(status);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
