import tabReducer from "./slices/tabSlice";
import userReducer from "./slices/userSlice";
import themeReducer from "./slices/themeSlice";
import { configureStore } from "@reduxjs/toolkit";

export function makeStore() {
  return configureStore({
    reducer: {
      user: userReducer,
      theme: themeReducer,
      tab: tabReducer,
    },
  });
}

export const store = makeStore();