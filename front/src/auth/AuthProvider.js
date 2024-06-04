import React, { useState, useEffect } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);  // 로딩 상태 추가

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    setIsLoading(false);  // 로딩 완료
  }, []);

  const login = (status) => {
    localStorage.setItem("isLoggedIn", status); // 로그인 상태를 localStorage에 저장
    setIsLoggedIn(status);
  };

  const logout = () => {
    localStorage.setItem("isLoggedIn", false); // 로그인 상태를 localStorage에 저장
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
