// store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults
import tokenReducer from "./reducers/LoginToken";
import userInfoReducer from "./reducers/UserInfo";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["token", "userInfo"],
};

const rootReducer = combineReducers({
  token: tokenReducer,
  userInfo: userInfoReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export default { store, persistor };
