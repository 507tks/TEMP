import { createSlice } from "@reduxjs/toolkit";
import { addRoles, changeUserRole, deleteRoleThunk, getAllRoles, getCollections, getRoleById, updateRole } from "../thunk/userrole";
import { toast } from "react-toastify";

const initialState = {
  data: null,
  loading: false,
  error: false
};

const userRolesSlice = createSlice({
  name: "userroles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllRoles.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(getAllRoles.fulfilled, (state, action) => {
      return { ...state, allRoles: action.payload.roles,totalRoles:action.payload.totalRoles, loading: false };
    });
    builder.addCase(getAllRoles.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    builder.addCase(addRoles.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(addRoles.fulfilled, (state, action) => {
      toast.success("Role added successfully");
      return { ...state, addedRole: action.payload, loading: false };
    });
    builder.addCase(addRoles.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    builder.addCase(getRoleById.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(getRoleById.fulfilled, (state, action) => {
      return { ...state, userRole: action.payload, loading: false };
    });
    builder.addCase(getRoleById.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    builder.addCase(updateRole.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(updateRole.fulfilled, (state, action) => {
      toast.success("Role Updated successfully");
      return { ...state, updatedRole: action.payload, loading: false };
    });
    builder.addCase(updateRole.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    builder.addCase(getCollections.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(getCollections.fulfilled, (state, action) => {
      return { ...state, collections: action.payload, loading: false };
    });
    builder.addCase(getCollections.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    builder.addCase(deleteRoleThunk.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(deleteRoleThunk.fulfilled, (state, action) => {
      toast.success("Role Deleted Successfully");
      return { ...state, deletedRole: action.payload, loading: false };
    });
    builder.addCase(deleteRoleThunk.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    builder.addCase(changeUserRole.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(changeUserRole.fulfilled, (state, action) => {
      toast.success("User role updated successfully!");
      return { ...state, changedUserRole: action.payload, loading: false };
    });
    builder.addCase(changeUserRole.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });
  }
});

export default userRolesSlice.reducer;
