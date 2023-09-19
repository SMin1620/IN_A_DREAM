import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Label from "./../../common/Label";
import Input from "./../../common/Input";
import "./SignupForm.css";
import Button2 from "./../../common/Button2";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [gender, setGender] = useState("");

  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleCheckPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckPassword(e.target.value);
  };

  const handleBirthday = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthDay(e.target.value);
  };

  const postCheck = () => {
    // API 요청
    console.log(nickname);
  };

  const postSignup = () => {
    if (password !== checkPassword) {
      Swal.fire({
        icon: "error",
        title: "비밀번호 오류",
        text: "비밀번호가 일치하지 않습니다.",
      });
    }
    // API 요청
    console.log(nickname, email, password, checkPassword, birthDay, gender);
  };

  return (
    <div>
      <Label>닉네임</Label>
      <div className="signup-form-nicknameBox">
        <Input
          width="85%"
          height="2.5rem"
          marginBottom="0"
          placeholder="Nickname"
          type="text"
          onChange={(e) => handleNickname(e)}
        />
        <button onClick={postCheck}>중복확인</button>
      </div>

      <Label>이메일</Label>
      <Input
        height="2.5rem"
        marginBottom="1rem"
        placeholder="Email"
        type="text"
        onChange={(e) => handleEmail(e)}
      />

      <Label>비밀번호</Label>
      <Input
        height="2.5rem"
        marginBottom="1rem"
        placeholder="Password"
        type="password"
        onChange={(e) => handlePassword(e)}
      />

      <Label>비밀번호확인</Label>
      <Input
        height="2.5rem"
        marginBottom="1rem"
        placeholder="Password"
        type="password"
        onChange={(e) => handleCheckPassword(e)}
      />

      <Label>생년월일</Label>
      <Input
        height="2.5rem"
        marginBottom="1rem"
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
