import { baseURL } from "@/component/constants/defaultValues";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMyHospitalData = createAsyncThunk("getMyHospitalData", async () => {
    try {
        const response = await axios.get(`${baseURL}/hospitals/getMyHospitalData`)
        return response.data
    } catch (error) {
        throw error
    }
})

export const UpdateHospitalData = createAsyncThunk(
  "UpdateHospitalData",
  async (formData) => {
    try {
      const response = await axios.patch(
        `${baseURL}/hospitals/editMyHospitalData`,
        formData,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);