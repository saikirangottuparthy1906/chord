import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { combineReducers } from "redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
//import authreducer from "../app/pages/auth/authSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"] // Only persist userInfo and token
};

const sagaMiddleware = createSagaMiddleware();

// Static reducers (always loaded)
const staticReducers = {};
const asyncReducers = {};
//

function buildRootReducer(asyncReds = {}) {
  const combined = { ...staticReducers, ...asyncReds };
  if (Object.keys(combined).length === 0) {
    return (state = {}) => state;
  }
  return combineReducers(combined);
}

/*
// Create reducer
function createReducer(asyncReducers) {
  return combineReducers({
    ...staticReducers,
    ...asyncReducers,
  });
}
*/
const store = configureStore({
  reducer: persistReducer(persistConfig, buildRootReducer()),
  middleware: (getDefault) =>
    getDefault({
      thunk: false,
      // Ignore redux-persist action types in serializability check
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

store.injectReducer = (key, reducer) => {
  if (asyncReducers[key]) return; // already injected — skip
  asyncReducers[key] = reducer;
  store.replaceReducer(
    persistReducer(persistConfig, buildRootReducer(asyncReducers)),
  );
};

store.injectSaga = (() => {
  const injectedSagas = new Map();
  return (key, saga) => {
    if (injectedSagas.has(key)) return;
    const task = sagaMiddleware.run(saga);
    injectedSagas.set(key, task);
  };
})();


// Registry

store.runSaga = sagaMiddleware.run;
export default store;

