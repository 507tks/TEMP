import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../utils/axios";
import { baseURL } from "../../component/constants/defaultValues";

// Add Package
export const addPackageThunk = createAsyncThunk(
  "addPackageThunk",
  async (data) => {
    try {
      const res = await axios.post(baseURL + "/packages/addPackage", data);
      return res.data;
    } catch (error) {
      console.log("addPackageThunk", error);
      throw error;
    }
  },
);

// Get All Packages
export const getAllPackagesThunk = createAsyncThunk(
  "getAllPackagesThunk",
  async (payload) => {
    try {
      const res = await axios.get(baseURL + "/packages/getAllPackages", {
        params: {
          limit: payload.limit,
          page: payload.page,
          sortBy: payload.sortBy,
          sortType: payload.sortType,
        },
      });
      return res.data;
    } catch (error) {
      console.log("getAllPackagesThunk", error);
      throw error;
    }
  },
);

// Get Package by ID
export const getPackageByIdThunk = createAsyncThunk(
  "getPackageByIdThunk",
  async (packageId) => {
    try {
      const res = await axios.get(
        baseURL + `/packages/getPackageById/${packageId}`,
      );
      return res.data;
    } catch (error) {
      console.log("getPackageByIdThunk", error);
      throw error;
    }
  },
);

// Update Package
export const updatePackageThunk = createAsyncThunk(
  "updatePackageThunk",
  async (payload) => {
    try {
      const res = await axios.patch(
        baseURL + `/packages/updatePackage/${payload.id}`,
        payload?.data,
      );
      return res.data;
    } catch (error) {
      console.log("updatePackageThunk", error);
      throw error;
    }
  },
);

// Delete Package
export const deletePackageThunk = createAsyncThunk(
  "deletePackageThunk",
  async (payload) => {
    try {
      const res = await axios.delete(
        baseURL + `/packages/deletePackage/${payload?.packageId}`,
      );
      return res.data;
    } catch (error) {
      console.log("deletePackageThunk", error);
      throw error;
    }
  },
);


export const alotPackageToPatient = createAsyncThunk(
  "alotPackageToPatient",
  async (data) => {
    try {
      const res = await axios.post(
        baseURL + "/patientPackages/alotPackageToPatient",
        data,
      );
      return res.data;
    } catch (error) {
      console.log("alotPackageToPatient:", error);
      throw error;
    }
  },
);


export const getPatientPackages = createAsyncThunk(
  "getPatientPackages",
  async (payload) => {
    try {
      const res = await axios.get(
        baseURL + `/patientPackages/getPatientPackages/${payload.patientId}`,
        {
          params: {
            limit: payload?.limit,
            page: payload?.page,
            sortBy: payload?.sortBy,
            sortType: payload?.sortType,
          },
        },
      );
      return res.data;
    } catch (error) {
      console.log("getAllPackagesThunk", error);
      throw error;
    }
  },
);

// /sessions/: sessionId

export const updateSession = createAsyncThunk("updateSession", async (payload) => {
  try {
    const res = await axios.patch(
      baseURL + `/session/sessions/${payload.id}`,
      payload?.data,
    );
    return res.data;
  } catch (error) {
    console.log("updatePackageThunk", error);
    throw error;
  }
});

export const deleteSessionThunk = createAsyncThunk(
  "deleteSessionThunk",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `${baseURL}/session/deleteSession/${payload.sessionId}`,
      );
      return res.data;
    } catch (error) {
      console.error("Error in deleteSessionThunk:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const receivedAmountInSessionThunk = createAsyncThunk(
  "receivedAmountInSessionThunk",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `${baseURL}/sessions/receivedAmountInSession/${payload.sessionId}`,
        {
          receivedAmount: payload.receivedAmount,
        },
      );
      return res.data;
    } catch (error) {
      console.error("Error in receivedAmountInSessionThunk:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
export const markSessionStatusThunk = createAsyncThunk(
  "markSessionStatusThunk",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `${baseURL}/sessions/markSessionStatus/${payload.sessionId}`,
        {
          status: payload.status,
        },
      );
      return res.data;
    } catch (error) {
      console.error("Error in markSessionStatusThunk:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
export const rescheduleSessionThunk = createAsyncThunk(
  "rescheduleSessionThunk",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `${baseURL}/sessions/rescheduleSession/${payload.sessionId}`,
        {
          newDate: payload.newDate,
          rescheduleNextSession: payload.rescheduleNextSession,
        },
      );
      return res.data;
    } catch (error) {
      console.error("Error in rescheduleSessionThunk:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

