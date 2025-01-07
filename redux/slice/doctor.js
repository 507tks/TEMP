import { createSlice } from "@reduxjs/toolkit";
import { getDoctorThunk, getAppointmentCountThunk, appointmentRescheduleThunk, OnBoardDoctorThunk } from "../thunk/doctor";
import { toast } from "react-toastify";

const initialState = {
  data: null,
  loading: false,
  error: false
};

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getDoctorThunk.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(getDoctorThunk.fulfilled, (state, action) => {
      return { ...state, doctorList: action.payload, loading: false };
    });
    builder.addCase(getDoctorThunk.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });
    
    builder.addCase(OnBoardDoctorThunk.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(OnBoardDoctorThunk.fulfilled, (state, action) => {
      toast.success("Doctor Added Successfully")
      return { ...state, doctor: action.payload, loading: false };
    });
    builder.addCase(OnBoardDoctorThunk.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    builder.addCase(getAppointmentCountThunk.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(getAppointmentCountThunk.fulfilled, (state, action) => {
      return { ...state, appointmentCount: action.payload, loading: false };
    });
    builder.addCase(getAppointmentCountThunk.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    builder.addCase(appointmentRescheduleThunk.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(appointmentRescheduleThunk.fulfilled, (state, action) => {
      toast.success("Appointment Reschedulued Successfully");
      return { ...state, appointmentQuery: action.payload, loading: false };
    });
    builder.addCase(appointmentRescheduleThunk.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });
  }
});

export default doctorSlice.reducer;
