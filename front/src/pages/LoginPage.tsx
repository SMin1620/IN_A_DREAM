import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import LoginForm from "../components/features/LoginComponents/LoginForm";
import "./styles/LoginPage.css";
import MainPageIntro from "./../components/layout/MainPageIntro";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLoginSuccess = () => {
    setIsExpanded(true);
  };

  useEffect(() => {
    if (isExpanded) {
      setTimeout(() => {
        navigate("/Main");
      }, 1000);
    }
  }, [isExpanded]);

  return (
    <div className="LoginForm">
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
