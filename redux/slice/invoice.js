import { createSlice } from "@reduxjs/toolkit";
import { AddInvoicethunk, deleteInvoiceThunk, generateInvoiceThunk, getAllInvoicesThunk, updateInvoiceThunk } from "../thunk/invoice";
import { toast } from "react-toastify";

const initialState = {
    data: null,
    status: "idle",
    error: null
};

const invoiceSlice = createSlice({
    name: "invoice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AddInvoicethunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(AddInvoicethunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.addedInvoice = action.payload;
                toast.success("Invoice Added Successfully \n Invoice Number: " + action.payload.invoice.invoiceNumber);
            })
            .addCase(AddInvoicethunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            .addCase(generateInvoiceThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(generateInvoiceThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.invoiceData = action.payload;
                toast.success("Invoice Genarated Successfully");
            })
            .addCase(generateInvoiceThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getAllInvoicesThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllInvoicesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.invoiceList = action.payload;
            })
            .addCase(getAllInvoicesThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(updateInvoiceThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateInvoiceThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.updatedInvoice = action.payload;
                toast.success("Invoice Updated Successfully");
            })
            .addCase(updateInvoiceThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(deleteInvoiceThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteInvoiceThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.deletedInvoice = action.payload;
                toast.success("Invoice Deleted Successfully");
            })
            .addCase(deleteInvoiceThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export default invoiceSlice.reducer;
