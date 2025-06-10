import { call, put, takeLatest } from "redux-saga/effects";
import { fetchJobs } from "../api/api";
import { setData, setError } from "../slices/jobSlice";
function* loadJobsSaga(action: any): any {
  try {
    console.log("⏳ saga triggered with:", action);

    const { page } = action.payload || { page: 1 };
    const data = yield call(fetchJobs, page);
    // yield put(setData(data));
    yield put(setData({ jobs: data.jobs, hasMore: data.hasMore, page }));
  } catch (error) {
    yield put(setError(error));
  }
}

function* refreshJobsSaga(): any {
  try {
    const data = yield call(fetchJobs, 1);
    yield put(setData(data));
  } catch (error) {
    yield put(setError(error));
  }
}

export default function* jobSaga() {
  yield takeLatest("jobs/setLoading", loadJobsSaga);
  yield takeLatest("jobs/refreshJobs", refreshJobsSaga);
}
