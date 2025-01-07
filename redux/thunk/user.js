import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../utils/axios";
import { baseURL } from "../../component/constants/defaultValues";
import { toast } from "react-toastify";

export const getAllUsers = createAsyncThunk("getAllUsers", async (payload) => {
  try {
    const res = await axios.get(baseURL + `/users/getUserList?pageSize=${payload.pageSize}&currentPage=${payload.currentPage}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});


export const getUserDetails = createAsyncThunk("getUserDetails", async (userId) => {
  try {
    const res = await axios.get(baseURL + `/users/getUserDetail/${userId}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const getAllPermissions = createAsyncThunk("getAllPermissions", async () => {
  try {
    const res = await axios.get(baseURL + `/admin/getAllPermissions`);
    return res.data;
  } catch (error) {
    throw error;
  }
});

export const updatePermissions = createAsyncThunk("updatePermissions", async (payload) => {
  try {
    const res = await axios.patch(baseURL + `/admin/updatepermissions/` + payload._id, payload.body);
    return res.data;
  } catch (error) {
    throw error;
  }
});


export const deleteUser = createAsyncThunk(
  'deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(baseURL +`/users/deleteUser/${userId}`);
      return response.data;
    } catch (error) {
      toast.error(error.message)
      return rejectWithValue(error.response.data);
    }
  }
);