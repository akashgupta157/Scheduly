import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuthenticated: !!localStorage.getItem("user"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LOGIN: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    LOGOUT: (state) => {
      localStorage.removeItem("user");
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { LOGIN, LOGOUT } = userSlice.actions;
export default userSlice.reducer;
