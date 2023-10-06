// tokenSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TokenState {
  token: string | null;
  isLoggedIn: boolean;
}

const initialState: TokenState = {
  token: null,
  isLoggedIn: false,
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      state.isLoggedIn = true; // 로그인 성공 시 isLoggedIn을 true로 설정
    },
    logout(state) {
      // 로그아웃 액션 추가
      state.token = null;
      state.isLoggedIn = false; // 로그아웃 시 isLoggedIn을 false로 설정
    },
  },
});

export const { setToken, logout } = tokenSlice.actions;

export default tokenSlice.reducer;
