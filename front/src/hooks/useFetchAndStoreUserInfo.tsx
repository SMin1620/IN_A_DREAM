import React, { useState } from "react";
import { userInfo } from "../api/services/authAPI";
import { UserInfo } from "../types/ApiType";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../stores/reducers/UserInfo";

const useFetchAndStoreUserInfo = () => {
  // const [myInfo, setMyInfo] = useState<UserInfo>();
  const dispatch = useDispatch();

  console.log("내정보 불러오기");

  const getUserInfo = async () => {
    try {
      const response = await userInfo();
      dispatch(setUserInfo(response.data.data));
      // setMyInfo(response.data.data);
      console.log("요이따", response.data.data);
    } catch (err) {
      console.log("에러에에에에러러럴");
      console.log(err);
    }
  };
  return {
    getUserInfo,
    // myInfo,
  };
};

export default useFetchAndStoreUserInfo;
