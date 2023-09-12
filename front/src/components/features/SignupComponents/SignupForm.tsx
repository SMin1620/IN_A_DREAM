import React, { useState } from "react";
import Label from "./../../common/Label";
import Input from "./../../common/Input";
import "./SignupForm.css";
import Button2 from "./../../common/Button2";

const SignupForm = () => {
  const [gender, setGender] = useState("");

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleCheckPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleBirthday = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleGender = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const postSignup = () => {
    // API 요청
    console.log("회원가입");
  };

  return (
    <div>
      <Label>이메일</Label>
      <Input placeholder="Email" type="text" onChange={(e) => handleEmail(e)} />

      <Label>비밀번호</Label>
      <Input
        placeholder="Password"
        type="password"
        onChange={(e) => handlePassword(e)}
      />

      <Label>비밀번호확인</Label>
      <Input
        placeholder="Password"
        type="password"
        onChange={(e) => handleCheckPassword(e)}
      />

      <Label>생년월일</Label>
      <Input
        placeholder="Birthday"
        type="text"
        onChange={(e) => handleBirthday(e)}
      />

      <Label>성별</Label>
      <div className="signup-form-genderbox">
        <button
          className={gender === "male" ? "active" : "basic"}
          onClick={() => setGender("male")}
        >
          남자
        </button>

        <button
          className={gender === "female" ? "active" : "basic"}
          onClick={() => setGender("female")}
        >
          여자
        </button>
      </div>

      <Button2 onClick={postSignup}>회원가입</Button2>
    </div>
  );
};

export default SignupForm;
