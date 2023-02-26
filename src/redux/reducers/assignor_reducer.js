import { createAction, createReducer } from "@reduxjs/toolkit";
const initialState = {
  isAuthenticated: false,
};

const getReq = createAction("getAssignorRequest");
const getSuc = createAction("getAssignorSuccess");
const getFail = createAction("getAssignorFailure");

const logoutRequest = createAction("logoutRequest");
const logoutSuccess = createAction("logoutSuccess");
const logoutFail = createAction("logoutFailure");
const clear = createAction("clearAuth");

export const assignorReducer = createReducer(initialState, (builder) => {
  builder
    // Login
    .addCase(getReq, (state, action) => {
      state.getLoading = true;
      state.error = null;
    })
    .addCase(getSuc, (state, action) => {
      state.getLoading = false;
      state.assignor = action.payload.parent;
      state.error = null;
    })
    .addCase(getFail, (state, action) => {
      state.getLoading = false;
      state.getError = action.payload;
      state.error = action.payload.response.data.message;
    });
});
