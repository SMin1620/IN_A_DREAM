import React, { useState } from "react";
import { userInfo } from "../api/services/authAPI";
import { UserInfo } from "../types/ApiType";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../stores/reducers/UserInfo";

const useFetchAndStoreUserInfo = () => {
  // const [myInfo, setMyInfo] = useState<UserInfo>();
  const dispatch = useDispatch();

  const getUserInfo = async () => {
    try {
      const response = await userInfo();
      console.log("iswrite", response.data.data);
      dispatch(setUserInfo(response.data.data));
      // setMyInfo(response.data.data);
      return response.data.data;
    } catch (err) {
      console.log(err);
    }
  };
  return {
    getUserInfo,
    // myInfo,
  };
};

export default useFetchAndStoreUserInfo;
