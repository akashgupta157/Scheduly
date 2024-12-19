import { configure } from "@/utils/mics";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const axios = require("axios");

const initialState = {
  events: [],
  isLoading: false,
  error: null,
};

export const fetchEvents = createAsyncThunk(
  "eventList/fetchEvents",
  async (token, thunkAPI) => {
    try {
      const config = configure(token);
      const response = await axios.get("/api/event", config);
      return response.data.events;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const eventSlice = createSlice({
  name: "eventList",
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setEvents } = eventSlice.actions;
export default eventSlice.reducer;
