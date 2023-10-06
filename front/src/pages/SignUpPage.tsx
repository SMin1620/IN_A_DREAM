import React from "react";
import SignupForm from "../components/features/SignupComponents/SignupForm";
import "./styles/LoginPage.css";

const SignUpPage = () => {
  return (
    <div className="LoginForm">
      <div className="login-form">
        <SignupForm />
      </div>

      <div className="login-left-section"></div>

      <div className="login-right-section">
        <img src="" alt="" />
      </div>
    </div>
  );
};

export default SignUpPage;
