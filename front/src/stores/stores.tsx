// store.ts
import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./reducers/LoginToken";
import userInfo from "./reducers/UserInfo";

const store = configureStore({
  reducer: {
    token: tokenReducer,
    userInfo: userInfo,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
