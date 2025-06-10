import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
// import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import reduxStorage from "./storage";
const createSagaMiddleware = require("redux-saga").default;
const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
  key: "root",
  storage: reduxStorage,
  whitelist: ["bookMarks"],
  blacklist: [],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: false,
    }).concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);
export const persistedStore = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
