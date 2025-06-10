// slices/jobSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface JobState {
  jobs: any[];
  loading: boolean;
  error: string | boolean;
  page: number;
  hasMore: boolean;
  isRefreshing: boolean;
}

const initialState: JobState = {
  jobs: [],
  loading: false,
  error: false,
  page: 1,
  hasMore: true,
  isRefreshing: false,
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<{ page: number }>) => {
      state.loading = true;
      state.error = false;
      state.page = action.payload.page;
    },

    setData: (state, action) => {
      state.loading = false;
      state.jobs =
        action.payload.page === 1
          ? action.payload.jobs
          : [...state.jobs, ...action.payload.jobs];
      state.hasMore = action.payload.hasMore;
      state.page = action.payload.page;
      state.isRefreshing = false;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isRefreshing = false;
    },
    refreshJobs: (state) => {
      state.isRefreshing = true;
      state.page = 1;
      state.jobs = [];
      state.hasMore = true;
    },
  },
});

export const { setLoading, setData, setError, refreshJobs } = jobSlice.actions;
export default jobSlice.reducer;
