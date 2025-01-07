import { createSlice } from "@reduxjs/toolkit"
import { getMyHospitalData, UpdateHospitalData } from "../thunk/hospital"
import { toast } from "react-toastify"

const initialState = {
    data: null,
    status: "idle",
    error: null
}

const hospitalSlice = createSlice({
    name: "hospital",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMyHospitalData.pending, (state) => {
            state.status = "loading"
        })

        builder.addCase(getMyHospitalData.fulfilled, (state, action) => {
            state.data = action.payload
            state.status = "succeeded"
        })

        builder.addCase(getMyHospitalData.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message
            toast.error(action.error.message)
        })

         builder.addCase(UpdateHospitalData.pending, (state) => {
           state.status = "loading";
         });

        builder.addCase(UpdateHospitalData.fulfilled, (state, action) => {
            toast.success("Hospital Updated Successfully")
           state.data = action.payload;
           state.status = "succeeded";
         });

         builder.addCase(UpdateHospitalData.rejected, (state, action) => {
           state.status = "failed";
           state.error = action.error.message;
           toast.error(action.error.message);
         });
    }
})

export default hospitalSlice.reducer