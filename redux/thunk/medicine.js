import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../component/constants/defaultValues";

export const addMedicine = createAsyncThunk("addMedicine", async (medicineData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${baseURL}/medicines/addMedicine`, medicineData);
    return response.data;
  } catch (error) {
    if (error.response) {
      return rejectWithValue({ message: "No response from the server" });
    } else {
      return rejectWithValue({ message: error.message });
    }
  }
});
export const getMedicineThunk = createAsyncThunk("medicines/fetchMedicines", async (payload, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${baseURL}/medicines/getAllMedicines`, {
      params: {
        limit: payload.limit,
        page: payload.page,
        sortBy: payload.sortBy
      }
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue("Something went wrong while fetching medicines.");
    }
  }
});
export const searchMedicinesThunk = createAsyncThunk("searchMedicine", async (payload, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${baseURL}/medicines/searchMedicine`, {
      params: {
        query: payload.query,
        limit: payload.limit,
        sortBy: payload.sortBy
      }
    });
    return response.data;
  } catch (error) {
     if (error.response) {
       return rejectWithValue({ message: "No response from the server" });
     } else {
       return rejectWithValue({ message: error.message });
     }
  }
});
export const updateMedicine = createAsyncThunk("updateMedicine", async (medicineData, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`${baseURL}/medicines/updateMedicine/${medicineData._id}`, medicineData);
    return response.data;
  } catch (error) {
    if (error.response) {
      return rejectWithValue({ message: "No response from the server" });
    } else {
      return rejectWithValue({ message: error.message });
    }
  }
});

export const updateStock = createAsyncThunk("medicineStock/updateStock", async ({ medicineId, type, quantity }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${baseURL}/medicines/updateStock/${medicineId}`, { type, quantity });
    return response.data;
  } catch (error) {
     if (error.response) {
       return rejectWithValue({ message: "No response from the server" });
     } else {
       return rejectWithValue({ message: error.message });
     }
  }
});

export const updateActiveState = createAsyncThunk("medicine/updateActiveState", async ({ medicineId, newState }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${baseURL}/medicines/updateActiveState/${medicineId}`, { newState });
    return response.data;
  } catch (error) {
     if (error.response) {
       return rejectWithValue({ message: "No response from the server" });
     } else {
       return rejectWithValue({ message: error.message });
     }
  }
});
export const deleteMedicineThunk = createAsyncThunk("medicine/deleteMedicine", async (medicineId, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${baseURL}/medicines/deleteMedicine/${medicineId}`);
    return response.data;
  } catch (error) {
     if (error.response) {
       return rejectWithValue({ message: "No response from the server" });
     } else {
       return rejectWithValue({ message: error.message });
     }
  }
});
