import { createAction, createReducer } from "@reduxjs/toolkit";
const initialState = {
  isAuthenticated: false,
};

const request = createAction("loginRequest");
const success = createAction("loginSuccess");
const fail = createAction("loginFailure");

const logoutRequest = createAction("logoutRequest");
const logoutSuccess = createAction("logoutSuccess");
const logoutFail = createAction("logoutFailure");
const clear = createAction("clearAuth");

export const loginReducer = createReducer(initialState, (builder) => {
  builder
    // Login
    .addCase(request, (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
      state.error = null;
    })
    .addCase(success, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.loginData = action.payload.admin;
      state.token = action.payload.token;
      state.error = null;
    })
    .addCase(fail, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.loginError = action.payload;
      state.error = action.payload.response.data.message;
    })
    .addCase(clear, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.token = null;
      state.error = null;
    })
    // Logout
    .addCase(logoutRequest, (state, action) => {
      state.logoutLoading = true;
    })
    .addCase(logoutSuccess, (state, action) => {
      state.isAuthenticated = false;
      state.logoutLoading = false;
    })
    .addCase(logoutFail, (state, action) => {
      state.logoutLoading = false;
      state.loginerror = true;
      state.isAuthenticated = false;
    });
});
