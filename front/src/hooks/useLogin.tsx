import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../api/services/authAPI";
import { setToken } from "../stores/reducers/LoginToken";
import useFectchAndStoreUserInfo from "../hooks/useFetchAndStoreUserInfo";
import Swal from "sweetalert2";
import axios from "axios";

const useLogin = (onLoginSuccess: () => void) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { getUserInfo } = useFectchAndStoreUserInfo();
  const dispatch = useDispatch();
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
        const refreshtoken = response.headers.refreshtoken;
        //리덕스에 저장
        dispatch(setToken(token));
        // 로컬에 저장
        localStorage.setItem("token", token);
        localStorage.setItem("refreshtoken", refreshtoken);

        // axios headers에 토큰 설정
        axios.defaults.headers.common["Authorization"] = token;
        // console.log("헤더스", response.headers);
        // console.log(axios.defaults.headers.common["Authorization"]);
        console.log("로그인에서 토큰확인!!!!!!!!!!!!!!!!!!");

        onLoginSuccess();

        // useUserInfo();
      }
      await getUserInfo();
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "로그인 실패",
        text: "로그인에 실패하였습니다. 아이디 비밀번호 확인해주세요.",
      });
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
