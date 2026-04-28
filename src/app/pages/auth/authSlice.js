import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: null,
    token: null,
    loading: false,
  },

  reducers: {
    loginRequest: (state) => {
      state.loading = true;

    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.token = action.payload.access_token;
      state.userInfo = action.payload.userInfo;
    },
    loginFailure: (state) => {
      state.loading = false;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure } =
  authSlice.actions;

export default authSlice.reducer;