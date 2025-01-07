import { createSlice } from "@reduxjs/toolkit";
import { forgotPasswordThunk, getPermissionsThunk, loginThunk, resetPasswordThunk, verifyToken, regenerateAuthTokenThunk } from "../thunk/login";

const initialState = {
  data: null,
  loading: false,
  error: false,
  authenticated: localStorage.getItem("token") ? true : false,
  userPermissions: { data: [] }
};

const loginSlice = createSlice({
  name: "Login",
  initialState,
  reducers: {
    clearLoginData(state) {
      state.data = null;
      state.loading = false;
      state.error = false;
      state.authenticated = localStorage.getItem("token") ? true : false;
      state.userPermissions = { data: [] };
      state.loginData = null;
    },
    authenticationHandler(state, action) {
      state.authenticated = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      localStorage.setItem("hospitalId", action.payload?.result?.hospitalId);
      localStorage.setItem("token", action.payload?.result?.token);
      localStorage.setItem("userId", action.payload?.result?.userId);
      localStorage.setItem("userName", action.payload?.result?.userName);
      localStorage.setItem("userRoleId", action.payload?.result?.userRoleId);
      return { ...state, loginData: action.payload, authenticated: true, loading: false };
    });
    builder.addCase(loginThunk.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });
    
    builder.addCase(regenerateAuthTokenThunk.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(regenerateAuthTokenThunk.fulfilled, (state, action) => {
      localStorage.setItem("token", action.payload?.token);
      return { ...state, authenticated: true, loading: false };
    });
    builder.addCase(regenerateAuthTokenThunk.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    builder.addCase(forgotPasswordThunk.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(forgotPasswordThunk.fulfilled, (state, action) => {
      return { ...state, forgotPassword: action.payload, loading: false };
    });
    builder.addCase(forgotPasswordThunk.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    builder.addCase(resetPasswordThunk.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(resetPasswordThunk.fulfilled, (state, action) => {
      return { ...state, resetPassword: action.payload, loading: false };
    });
    builder.addCase(resetPasswordThunk.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    builder.addCase(getPermissionsThunk.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(getPermissionsThunk.fulfilled, (state, action) => {
      return { ...state, userPermissions: action.payload, loading: false };
    });
    builder.addCase(getPermissionsThunk.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    builder.addCase(verifyToken.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(verifyToken.fulfilled, (state, action) => {
      return { ...state, authenticated: true, loading: false };
    });
    builder.addCase(verifyToken.rejected, (state) => {
      return { ...state, authenticated: false, error: "Something went wrong" };
    });

  }
});

export const { clearLoginData, authenticationHandler } = loginSlice.actions;
export default loginSlice.reducer;
