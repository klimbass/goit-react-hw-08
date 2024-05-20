import { createSlice } from "@reduxjs/toolkit";
import { login, logout, refreshUser, register } from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      name: null,
      email: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshitoastSuccessng: false,
    toastError: false,
    toastSuccess: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state, action) => {
        state.isLoggedIn = false;
        state.toastError = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.toastError = false;
        state.toastSuccess = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.toastError = true;
      })
      .addCase(login.pending, (state, action) => {
        state.isLoggedIn = false;
        state.toastError = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.toastError = false;
        state.toastSuccess = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.toastError = true;
      })
      .addCase(logout.pending, (state, action) => {
        state.toastError = false;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = {
          name: null,
          email: null,
        };
        state.token = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
        state.toastError = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.toastError = true;
      })
      .addCase(refreshUser.pending, (state, action) => {
        state.isLoggedIn = false;
        state.isRefreshing = true;
        state.toastError = false;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user.email = action.payload.email;
        state.user.name = action.payload.name;

        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.toastError = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.toastError = true;
      });
  },
});

export const authReducer = authSlice.reducer;
