import { createSlice } from "@reduxjs/toolkit";
import { addPatientThunk, getPatientThunk, scheduleAppointmentThunk, updatePatientThunk, getAppointmentTypeThunk, deletePatientThunk, getPatientAppoinment, uploadPatientDoc, deleteDocumentThunk, deleteMultipleFileThunk, addPrescriptionThunk, getPatientById, getPatientPreviousPrescription, getPatientPrescriptionsHistory } from "../thunk/patients";
import { toast } from "react-toastify";

const initialState = {
    data: null,
    loading: false,
    error: false
};

const patientSlice = createSlice({
    name: "patient",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getPatientThunk.pending, (state) => {
            return { ...state, loading: true };
        });
        builder.addCase(getPatientThunk.fulfilled, (state, action) => {
            return { ...state, patientList: action.payload, loading: false };
        });
        builder.addCase(getPatientThunk.rejected, (state) => {
            return { ...state, loading: false, error: "Something went wrong" };
        });

        builder.addCase(getAppointmentTypeThunk.pending, (state) => {
            return { ...state, loading: true };
        });
        builder.addCase(getAppointmentTypeThunk.fulfilled, (state, action) => {
            return { ...state, appointmentTypeList: action.payload, loading: false };
        });
        builder.addCase(getAppointmentTypeThunk.rejected, (state) => {
            return { ...state, loading: false, error: "Something went wrong" };
        });

        builder.addCase(addPatientThunk.pending, (state) => {
            return { ...state, loading: true };
        });
        builder.addCase(addPatientThunk.fulfilled, (state, action) => {
            toast.success("Patient Added Successfully");
            return { ...state, addedPatient: action.payload, loading: false };
        });
        builder.addCase(addPatientThunk.rejected, (state) => {
            return { ...state, loading: false, error: "Something went wrong" };
        });

        builder.addCase(updatePatientThunk.pending, (state) => {
            return { ...state, loading: true };
        });
        builder.addCase(updatePatientThunk.fulfilled, (state, action) => {
            toast.success("Patient Updated Successfully");
            return { ...state, updatedPatient: action.payload, loading: false };
        });
        builder.addCase(updatePatientThunk.rejected, (state) => {
            return { ...state, loading: false, error: "Something went wrong" };
        });

        builder.addCase(deletePatientThunk.pending, (state) => {
            return { ...state, loading: true };
        });
        builder.addCase(deletePatientThunk.fulfilled, (state, action) => {
            toast.success("Patient deleted Successfully");
            return { ...state, deletedPatient: action.payload, loading: false };
        });
        builder.addCase(deletePatientThunk.rejected, (state) => {
            return { ...state, loading: false, error: "Something went wrong" };
        });

        builder.addCase(scheduleAppointmentThunk.pending, (state) => {
            return { ...state, loading: true };
        });
        builder.addCase(scheduleAppointmentThunk.fulfilled, (state, action) => {
            toast.success("Appointment Scheduled Successfully");
            return { ...state, scheduleAppointment: action.payload, loading: false };
        });
        builder.addCase(scheduleAppointmentThunk.rejected, (state) => {
            return { ...state, loading: false, error: "Something went wrong" };
        });

        builder.addCase(getPatientAppoinment.pending, (state) => {
            return { ...state, loading: true };
        });
        builder.addCase(getPatientAppoinment.fulfilled, (state, action) => {
            return { ...state, patientAppointment: action.payload, loading: false };
        });
        builder.addCase(getPatientAppoinment.rejected, (state) => {
            return { ...state, loading: false, error: "Something went wrong" };
        });

        builder.addCase(uploadPatientDoc.pending, (state) => {
            return { ...state, loading: true };
        });
        builder.addCase(uploadPatientDoc.fulfilled, (state, action) => {
            toast.success("Document Uploaded Successfully");
            return { ...state, uploadedDoc: action.payload, loading: false };
        });
        builder.addCase(uploadPatientDoc.rejected, (state) => {
            return { ...state, loading: false, error: "Something went wrong" };
        });

        builder.addCase(deleteDocumentThunk.pending, (state) => {
            return { ...state, loading: true };
        });
        builder.addCase(deleteDocumentThunk.fulfilled, (state, action) => {
            toast.success("Document deleted Successfully");
            return { ...state, deletedDocument: action.payload, loading: false };
        });
        builder.addCase(deleteDocumentThunk.rejected, (state) => {
            return { ...state, loading: false, error: "Something went wrong" };
        });

        builder.addCase(deleteMultipleFileThunk.pending, (state) => {
            return { ...state, loading: true };
        });
        builder.addCase(deleteMultipleFileThunk.fulfilled, (state, action) => {
            toast.success("Documents deleted Successfully");
            return { ...state, filesToBeDeleted: action.payload.filePathArray, loading: false };
        });
        builder.addCase(deleteMultipleFileThunk.rejected, (state) => {
            return { ...state, loading: false, error: "Something went wrong" };
        });

         builder.addCase(addPrescriptionThunk.pending, (state) => {
           return { ...state, loading: true };
         });
         builder.addCase(addPrescriptionThunk.fulfilled, (state, action) => {
           toast.success("Prescription Added Successfully");
           return {
             ...state,
             prescription: action.payload,
             loading: false,
           };
         });
         builder.addCase(addPrescriptionThunk.rejected, (state) => {
           return { ...state, loading: false, error: "Something went wrong" };
         });
        
        
         builder.addCase(getPatientById.pending, (state) => {
           return { ...state, loading: true };
         });
         builder.addCase(getPatientById.fulfilled, (state, action) => {
           return {
             ...state,
             patientData: action.payload,
             loading: false,
           };
         });
         builder.addCase(getPatientById.rejected, (state) => {
           return { ...state, loading: false, error: "Something went wrong" };
         });

         builder.addCase(getPatientPreviousPrescription.pending, (state) => {
           return { ...state, loading: true };
         });
         builder.addCase(getPatientPreviousPrescription.fulfilled, (state, action) => {
           return {
             ...state,
             previousPrescription: action.payload,
             loading: false,
           };
         });
         builder.addCase(getPatientPreviousPrescription.rejected, (state) => {
           return { ...state, loading: false, error: "Something went wrong" };
         });
        
        
        builder.addCase(getPatientPrescriptionsHistory.pending, (state) => {
          return { ...state, loading: true };
        });
        builder.addCase(
          getPatientPrescriptionsHistory.fulfilled,
          (state, action) => {
            return {
              ...state,
              prescriptionHistory: action.payload,
              loading: false,
            };
          },
        );
        builder.addCase(getPatientPrescriptionsHistory.rejected, (state) => {
          return { ...state, prescriptionHistory:[], loading: false, error: "Something went wrong" };
        });
    }
});

export default patientSlice.reducer;
