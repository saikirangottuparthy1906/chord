import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import { loginSuccess, loginFailure } from "./authSlice";

function loginApi(data) {
  return axios({
    method: 'post',
    url: 'http://localhost:8000/login',
    headers: { 
      'Content-Type': 'application/json' 
    },
    data: JSON.stringify(data) // This puts data in the body
  });
  
}

function* loginWorker(action) {
  try {
    const res = yield call(loginApi, action.payload);
    yield put(loginSuccess(res.data));
    localStorage.setItem("token", res.data.access_token);
    
  } catch (e) {
    yield put(loginFailure());
  }
}

export default function* authSaga() {
  yield takeLatest("auth/loginRequest", loginWorker);
}