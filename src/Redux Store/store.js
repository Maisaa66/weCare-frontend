import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import providerSlice from "./slices/providerSlice";
import userInfo from "./slices/userInfo";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { usersReducer } from "./slices/usersSlice";
// create a persisted reducer, and pass it to the store
// this will persist the state in the local storage
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userSlice,
  provider: providerSlice,
  userInfo: userInfo,
  usersReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, logger],
});

const persistor = persistStore(store);
export { store, persistor };
