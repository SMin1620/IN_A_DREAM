import React from "react";
import LoginForm from "../components/features/LoginComponents/LoginForm";
import "../styles/LoginPage.css";

const LoginPage = () => {
  return (
    <div className="LoginForm">
      <div className="login-form">
        <LoginForm />
      </div>

      <div className="login-left-section"></div>

      <div className="login-right-section">
        <img src="" alt="" />
      </div>
    </div>
  );
};

export default LoginPage;
