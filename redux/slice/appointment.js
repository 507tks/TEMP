import { createSlice } from "@reduxjs/toolkit";
import { appointmentThunk, cancelAppointmentThunk, prescriptionThunk, rescheduleAppointmentThunk, viewPrescriptionThunk, notesThunk, getSingleAppointment, getTestThunk, getMedicineThunk, getRemarksThunk, getDiagnosisThunk, getComplaintsThunk, getAdviceThunk, getMedicinesTemplatesList, getDiagnosisTemplatesList, getComplaintsTemplatesList, addMedicinesTemplate, addDiagnosisTemplate, addComplaintsTemplate, getPrescriptionTemplatesList, addPrescriptionTemplate, getTestTemplatesList, addTestTemplate, getAdviceTemplatesList, addAdviceTemplate, addCounsellingTemplate, getCounsellingTemplatesList, absentAppointmentthunk } from "../thunk/appointments";
import { toast } from "react-toastify";

const initialState = {
  allAppoinments: null,
   search: '',
  date: '',
  status: '',
  loading: false,
  error: false
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
   reducers: {
    setFilters: (state, action) => {
      const { search, date, status } = action.payload;
      state.search = search;
      state.date = date;
      state.status = status;
    },
    clearFilters: (state) => {
      state.search = '';
      state.date = '';
      state.status = '';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(appointmentThunk.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(appointmentThunk.fulfilled, (state, action) => {
      return { ...state, allAppoinments: action.payload, loading: false };
    });
    builder.addCase(appointmentThunk.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    builder.addCase(prescriptionThunk.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(prescriptionThunk.fulfilled, (state, action) => {
      toast.success("Presciption Added Successfully");
      return { ...state, prescription: action.payload, loading: false };
    });
    builder.addCase(prescriptionThunk.rejected, (state) => {
      toast.error("error in prescription");
      return { ...state, loading: false, error: "Something went wrong" };
    });

    builder.addCase(notesThunk.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(notesThunk.fulfilled, (state, action) => {
      toast.success("Note Added Successfully");
      return { ...state, note: action.payload, loading: false };
    });
    builder.addCase(notesThunk.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    builder.addCase(rescheduleAppointmentThunk.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(rescheduleAppointmentThunk.fulfilled, (state, action) => {
      toast.success("Successfully Rescheduled");
      return { ...state, appointment: action.payload, loading: false };
    });
    builder.addCase(rescheduleAppointmentThunk.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    builder.addCase(cancelAppointmentThunk.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(cancelAppointmentThunk.fulfilled, (state, action) => {
      toast.success("Appointment Cancelled Successfully");
      return { ...state, canceledAppoinment: action.payload, loading: false };
    });
    builder.addCase(cancelAppointmentThunk.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

     builder.addCase(absentAppointmentthunk.pending, (state) => {
       return { ...state, loading: true };
     });
     builder.addCase(absentAppointmentthunk.fulfilled, (state, action) => {
       toast.success("Appointment Marked as Absent Successfully");
       return { ...state, canceledAppoinment: action.payload, loading: false };
     });
     builder.addCase(absentAppointmentthunk.rejected, (state) => {
       return { ...state, loading: false, error: "Something went wrong" };
     });

    builder.addCase(viewPrescriptionThunk.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(viewPrescriptionThunk.fulfilled, (state, action) => {
      return { ...state, prescriptionHistory: action.payload, loading: false };
    });
    builder.addCase(viewPrescriptionThunk.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    builder.addCase(getSingleAppointment.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(getSingleAppointment.fulfilled, (state, action) => {
      return {
        ...state,
        singleAppointmentData: action.payload,
        loading: false,
      };
    });
    builder.addCase(getSingleAppointment.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    builder.addCase(getTestThunk.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(getTestThunk.fulfilled, (state, action) => {
      return { ...state, testData: action.payload, loading: false };
    });
    builder.addCase(getTestThunk.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    builder.addCase(getMedicineThunk.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(getMedicineThunk.fulfilled, (state, action) => {
      return { ...state, medicineData: action.payload, loading: false };
    });
    builder.addCase(getMedicineThunk.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    builder.addCase(getDiagnosisThunk.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(getDiagnosisThunk.fulfilled, (state, action) => {
      return { ...state, diagnosisData: action.payload, loading: false };
    });
    builder.addCase(getDiagnosisThunk.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    builder.addCase(getComplaintsThunk.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(getComplaintsThunk.fulfilled, (state, action) => {
      return { ...state, complaintsData: action.payload, loading: false };
    });
    builder.addCase(getComplaintsThunk.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    builder.addCase(getAdviceThunk.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(getAdviceThunk.fulfilled, (state, action) => {
      return { ...state, adviceData: action.payload, loading: false };
    });
    builder.addCase(getAdviceThunk.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    builder.addCase(getRemarksThunk.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(getRemarksThunk.fulfilled, (state, action) => {
      if (action.meta.arg === "timing") {
        return { ...state, timingData: action.payload, loading: false };
      } else if (action.meta.arg === "period") {
        return { ...state, periodData: action.payload, loading: false };
      } else if (action.meta.arg === "frequency") {
        return { ...state, frequencyData: action.payload, loading: false };
      }
    });
    builder.addCase(getRemarksThunk.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    builder.addCase(getMedicinesTemplatesList.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(getMedicinesTemplatesList.fulfilled, (state, action) => {
      return { ...state, medicineTemplates: action.payload, loading: false };
    });
    builder.addCase(getMedicinesTemplatesList.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    builder.addCase(getDiagnosisTemplatesList.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(getDiagnosisTemplatesList.fulfilled, (state, action) => {
      return { ...state, diagnosisTemplates: action.payload, loading: false };
    });
    builder.addCase(getDiagnosisTemplatesList.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    builder.addCase(getComplaintsTemplatesList.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(getComplaintsTemplatesList.fulfilled, (state, action) => {
      return { ...state, complaintTemplates: action.payload, loading: false };
    });
    builder.addCase(getComplaintsTemplatesList.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    builder.addCase(addMedicinesTemplate.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(addMedicinesTemplate.fulfilled, (state, action) => {
      toast.success("Template saved successfully!");
      return { ...state, medicineTemplate: action.payload, loading: false };
    });
    builder.addCase(addMedicinesTemplate.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    builder.addCase(addDiagnosisTemplate.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(addDiagnosisTemplate.fulfilled, (state, action) => {
      toast.success("Template saved successfully!");
      return { ...state, diagnosistemplate: action.payload, loading: false };
    });
    builder.addCase(addDiagnosisTemplate.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    builder.addCase(addComplaintsTemplate.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(addComplaintsTemplate.fulfilled, (state, action) => {
      toast.success("Template saved successfully!");
      return { ...state, note: action.payload, loading: false };
    });
    builder.addCase(addComplaintsTemplate.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    // Handling addAdviceTemplate thunk
    builder.addCase(addAdviceTemplate.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(addAdviceTemplate.fulfilled, (state, action) => {
      toast.success("Advice template saved successfully!");
      return { ...state, adviceTemplate: action.payload, loading: false };
    });
    builder.addCase(addAdviceTemplate.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    // Handling getAdviceTemplatesList thunk
    builder.addCase(getAdviceTemplatesList.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(getAdviceTemplatesList.fulfilled, (state, action) => {
      return { ...state, adviceTemplates: action.payload, loading: false };
    });
    builder.addCase(getAdviceTemplatesList.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    // Handling addTestTemplate thunk
    builder.addCase(addTestTemplate.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(addTestTemplate.fulfilled, (state, action) => {
      toast.success("Test template saved successfully!");
      return { ...state, testTemplate: action.payload, loading: false };
    });
    builder.addCase(addTestTemplate.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    // Handling getTestTemplatesList thunk
    builder.addCase(getTestTemplatesList.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(getTestTemplatesList.fulfilled, (state, action) => {
      return { ...state, testTemplates: action.payload, loading: false };
    });
    builder.addCase(getTestTemplatesList.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    // Handling addPrescriptionTemplate thunk
    builder.addCase(addPrescriptionTemplate.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(addPrescriptionTemplate.fulfilled, (state, action) => {
      toast.success("Prescription template saved successfully!");
      return { ...state, prescriptionTemplate: action.payload, loading: false };
    });
    builder.addCase(addPrescriptionTemplate.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    // Handling getPrescriptionTemplatesList thunk
    builder.addCase(getPrescriptionTemplatesList.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(getPrescriptionTemplatesList.fulfilled, (state, action) => {
      return {
        ...state,
        prescriptionTemplates: action.payload,
        loading: false,
      };
    });
    builder.addCase(getPrescriptionTemplatesList.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    // Handling addPrescriptionTemplate thunk
    builder.addCase(addCounsellingTemplate.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(addCounsellingTemplate.fulfilled, (state, action) => {
      toast.success("Counselling template saved successfully!");
      return { ...state, prescriptionTemplate: action.payload, loading: false };
    });
    builder.addCase(addCounsellingTemplate.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    // Handling getPrescriptionTemplatesList thunk
    builder.addCase(getCounsellingTemplatesList.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(getCounsellingTemplatesList.fulfilled, (state, action) => {
      return {
        ...state,
        counselingTemplates: action.payload,
        loading: false,
      };
    });
    builder.addCase(getCounsellingTemplatesList.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });
  }
});
export const { setFilters, clearFilters } = appointmentSlice.actions;
export default appointmentSlice.reducer;
