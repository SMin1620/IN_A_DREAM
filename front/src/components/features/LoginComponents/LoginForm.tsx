import React from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../common/Input";
import Button2 from "../../common/Button2";
import Label from "../../common/Label";
import "./LoginForm.css";
import LogoImg from "../../common/LogoBlack";
import logoImg from "../../../assets/logo/IN A DREAM Black.png";
import useLogin from "../../../hooks/useLogin";

interface LoginFormProps {
  onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const { handleEmailChange, handlePasswordChange, postLogin } =
    useLogin(onLoginSuccess);

  const navigate = useNavigate();
  const handleSignup = () => {
    navigate("/Signup");
  };

  const handleLogin = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      postLogin();
    }
  };

  return (
    <div className="login-form-main">
      <div className="login-form-logo">
        <LogoImg src={logoImg} />
      </div>

      <Label>이메일</Label>
      <Input placeholder="Email" type="text" onChange={handleEmailChange} />
      <br />
      <Label>비밀번호</Label>
      <Input
        placeholder="Password"
        type="password"
        onChange={handlePasswordChange}
        onKeyUp={handleLogin}
      />
      <br />

      <div className="login-form-button">
        <Button2 onClick={postLogin}>로그인</Button2>
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
