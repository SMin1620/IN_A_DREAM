import React, { useState } from "react";
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

  return (
    <div className="login-form-main">
      <Label marginBottom="2rem" fontSize="1.5rem" fontWeight="500">
        아이디
      </Label>
      <br />
      <Input
        backgroundColor="white"
        width="100%"
        height="3rem"
        border="1px solid black"
        marginBottom="2rem"
        placeholder="Email"
        type="text"
        onChange={(e) => handleEmail(e)}
      />
      <br />
      <Label marginBottom="2rem" fontSize="1.5rem" fontWeight="500">
        비밀번호
      </Label>
      <br />
      <Input
        backgroundColor="white"
        width="100%"
        height="3rem"
        border="1px solid black"
        marginBottom="2rem"
        placeholder="Password"
        type="password"
        onChange={(e) => handlePassword(e)}
      />
      <br />

      <div className="login-form-button">
        <Button2
          width="100%"
          height="4rem"
          backgroundColor="black"
          border="1px solid black"
          color="white"
          onClick={getLogin}
        >
          로그인
        </Button2>
      </div>

      <div className="login-form-register">
        <p className="login-form-register-line">or</p>
        <p>회원가입</p>
      </div>
    </div>
  );
};

export default LoginForm;
