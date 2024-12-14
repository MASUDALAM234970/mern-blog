import { configureStore } from "@reduxjs/toolkit";
import userReducer from "/src/redux/user/userSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
