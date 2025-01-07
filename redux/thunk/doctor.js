import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../utils/axios";
import { baseURL } from "../../component/constants/defaultValues";

export const getAppointmentCountThunk = createAsyncThunk("getAppointmentCountThunk", async (payload) => {
  try {
    const res = await axios.get(baseURL + `/doctors/getAllAppointments?doctorId=${payload.id}&date=${payload.date}`);
    return res.data;
  } catch (error) {
    throw error;
  }
});

export const appointmentRescheduleThunk = createAsyncThunk("appointmentRescheduleThunk", async (payload) => {
  try {
    const res = await axios.patch(baseURL + `/doctors/changeAppointmentStatus/${payload?.id}`, payload.data);

    return res.data;
  } catch (error) {
    throw error;
  }
});
export const getDoctorThunk = createAsyncThunk("doctorThunk", async (payload) => {
  try {
    const res = await axios.get(
      baseURL +
        `/doctors/getAllDoctors?&query=${payload.searchTerm}&page=${payload.page}&limit=${payload.limit}&sortBy=${payload.sortBy}&sortType=-1`,
    );
    return res.data.doctors;
  } catch (error) {
    throw error;
  }
});


export const OnBoardDoctorThunk = createAsyncThunk(
  "OnBoardDoctorThunk",
  async (payload) => {
    try {
      const res = await axios.post(
        baseURL + `/doctors/onboardDoctor`,payload
      );
      return res.data;
    } catch (error) {
      console.log(error);
      
      throw error;
    }
  },
);

export const updateDoctorByIdThunk = createAsyncThunk(
  "updateDoctorByIdThunk",
  async ({ doctorId, payload }) => {
    try {
      const res = await axios.patch(
        `${baseURL}/doctors/updateDoctorById/${doctorId}`,
        payload,
      );
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);
