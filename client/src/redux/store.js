import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "/src/redux/user/userSlice.js";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import themeReducer from "./theme/themeSlice";

// Combine all reducers
const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
});

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

// Wrap the root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create the persistor
export const persistor = persistStore(store);
