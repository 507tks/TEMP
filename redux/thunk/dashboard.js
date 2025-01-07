import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../utils/axios";
import { baseURL } from "../../component/constants/defaultValues";

// Helper function to build the query string
const buildQuery = (option) => {
  let queryString = `option=${option.option || option}`;
  if (option.option === "custom" && option.start && option.end) {
    queryString += `&start=${option.start}&end=${option.end}`;
  }
  return queryString;
};

export const dashboardThunk = createAsyncThunk("dashboard", async (option) => {
  try {
    const query = buildQuery(option);
    const res = await axios.get(`${baseURL}/dashboard/getCardsData?${query}`);
    return res.data;
  } catch (error) {
    throw error;
  }
});

export const revenuethunk = createAsyncThunk("revenuethunk", async (option) => {
  try {
    const query = buildQuery(option);
  
    
    const res = await axios.get(
      `${baseURL}/dashboard/getRevenueAnalytics?${query}`,
    );
    return res.data.data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
});

export const AppointmentAnalyticsthunk = createAsyncThunk(
  "getAppointmentAnalytics",
  async (option) => {
    try {
      const query = buildQuery(option);
      const res = await axios.get(
        `${baseURL}/dashboard/getAppointmentAnalytics?${query}`,
      );
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);

export const AppointmentCardAnalyticsthunk = createAsyncThunk(
  "AppointmentCardAnalyticsthunk",
  async (option) => {
    try {
      const query = buildQuery(option);
      const res = await axios.get(
        `${baseURL}/dashboard/getAppointmentAnalyticsCards?${query}`,
      );
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);

export const DepartmentAnalyticsthunk = createAsyncThunk(
  "getDepartmentAnalyticsCards",
  async (option) => {
    try {
      const query = buildQuery(option);
      const res = await axios.get(
        `${baseURL}/dashboard/getDepartmentAnalyticsCards?${query}`,
      );
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);

export const PatientRegisterationThunk = createAsyncThunk(
  "PatientRegisteration",
  async (option) => {
    try {
      const query = buildQuery(option);
      const res = await axios.get(
        `${baseURL}/dashboard/getPatientRegisterationAnalytics?${query}`,
      );
      return res.data;
    } catch (error) {
      console.error("Dashboard API error:", error);
      throw error;
    }
  },
);


// In redux/thunk/dashboard.js


export const totalMessageCountThunk = createAsyncThunk(
  "messageAnalytics/getTotalMessageCount",
  async (option) => {
    try {
      const query = new URLSearchParams(option).toString(); // Build query string
     const res = await axios.get(`${baseURL}/message/getCount?${query}`);
      /*const res = await axios.get(`http://localhost:8000/message/getCount?${query}`);*/
      return res.data.data.messageCounts; // Return only the messageCounts array
    } catch (error) {
      console.error("Error fetching total message count:", error);
      throw error;
    }
  }
);