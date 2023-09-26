import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "../../types/ApiType";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

interface UserInfoData {
  data: UserInfo | null;
}

const initialState: UserInfoData = {
  data: null,
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo(state, action) {
      state.data = action.payload;
    },
    // clearUserInfo(state) {
    //   state.data = null;
    // },
  },
});

export const { setUserInfo } = userInfoSlice.actions;

const persistConfig = {
  key: "userInfo",
  storage,
};

export default persistReducer(persistConfig, userInfoSlice.reducer);
