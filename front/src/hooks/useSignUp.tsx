import { useState } from "react";
import Swal from "sweetalert2";
import { createUser } from "../api/services/authAPI"; // 경로는 실제 파일 위치에 따라 변경해주세요

const useSignUp = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [gender, setGender] = useState("");

  // ...

  const postSignup = async () => {
    if (password !== checkPassword) {
      Swal.fire({
        icon: "error",
        title: "비밀번호 오류",
        text: "비밀번호가 일치하지 않습니다.",
      });
      return false; // 비밀번호 불일치 시 여기서 종료
    }

    try {
      await createUser(email, password, birthDay, gender, nickname);
      Swal.fire({
        icon: "success",
        title: "회원가입 완료",
        text: "회원가입이 성공적으로 완료되었습니다.",
      });

      return true;
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "회원가입 실패",
        text: "회원가입에 실패하였습니다. 다시 시도해주세요.",
      });

      return false;
    }
  };

  return {
    email,
    setEmail,
    nickname,
    setNickname,
    password,
    setPassword,
    checkPassword,
    setCheckPassword,
    birthDay,
    setBirthDay,
    gender,
    setGender,

    postSignup,
  };
};

export default useSignUp;
