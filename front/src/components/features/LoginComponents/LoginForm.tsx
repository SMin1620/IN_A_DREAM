import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../../common/Input";
import Button2 from "../../common/Button2";
import Label from "../../common/Label";
import "./LoginForm.css";
import { setToken } from "../../../stores/reducers/LoginToken";
import LogoImg from "../../common/LogoBlack";
import logoImg from "../../../assets/logo/IN A DREAM Black.png";

interface LoginFormProps {
  onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const dispatch = useDispatch();

  const postLogin = () => {
    // API 요청
    const responseToken = "토큰값";
    dispatch(setToken(responseToken));
    console.log(email, password);
    onLoginSuccess();
  };

  const navigate = useNavigate();
  const handleSignup = () => {
    navigate("/Signup");
  };

  return (
    <div className="login-form-main">
      <div className="login-form-logo">
        <LogoImg src={logoImg} />
      </div>

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
