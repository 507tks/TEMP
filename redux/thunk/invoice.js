import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../component/constants/defaultValues";

export const AddInvoicethunk = createAsyncThunk("invoiceThunk", async (payload, { rejectWithValue }) => {
    try {
        const res = await axios.post(baseURL + "/invoices/addInvoice", payload);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const generateInvoiceThunk = createAsyncThunk("generateInvoiceThunk", async (invoiceId) => {
    try {
        const res = await axios.get(baseURL + `/invoices/generate-invoice?invoiceId=${invoiceId}`);
        return res.data;
    } catch (error) {
        throw error;
    }
});

export const getAllInvoicesThunk = createAsyncThunk("getAllInvoicesThunk", async (payload) => {
    try {
        const res = await axios.get(
          baseURL +
            `/invoices/getInvoices?pageSize=${payload.pageSize}&sortBy=${payload.sortBy}&sortType=${payload.sortType}&pageIndex=${payload.pageIndex}${payload.value ? "&query=" + payload.value : ""}`,
        );
        return res.data;
    } catch (error) {
        throw error;
    }
});

export const getInvoiceById = createAsyncThunk("getInvoiceById", async (payload) => {
    try {
        const res = await axios.get(baseURL + `/invoices/getInvoiceById/${payload.invoiceId}`);
        return res.data.invoice;
    } catch (error) {
        throw error
    }
})

export const updateInvoiceThunk = createAsyncThunk("updateInvoiceThunk", async (payload) => {
    try {
        const res = await axios.patch(baseURL + `/invoices/updateInvoice/${payload.invoiceId}`, payload.data);
        return res.data;
    } catch (error) {
        throw error;
    }
})

export const deleteInvoiceThunk = createAsyncThunk("deleteInvoiceThunk", async (payload) => {
    try {
        const res = await axios.delete(baseURL + `/invoices/deleteInvoice/${payload.invoiceId}`);
        return res.data;
    } catch (error) {
        throw error;
    }
})

export const sendInvoiceThunk = createAsyncThunk("sendInvoiceThunk", async (payload) => {
    try {
        const res = await axios.post(baseURL + `/invoices/sendInvoice/${payload.invoiceId}`, payload.data);
        return res.data;
    } catch (error) {
        throw error;
    }
})