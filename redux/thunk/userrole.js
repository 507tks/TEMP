import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../component/constants/defaultValues";
import { toast } from "react-toastify";

export const getAllRoles = createAsyncThunk("getAllRoles", async () => {
  try {
    const res = await axios.get(baseURL + `/userroles/getAllRoles`);
    return res.data;
  } catch (error) {
    throw error;
  }
});
export const getMyRole = createAsyncThunk("getAllRoles", async () => {
  try {
    const res = await axios.get(baseURL + `/userroles/getMyRole`);
    return res.data;
  } catch (error) {
    throw error;
  }
});

export const registerUser = createAsyncThunk("registerAdmin", async (payload) => {
  try {
    const res = await axios.post(baseURL + `/users/register`, payload);
    return res.data;
  } catch (error) {
    throw error;
  }
});

export const addRoles = createAsyncThunk("addRoles", async (roleData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${baseURL}/userRoles/addRole`, roleData);
    return response.data;
  } catch (error) {
    if (error.response) {
      return rejectWithValue({ message: "No response from the server" });
    } else {
      return rejectWithValue({ message: error.message });
    }
  }
});

export const getRoleById = createAsyncThunk("getRoleById", async (roleId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${baseURL}/userRoles/getRoleById/${roleId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});


export const updateRole = createAsyncThunk("userRoles/updateRole", async ({ roleId, roleData }, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`${baseURL}/userRoles/updateRole/${roleId}`, roleData);
    return response.data;
  } catch (error) {
    console.log(error);
    
    if (error.response) {
      return rejectWithValue({ message: "No response from the server" });
    } else {
      return rejectWithValue({ message: error.message });
    }
  }
});

export const getCollections = createAsyncThunk("getCollections", async () => {
  try {
    const res = await axios.get(baseURL + `/userroles/getCollections`);
    return res.data;
  } catch (error) {
    throw error;
  }
});


export const deleteRoleThunk = createAsyncThunk("/deleteRoleThunk", async (roleId, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${baseURL}/userroles/deleteRole/${roleId}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      return rejectWithValue({ message: "No response from the server" });
    } else {
      toast.error(error.message)
      return rejectWithValue({ message: error.message });
    }
  }
});

export const changeUserRole = createAsyncThunk("user/changeUserRole", async ({ userId, userRoleId }, { rejectWithValue }) => {
  try {   
    const response = await axios.patch(baseURL + `/users/changeUserRole/${userId}`,{userRoleId});
    return response;
  } catch (error) {
    console.log("error:",error);
    
    return rejectWithValue(error.response?.data?.message || "Failed to change user role");
  }
});