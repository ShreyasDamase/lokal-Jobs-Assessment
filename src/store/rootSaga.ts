import { all } from "redux-saga/effects";
import jobSaga from "./sagas/jobSaga";
export default function* rootSaga() {
  yield all([jobSaga()]);
}
