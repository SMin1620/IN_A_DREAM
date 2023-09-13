// store.ts
import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./reducers/LoginToken";

const store = configureStore({
  reducer: {
    token: tokenReducer,
  },
});

export default store;
