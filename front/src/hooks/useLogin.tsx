import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/services/authAPI"; // 경로는 실제 파일 위치에 따라 변경해주세요
import { setToken } from "../stores/reducers/LoginToken";
import axios from "axios";

const useLogin = (onLoginSuccess: () => void) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const postLogin = async () => {
    try {
      // API 요청
      const response = await loginUser(email, password);
      if (response.headers.authorization) {
        const token = response.headers.authorization;
        //리덕스에 저잦ㅇ
        dispatch(setToken(token));
        // 로컬에 저장
        localStorage.setItem("token", token);

        // axios headers에 토큰 설정
        axios.defaults.headers.common["Authorization"] = token;
        console.log(axios.defaults.headers.common["Authorization"]);
        console.log("로그인에서 토큰확인!!!!!!!!!!!!!!!!!!");

        onLoginSuccess();
      }
    } catch (error) {
      console.error(error);
      // 에러 처리 로직 추가 필요.
    }

    return false;
  };

  return {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    postLogin,
  };
};

export default useLogin;
