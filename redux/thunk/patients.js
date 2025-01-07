import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../utils/axios";
import { baseURL } from "../../component/constants/defaultValues";
import { toast } from "react-toastify";

export const getPatientThunk = createAsyncThunk(
  "patientThunk",
  async (payload) => {
    try {
      const res = await axios.get(
        baseURL +
          `/patients/getAllPatients?pageSize=${payload.pageSize}&sortBy=${payload?.sortBy}&sortType=${payload.sortType}&pageIndex=${payload.pageIndex}${payload.searchValue ? "&query=" + payload.searchValue : ""}`,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
);

export const getPatientById = createAsyncThunk(
  "getPatientById",
  async (payload) => {
    try {
      const res = await axios.get(
        baseURL + `/patients/getPatientById/${payload?.patientId}`,
      );
      return res.data.patient;
    } catch (error) {
      console.log(error);

      throw error;
    }
  },
);

export const getAppointmentTypeThunk = createAsyncThunk(
  "appointmentTypeThunk",
  async () => {
    try {
      const res = await axios.get(baseURL + `/departments/getAllDepartment`);
      return res.data.departments;
    } catch (error) {
      throw error;
    }
  },
);

export const addPatientThunk = createAsyncThunk(
  "addPAtientThunk",
  async (payload) => {
    try {
      const res = await axios.post(baseURL + "/patients/addPatient", payload);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
);

export const updatePatientThunk = createAsyncThunk(
  "updatePatientThunk",
  async (payload) => {
    try {
      const res = await axios.patch(
        baseURL + `/patients/updatePatient/${payload?.id}`,
        payload.data,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
);

export const deletePatientThunk = createAsyncThunk(
  "deletePatientThunk",
  async (payload) => {
    try {
      const res = await axios.patch(
        baseURL + `/patients/deletePatient/${payload}`,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
);

export const scheduleAppointmentThunk = createAsyncThunk(
  "scheduleAppointmentThunk",
  async (payload) => {
    try {
      const res = await axios.post(
        baseURL + "/appointments/scheduleAppointment",
        payload,
      );
      return res.data;
    } catch (error) {
      console.log(error);

      throw error;
    }
  },
);

export const getPatientAppoinment = createAsyncThunk(
  "getPatientAppoinment",
  async (id) => {
    try {
      const res = await axios.get(baseURL + `/appointments/getByPatient/${id}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
);

export const uploadPatientDoc = createAsyncThunk(
  "uploadPatientDoc",
  async (payload) => {
    try {
      const res = await axios.post(
        baseURL + `/patients/uploadDocument/${payload.id}`,
        payload.data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
);

export const deleteDocumentThunk = createAsyncThunk(
  "deleteDocumentThunk",
  async (payload) => {
    try {
      const res = await axios.post(baseURL + `/patients/deleteDoc`, payload);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
);

export const deleteMultipleFileThunk = createAsyncThunk(
  "deleteMultipleFileThunk",
  async (payload) => {
    try {
      const res = await axios.post(
        baseURL + "/patients/deleteMultipleDocs",
        payload,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
);

export const getPrescriptionsByPatientId = createAsyncThunk(
  "getPrescriptionsByPatientId",
  async (id) => {
    try {
      const res = await axios.get(
        baseURL + `/prescription/getPrescriptionsByPatientId/:${id}`,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
);

export const addPrescriptionThunk = createAsyncThunk(
  "prescription/addPrescription",
  async (prescriptionData) => {
    try {
      const res = await axios.post(
        baseURL + "/prescription/addPrescription",
        prescriptionData,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
);

export const getPrescriptionsByPatientIdThunk = createAsyncThunk(
  "prescription/getPrescriptionsByPatientId",
  async (patientId) => {
    try {
      const res = await axios.get(
        `${baseURL}/prescription/getPrescriptionsByPatientId/${patientId}`,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
);

export const getPrescriptionThunk = createAsyncThunk(
  "prescription/getPrescription",
  async (prescriptionId) => {
    try {
      const res = await axios.get(
        `${baseURL}/prescription/getPrescription/${prescriptionId}`,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
);

export const generatePrescriptionPdfThunk = createAsyncThunk(
  "prescription/generatePrescriptionPdf",
  async (prescriptionId) => {
    try {
      const res = await axios.get(
        `${baseURL}/prescription/generatePrescriptionPdf/${prescriptionId}`,
      );
      toast.success("Prescription Generated Successfully")
      return res.data;
    } catch (error) {
      throw error;
    }
  },
);

export const sendPatientPrescriptionThunk = createAsyncThunk(
  "prescription/sendPrescription",
  async (prescriptionId) => {
    try {
      const res = await axios.get(
        `${baseURL}/prescription/sendPrescription/${prescriptionId}`,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
);

export const getPatientPreviousPrescription = createAsyncThunk(
  "getLastPrescriptionByPatientId",
  async (payload) => {
    try {
      const res = await axios.get(
        baseURL +
          `/prescription/getLastPrescriptionByPatientId/${payload.patientId}`,
      );

      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);

export const getPatientPrescriptionsHistory = createAsyncThunk(
  "getPrescriptionsByPatientId",
  async (payload) => {
    try {
      const res = await axios.get(
        baseURL +
          `/prescription/getPrescriptionsByPatientId/${payload}`,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
);