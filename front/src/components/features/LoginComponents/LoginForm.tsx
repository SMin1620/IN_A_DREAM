import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../common/Input";
import Button2 from "../../common/Button2";
import Label from "../../common/Label";
import "./LoginForm.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const getLogin = () => {
    // API 요청
    console.log(email, password);
  };

  const navigate = useNavigate();
  const handleSignup = () => {
    navigate("/Signup");
  };

  return (
    <div className="login-form-main">
      <Label>아이디</Label>
      <Input placeholder="Email" type="text" onChange={(e) => handleEmail(e)} />
      <br />
      <Label>비밀번호</Label>
      <Input
        placeholder="Password"
        type="password"
        onChange={(e) => handlePassword(e)}
      />
      <br />

      <div className="login-form-button">
        <Button2 onClick={getLogin}>로그인</Button2>
      </div>

      <div className="login-form-register">
        <p className="login-form-register-line">or</p>
        <p className="signup-btn" onClick={handleSignup}>
          회원가입
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
