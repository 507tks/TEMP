import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../utils/axios";
import { baseURL } from "../../component/constants/defaultValues";

export const appointmentThunk = createAsyncThunk(
  "appointmentThunk",
  async (payload) => {
    try {
      const res = await axios.get(
        baseURL +
          `/appointments/getAllAppointment?status=${payload.status}&date=${payload.date}&search=${payload.search}&pageSize=${payload.pageSize}&pageIndex=${payload.pageIndex}&sortBy=${payload.sortBy}&sortType=${payload.sortType}`,
      );
      return res.data;
    } catch (error) {
      console.log(error);

      throw error;
    }
  },
);

export const prescriptionThunk = createAsyncThunk(
  "prescriptionThunk",
  async (payload) => {
    try {
      const res = await axios.put(
        baseURL +
        `/appointments/addPrescription?markAsCompleted=${payload.markAsCompleted ? true : false}`,
        payload,
      );

      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);

export const getPrescriptionHistoryByAppointmentIdThunk = createAsyncThunk(
  "prescriptionHistoryByAppointmentIdThunk",
  async (id) => {
    try {
      const res = await axios.get(
        baseURL +
        `/prescription/getPrescriptionsByAppointmentId/${id}`
      );

      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);

export const notesThunk = createAsyncThunk("notesThunk", async (payload) => {
  try {
    const res = await axios.post(baseURL + "/appointments/addNotes", payload);
    return res.data;
  } catch (error) {
    throw error;
  }
});

export const rescheduleAppointmentThunk = createAsyncThunk(
  "rescheduleAppointmentThunk",
  async (payload) => {
    try {
      const res = await axios.patch(
        baseURL + "/appointments/rescheduleAppointment/" + payload.id,
        { date: payload.date, time: payload.time },
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
);

export const cancelAppointmentThunk = createAsyncThunk(
  "cancelAppointmentThunk",
  async (id) => {
    try {
      const res = await axios.patch(
        baseURL + "/appointments/cancelAppointment/" + id,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
);

export const viewPrescriptionThunk = createAsyncThunk(
  "viewPrescriptionThunk",
  async (id) => {
    try {
      const res = await axios.get(
        baseURL + `/appointments/viewPrescription?id=${id}`,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
);

export const downloadPrescriptionPdf = createAsyncThunk(
  "downloadPrescriptionPdf",
  async (id) => {
    try {
      const res = await axios.get(
        baseURL + `/appointments/generatePdf?appointmentID=${id}`,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
);

export const sendPrescriptionThunk = createAsyncThunk(
  "sendPrescription",
  async (id) => {
    try {
      const res = await axios.post(
        baseURL + `/appointments/sendPrescription/` + id,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
);

export const getSingleAppointment = createAsyncThunk(
  "getSingleAppointment",
  async (id) => {
    try {
      const res = await axios.get(
        baseURL + `/appointments/getSingleAppointment?appointmentId=${id}`,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
);



export const getMedicineThunk = createAsyncThunk(
  "getMedicineThunk",
  async (payload) => {
    try {
      const res = await axios.get(
        baseURL + `/medicines/searchMedicinesInDataset`,
        {
          params: {
            query: payload.query,
            limit: payload?.limit,
          },
        },
      );

      return res.data;
    } catch (error) {
      console.log(error);

      throw error;
    }
  },
);

export const completeAppointmentthunk = createAsyncThunk(
  "completeAppointmentthunk",
  async (id) => {
    try {
      const res = await axios.patch(
        baseURL + `/appointments/completeAppointment/` + id,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
);
export const absentAppointmentthunk = createAsyncThunk(
  "absentAppointmentthunk",
  async (id) => {
    try {
      const res = await axios.patch(
        baseURL + `/appointments/absentAppointment/` + id,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
);

export const getRemarksThunk = createAsyncThunk(
  "getRemarksThunk",
  async (remarks) => {
    try {
      const res = await axios.get(
        baseURL + `/remarks/getremarks?type=${remarks}`,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
);

export const getDiagnosisThunk = createAsyncThunk(
  "getDiagnosisThunk",
  async (payload) => {
    try {
      const res = await axios.get(baseURL + `/dataset/searchDiagnoses`, {
        params: {
          query: payload.query,
          limit: payload?.limit,
        },
      });

      return res.data;
    } catch (error) {
      console.log(error);

      throw error;
    }
  },
);

export const getComplaintsThunk = createAsyncThunk(
  "searchComplaints",
  async (payload) => {
    try {
      const res = await axios.get(baseURL + `/dataset/searchComplaints`, {
        params: {
          query: payload.query,
          limit: payload?.limit,
        },
      });

      return res.data;
    } catch (error) {
      console.log(error);

      throw error;
    }
  },
);

export const getAdviceThunk = createAsyncThunk(
  "searchAdvices",
  async (payload) => {
    try {
      const res = await axios.get(baseURL + `/dataset/searchAdvices`, {
        params: {
          query: payload.query,
          limit: payload?.limit,
        },
      });

      return res.data;
    } catch (error) {
      console.log(error);

      throw error;
    }
  },
);
export const getTestThunk = createAsyncThunk("searchTests", async (payload) => {
  try {
    const res = await axios.get(baseURL + `/dataset/searchTests`, {
      params: {
        query: payload.query,
        limit: payload?.limit,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
});

export const getTestsThunk = createAsyncThunk(
  "searchTests",
  async (payload) => {
    try {
      const res = await axios.get(baseURL + `/dataset/searchTests`, {
        params: {
          query: payload.query,
          limit: payload?.limit,
        },
      });

      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);

export const addMedicinesTemplate = createAsyncThunk(
  "addMedicinesTemplate",
  async (payload) => {
    try {
      const res = await axios.post(
        baseURL + `/prescriptionTemplate/addMedicinesTemplate`,
        payload,
      );
      return res.data;
    } catch (error) {
      console.log(error);

      throw error;
    }
  },
);

export const addDiagnosisTemplate = createAsyncThunk(
  "addDiagnosisTemplate",
  async (payload) => {
    try {
      const res = await axios.post(
        baseURL + `/prescriptionTemplate/addDiagnosisTemplate`,
        payload,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
);

export const addComplaintsTemplate = createAsyncThunk(
  "addComplaintsTemplate",
  async (payload) => {
    try {
      const res = await axios.post(
        baseURL + `/prescriptionTemplate/addComplaintsTemplate`,
        payload,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
);

export const getMedicinesTemplatesList = createAsyncThunk(
  "getMedicinesTemplatesList",
  async () => {
    try {
      const res = await axios.get(
        baseURL + `/prescriptionTemplate/getMedicinesTemplatesList`,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
);

export const deleteMedicinesTemplate = createAsyncThunk(
  "handleMedicinesDeleteTemplate",
  async (payload) => {
    try {
      const res = await axios.delete(
        baseURL + `/prescriptionTemplate/deleteMedicinesTemplateByName/${payload}`,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
)

export const getDiagnosisTemplatesList = createAsyncThunk(
  "getDiagnosisTemplatesList",
  async () => {
    try {
      const res = await axios.get(
        baseURL + `/prescriptionTemplate/getDiagnosisTemplatesList`,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
);

export const deleteDiagnosisTemplate = createAsyncThunk(
  "handleDiagnosisDeleteTemplate",
  async (payload) => {
    try {
      const res = await axios.delete(
        baseURL + `/prescriptionTemplate/deleteDiagnosisTemplateByName/${payload}`,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
)

export const getComplaintsTemplatesList = createAsyncThunk(
  "getComplaintsTemplatesList",
  async () => {
    try {
      const res = await axios.get(
        baseURL + `/prescriptionTemplate/getComplaintsTemplatesList`,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
);

export const deleteComplaintsTemplate = createAsyncThunk(
  "handleComplaintsDeleteTemplate",
  async (payload) => {
    try {
      const res = await axios.delete(
        baseURL + `/prescriptionTemplate/deleteComplaintsTemplateByName/${payload}`,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
)


// Thunk for adding an advice template
export const addAdviceTemplate = createAsyncThunk(
  "addAdviceTemplate",
  async (payload) => {
    try {
      const res = await axios.post(
        baseURL + `/prescriptionTemplate/addAdviceTemplate`,
        payload,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

// Thunk for getting the list of advice templates
export const getAdviceTemplatesList = createAsyncThunk(
  "getAdviceTemplatesList",
  async () => {
    try {
      const res = await axios.get(
        baseURL + `/prescriptionTemplate/getAdviceTemplatesList`,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteAdviceTemplate = createAsyncThunk(
  "handleAdviceDeleteTemplate",
  async (payload) => {
    try {
      const res = await axios.delete(
        baseURL + `/prescriptionTemplate/deleteAdviceTemplateByName/${payload}`,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }
)

// Thunk for adding a test template
export const addTestTemplate = createAsyncThunk(
  "addTestTemplate",
  async (payload) => {
    try {
      const res = await axios.post(
        baseURL + `/prescriptionTemplate/addTestTemplate`,
        payload,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

// Thunk for getting the list of test templates
export const getTestTemplatesList = createAsyncThunk(
  "getTestTemplatesList",
  async () => {
    try {
      const res = await axios.get(
        baseURL + `/prescriptionTemplate/getTestTemplatesList`,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteTestTemplate = createAsyncThunk(
  "handleTestDeleteTemplate",
  async (payload) => {
    try {
      const res = await axios.delete(
        baseURL + `/prescriptionTemplate/deleteTestTemplateByName/${payload}`,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }
)

// Thunk for adding a prescription template
export const addPrescriptionTemplate = createAsyncThunk(
  "addPrescriptionTemplate",
  async (payload) => {
    try {
      const res = await axios.post(
        baseURL + `/prescriptionTemplate/addPrescriptionTemplate`,
        payload,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

// Thunk for getting the list of prescription templates
export const getPrescriptionTemplatesList = createAsyncThunk(
  "getPrescriptionTemplatesList",
  async () => {
    try {
      const res = await axios.get(
        baseURL + `/prescriptionTemplate/getPrescriptionTemplatesList`,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deletePrescriptionTemplate = createAsyncThunk(
  "deletePrescriptionTemplate",
  async (templateName) => {
    try {
      const res = await axios.delete(
        baseURL + `/prescriptionTemplate/deletePrescriptionTemplateByName/${templateName}`,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
)

export const addCounsellingTemplate = createAsyncThunk(
  "addCounsellingTemplate",
  async (payload) => {
    try {
      const res = await axios.post(
        baseURL + `/prescriptionTemplate/addCounsellingTemplate`,
        payload,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
);

// Thunk for getting the list of prescription templates
export const getCounsellingTemplatesList = createAsyncThunk(
  "getCounsellingTemplatesList",
  async () => {
    try {
      const res = await axios.get(
        baseURL + `/prescriptionTemplate/getCounsellingTemplatesList`,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
);

export const deleteCounsellingTemplate = createAsyncThunk(
  "deleteCounsellingTemplate",
  async (templateName) => {
    try {
      const res = await axios.delete(
        baseURL + `/prescriptionTemplate/deleteCounsellingTemplateByName/${templateName}`,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
)
