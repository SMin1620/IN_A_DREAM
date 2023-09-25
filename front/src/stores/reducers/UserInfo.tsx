import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "../../types/ApiType";

const initialState = {
  data: null,
};
// interface UserInfoState {
//   data: UserInfo;
// }

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo(state, action) {
      state.data = action.payload;
    },
    clearUserInfo(state) {
      state.data = null;
    },
  },
});

export const { setUserInfo, clearUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
