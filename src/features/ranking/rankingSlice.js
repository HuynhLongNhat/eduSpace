import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRankings = createAsyncThunk(
  "ranking/fetchRankings",
  async (classId) => {
    const response = await axios.get(`/api/rankings/${classId}`);
    return response.data;
  }
);

const rankingSlice = createSlice({
  name: "ranking",
  initialState: {
    rankings: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRankings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRankings.fulfilled, (state, action) => {
        state.loading = false;
        state.rankings = action.payload;
      })
      .addCase(fetchRankings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default rankingSlice.reducer;
