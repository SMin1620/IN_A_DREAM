import React, { useState } from "react";
import { userInfo } from "../api/services/authAPI";
import { useQuery } from "react-query";
import { UserInfo } from "../types/ApiType";

const useFetchAndStoreUserInfo = () => {
  const [myInfo, setMyInfo] = useState<UserInfo>();

  console.log("내정보 불러오기");

  const getUserInfo = async () => {
    try {
      const response = await userInfo();
      setMyInfo(response.data.data);
      console.log("요이따", response.data.data);
    } catch (err) {
      console.log("에러에에에에러러럴");
      console.log(err);
    }
  };
  return {
    getUserInfo,
    myInfo,
  };
};

export default useFetchAndStoreUserInfo;
