import { createAction, createReducer } from "@reduxjs/toolkit";
const initialState = {
  isAuthenticated: false,
};

const getReq = createAction("getTaskRequest");
const getSuc = createAction("getTaskSuccess");
const getFail = createAction("getTaskFailure");

const logoutRequest = createAction("logoutRequest");
const logoutSuccess = createAction("logoutSuccess");
const logoutFail = createAction("logoutFailure");
const clear = createAction("clearAuth");

export const taskReducer = createReducer(initialState, (builder) => {
  builder
    // Login
    .addCase(getReq, (state, action) => {
      state.getloading = true;
      state.error = null;
    })
    .addCase(getSuc, (state, action) => {
      state.getLoading = false;
      state.taskData = action.payload.tasks;
      state.error = null;
    })
    .addCase(getFail, (state, action) => {
      state.getLoading = false;
      state.getError = action.payload;
      state.error = action.payload.response.data.message;
    });
});
