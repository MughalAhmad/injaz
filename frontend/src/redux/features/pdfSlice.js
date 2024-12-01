import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PdfService from "../../services/pdf.service";
const pdfService = new PdfService();


export const createPdf = createAsyncThunk(
    'createPdf',
    async (data) => {
        const response = await pdfService.createPdf(data);
        return response.data;
    }
);

export const getAllPdf = createAsyncThunk(
    'getAllPdf',
    async (companyName) => {
        const response = await pdfService.getAllPdf(companyName);
        return response.data;
    }
);

const initialstate = {
    list:[],
    status: 'idle',
    error: null,
    isLoading: true,
    showLoader: false,
    showBackDropLoader: false,
}

const pdfSlice = createSlice({
    name: "pdf",
    initialState: initialstate,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllPdf.pending, (state) => {
                state.status = 'loading';
                state.isLoading = true;
                state.showLoader = true;
            })
            .addCase(getAllPdf.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.showLoader = false;
                if (!action.payload.hasError) {
                    state.list = action.payload.data.pdf;
                    state.isLoading = false;
                }
            })
            .addCase(getAllPdf.rejected, (state, action) => {
                state.status = 'failed';
                state.error = true;
                state.isLoading = false;
                state.showLoader = false;
            })
    }
   
});

export const { } = pdfSlice.actions;
export default pdfSlice;