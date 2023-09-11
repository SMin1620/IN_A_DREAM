import React, { useState } from "react";
import Input from "../../common/Input";
import Button from "../../common/Button";
import Label from "../../common/Label";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div>
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
      <Button>로그인</Button>
    </div>
  );
};

export default LoginForm;
