import { current } from "@/utils/mics";
const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  currentTab: "Month",
  selected: {
    date: current.date,
    month: current.month,
    year: current.year,
  },
};

const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    setTab: (state, action) => {
      state.currentTab = action.payload;
    },
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
  },
});

export const { setTab, setSelected } = tabSlice.actions;

export default tabSlice.reducer;
