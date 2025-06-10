import { combineReducers } from "@reduxjs/toolkit";
import bookmarkReducer from "./slices/bookmarksSlice";
import jobReducer from "./slices/jobSlice";
export default combineReducers({
  jobs: jobReducer,
  bookMarks: bookmarkReducer,
});
