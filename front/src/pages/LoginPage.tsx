import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import LoginForm from "../components/features/LoginComponents/LoginForm";
import "./styles/LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsExpanded(true);
  };

  useEffect(() => {
    setFadeIn(true); // 컴포넌트가 마운트될 때 fadeIn 애니메이션 시작
    if (isExpanded) {
      setTimeout(() => {
        navigate("/Main");
      }, 1000);
    }
  }, [isExpanded]);

  return (
    <div className={`LoginForm ${fadeIn ? "fadeIn" : ""}`}>
      {isExpanded ? (
        <div></div>
      ) : (
        <div className="login-form">
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        </div>
      )}

      <div
        className={`login-left-section ${isExpanded ? "expanded" : ""}`}
      ></div>

      <div
        className={`login-right-section ${isExpanded ? "expanded" : ""}`}
      ></div>
    </div>
  );
};

export default LoginPage;
