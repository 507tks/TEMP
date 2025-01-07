import { createSlice } from "@reduxjs/toolkit";
import { deleteUser, getAllPermissions, getAllUsers, getUserDetails } from "../thunk/user";
import { toast } from "react-toastify";

const initialState = {
  data: null,
  loading: false,
  error: false
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      return { ...state, allUsers: action.payload, loading: false };
    });
    builder.addCase(getAllUsers.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    builder.addCase(getAllPermissions.pending, (state) => {
      return { ...state };
    });
    builder.addCase(getAllPermissions.fulfilled, (state, action) => {
      return { ...state, allPermissions: action.payload?.data };
    });
    builder.addCase(getAllPermissions.rejected, (state) => {
      return { ...state, error: "Something went wrong" };
    });

    builder.addCase(getUserDetails.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      return { ...state, userDetails: action.payload?.users, loading: false };
    });
    builder.addCase(getUserDetails.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

     builder.addCase(deleteUser.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      toast.success("User Deleted Successfully")
      return { ...state, user: action.payload?.users, loading: false };
    });
    builder.addCase(deleteUser.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });
    
  }
});

export default userSlice.reducer;
