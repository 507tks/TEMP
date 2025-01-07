import { createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import { addMedicine, deleteMedicineThunk, getMedicineThunk, searchMedicinesThunk, updateActiveState, updateMedicine, updateStock } from "../thunk/medicine";

const initialState = {
  medicineList: [],
  loading: false,
  error: null
};

const medicineSlice = createSlice({
  name: "medicine",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMedicineThunk.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(getMedicineThunk.fulfilled, (state, action) => {
      return { ...state, medicineList: action.payload, loading: false };
    });
    builder.addCase(getMedicineThunk.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    builder.addCase(addMedicine.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(addMedicine.fulfilled, (state, action) => {
      toast.success("Medicine Added Successfully");
      return { ...state, addedMedicine: action.payload, loading: false };
    });
    builder.addCase(addMedicine.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    builder.addCase(deleteMedicineThunk.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(deleteMedicineThunk.fulfilled, (state, action) => {
      toast.success("Medicine Deleted Successfully");
      return { ...state, addedMedicine: action.payload, loading: false };
    });
    builder.addCase(deleteMedicineThunk.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    builder.addCase(updateMedicine.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(updateMedicine.fulfilled, (state, action) => {
      toast.success("Medicine Update Successfully");
      return { ...state, updatedMedicine: action.payload, loading: false };
    });
    builder.addCase(updateMedicine.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

    builder.addCase(searchMedicinesThunk.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(searchMedicinesThunk.fulfilled, (state, action) => {
      return { ...state, medicineList: action.payload, loading: false };
    });
    builder.addCase(searchMedicinesThunk.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });


    builder.addCase(updateStock.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(updateStock.fulfilled, (state, action) => {
      toast.success("Stock Updated Successfully")
      return { ...state, updatedMedicine: action.payload, loading: false };
    });
    builder.addCase(updateStock.rejected, (state) => {
      return { ...state, loading: false, error: "Something went wrong" };
    });

     builder.addCase(updateActiveState.pending, (state) => {
       return { ...state, loading: true };
     });
    builder.addCase(updateActiveState.fulfilled, (state, action) => {
       toast.success("State Updated Successfully");
       return { ...state, updatedMedicine: action.payload, loading: false };
     });
     builder.addCase(updateActiveState.rejected, (state) => {
       return { ...state, loading: false, error: "Something went wrong" };
     });
  }
});

export default medicineSlice.reducer;
