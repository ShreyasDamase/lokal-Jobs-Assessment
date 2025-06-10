// slices/jobSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface bookmarkState {
  bookmarks: any[];
}

const initialState: bookmarkState = {
  bookmarks: [],
};

const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    addBookmark: (state, action: PayloadAction<any>) => {
      const exist = state.bookmarks.some((job) => job.id === action.payload.id);
      if (!exist) state.bookmarks.push(action.payload);
    },
    removeBookmark: (state, action: PayloadAction<any>) => {
      state.bookmarks = state.bookmarks.filter(
        (job) => job.id !== action.payload
      );
    },
  },
});

export const { addBookmark, removeBookmark } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
