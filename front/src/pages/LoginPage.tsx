import React, { useState } from "react";
import Input from "../components/common/Input";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const inputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const inputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
    <div>
      <Input placeholder="이메일" type="text" onChange={(e) => inputEmail(e)} />

      <br />

      <Input
        placeholder="패스워드"
        type="password"
        onChange={(e) => inputPassword(e)}
      />
    </div>
  );
};

export default LoginPage;
