import { createSlice } from "@reduxjs/toolkit";
import {
  AppointmentAnalyticsthunk,
  AppointmentCardAnalyticsthunk,
  dashboardThunk,
  DepartmentAnalyticsthunk,
  PatientRegisterationThunk,
  revenuethunk,

  totalMessageCountThunk // Importing the totalMessageCountThunk
} from "../thunk/dashboard";

const initialState = {
  dashboardData: null,
  revenueData: null,
  PatientRegisterationData: null,
  appointmentsData: null,
  cardData: null,
  departmentData: null,
  totalMessageCounts: [], // Adding state for total message count
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  extraReducers: (builder) => {
    builder
      // Dashboard data
      .addCase(dashboardThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(dashboardThunk.fulfilled, (state, action) => {
        state.dashboardData = action.payload;
        state.loading = false;
      })
      .addCase(dashboardThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Unknown error";
      })

      // Total Message Count
      .addCase(totalMessageCountThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(totalMessageCountThunk.fulfilled, (state, action) => {
        state.totalMessageCounts = action.payload; // Store the total message counts array
        state.loading = false;
      })
      .addCase(totalMessageCountThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Unknown error";
      })

      // Revenue data
      .addCase(revenuethunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(revenuethunk.fulfilled, (state, action) => {
        state.revenueData = action.payload;
        state.loading = false;
      })
      .addCase(revenuethunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Unknown error";
      })

      // Patient registration data
      .addCase(PatientRegisterationThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(PatientRegisterationThunk.fulfilled, (state, action) => {
        state.PatientRegisterationData = action.payload;
        state.loading = false;
      })
      .addCase(PatientRegisterationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Unknown error";
      })

      // Appointments data
      .addCase(AppointmentAnalyticsthunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(AppointmentAnalyticsthunk.fulfilled, (state, action) => {
        state.appointmentsData = action.payload;
        state.loading = false;
      })
      .addCase(AppointmentAnalyticsthunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Unknown error";
      })

      .addCase(AppointmentCardAnalyticsthunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(AppointmentCardAnalyticsthunk.fulfilled, (state, action) => {
        state.cardData = action.payload;
        state.loading = false;
      })
      .addCase(AppointmentCardAnalyticsthunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Unknown error";
      })

      // Department data
      .addCase(DepartmentAnalyticsthunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(DepartmentAnalyticsthunk.fulfilled, (state, action) => {
        state.departmentData = action.payload;
        state.loading = false;
      })
      .addCase(DepartmentAnalyticsthunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Unknown error";
      });
  },
});

export default dashboardSlice.reducer;
