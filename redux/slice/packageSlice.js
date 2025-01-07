import { createSlice } from "@reduxjs/toolkit";
import {
  addPackageThunk,
  getAllPackagesThunk,
  getPackageByIdThunk,
  updatePackageThunk,
  deletePackageThunk,
  alotPackageToPatient,
  getPatientPackages,
  updateSession,
  deleteSessionThunk,
  receivedAmountInSessionThunk,
  markSessionStatusThunk,
  rescheduleSessionThunk,
} from "../thunk/package"; 
import { toast } from "react-toastify";


const initialState = {
  data: null,
  loading: false,
  error: false,
};

const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
  
    builder.addCase(addPackageThunk.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(addPackageThunk.fulfilled, (state, action) => {
    toast.success("Package added successfully")
      return { ...state, package: action.payload, loading: false };
    });
    builder.addCase(addPackageThunk.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

   
    builder.addCase(getAllPackagesThunk.pending, (state) => {
   return { ...state, loading: true };
     });
    builder.addCase(getAllPackagesThunk.fulfilled, (state, action) => {
      return { ...state, packages: action.payload, loading: false };
    });
    builder.addCase(getAllPackagesThunk.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });
    
     builder.addCase(getPackageByIdThunk.pending, (state) => {
       return { ...state, loading: true };
     });
     builder.addCase(getPackageByIdThunk.fulfilled, (state, action) => {
       return { ...state, packages: action.payload, loading: false };
     });
     builder.addCase(getPackageByIdThunk.rejected, (state) => {
       return { ...state, loading: false, error: "Something went wrong" };
     });
    

     builder.addCase(updatePackageThunk.pending, (state) => {
       return { ...state, loading: true };
     });
    builder.addCase(updatePackageThunk.fulfilled, (state, action) => {
    toast.success("Package Updated Successfully");
       
       return { ...state, package: action.payload, loading: false };
     });
     builder.addCase(updatePackageThunk.rejected, (state) => {
       return { ...state, loading: false, error: "Something went wrong" };
     });
    
   
 builder.addCase(deletePackageThunk.pending, (state) => {
   return { ...state, loading: true };
 });
    builder.addCase(deletePackageThunk.fulfilled, (state, action) => {
   toast.success("Package Deleted Successfully");
   return { ...state, package: action.payload, loading: false };
 });
 builder.addCase(deletePackageThunk.rejected, (state) => {
   return { ...state, loading: false, error: "Something went wrong" };
 });
  
    
     builder.addCase(alotPackageToPatient.pending, (state) => {
       return { ...state, loading: true };
     });
     builder.addCase(alotPackageToPatient.fulfilled, (state, action) => {
       toast.success("Sessions Scheduled successfully");
       return { ...state, allotedpackage: action.payload, loading: false };
     });
     builder.addCase(alotPackageToPatient.rejected, (state) => {
       return { ...state, loading: false, error: "Something went wrong" };
     });
    
    
     builder.addCase(getPatientPackages.pending, (state) => {
       return { ...state, loading: true };
     });
     builder.addCase(getPatientPackages.fulfilled, (state, action) => {
       return { ...state, patientPackages: action.payload, loading: false };
     });
     builder.addCase(getPatientPackages.rejected, (state) => {
       return { ...state, loading: false, error: "Something went wrong" };
     });
    
      builder.addCase(updateSession.pending, (state) => {
        return { ...state, loading: true };
      });
      builder.addCase(updateSession.fulfilled, (state, action) => {
        toast.success("Session Updated Successfully");

        return { ...state, session: action.payload, loading: false };
      });
      builder.addCase(updateSession.rejected, (state) => {
        return { ...state, loading: false, error: "Something went wrong" };
      });
    
     builder.addCase(deleteSessionThunk.pending, (state) => {
       return { ...state, loading: true };
     });
     builder.addCase(deleteSessionThunk.fulfilled, (state, action) => {
       toast.success("Session Deleted Successfully");
       return { ...state, session: action.payload, loading: false };
     });
     builder.addCase(deleteSessionThunk.rejected, (state) => {
       return { ...state, loading: false, error: "Something went wrong" };
     });
    
     builder.addCase(receivedAmountInSessionThunk.pending, (state) => {
       return { ...state, loading: true };
     });
     builder.addCase(
       receivedAmountInSessionThunk.fulfilled,
       (state, action) => {
         toast.success("Amount Updated Successfully");
         return { ...state, session: action.payload, loading: false };
       },
     );
     builder.addCase(receivedAmountInSessionThunk.rejected, (state) => {
       toast.error("Failed to update amount.");
       return { ...state, loading: false, error: "Something went wrong" };
     });

     // Mark Session Status
     builder.addCase(markSessionStatusThunk.pending, (state) => {
       return { ...state, loading: true };
     });
     builder.addCase(markSessionStatusThunk.fulfilled, (state, action) => {
       toast.success("Session Status Updated Successfully");
       return { ...state, session: action.payload, loading: false };
     });
     builder.addCase(markSessionStatusThunk.rejected, (state) => {
       toast.error("Failed to update session status.");
       return { ...state, loading: false, error: "Something went wrong" };
     });

     // Reschedule Session
     builder.addCase(rescheduleSessionThunk.pending, (state) => {
       return { ...state, loading: true };
     });
     builder.addCase(rescheduleSessionThunk.fulfilled, (state, action) => {
       toast.success("Session Rescheduled Successfully");
       return { ...state, session: action.payload, loading: false };
     });
     builder.addCase(rescheduleSessionThunk.rejected, (state) => {
       toast.error("Failed to reschedule session.");
       return { ...state, loading: false, error: "Something went wrong" };
     });
  },
});

export default packageSlice.reducer;
