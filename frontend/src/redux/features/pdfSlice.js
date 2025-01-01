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
    async (data) => {
        const response = await pdfService.getAllPdf(data);
        return response.data;
    }
);

export const getQuotation = createAsyncThunk(
    'getQuotation',
    async (data) => {
        const response = await pdfService.getQuotation(data);
        return response.data;
    }
);

export const getNoficationData = createAsyncThunk(
    'getNoficationData',
    async (data) => {
        const response = await pdfService.getNoficationData(data);
        return response.data;
    }
);
export const updateNotification = createAsyncThunk(
    'updateNotification',
    async (data) => {
        const response = await pdfService.updateNotification(data);
        return response.data;
    }
);
export const getDashboardData = createAsyncThunk(
    'getDashboardData',
    async (data) => {
        const response = await pdfService.getDashboardData(data);
        return response.data;
    }
);

export const allRefs = createAsyncThunk(
    'allRefs',
    async () => {
        const response = await pdfService.allRefs();
        return response.data;
    }
);
export const sendPDF = createAsyncThunk(
    'sendPDF',
    async (data) => {
        const response = await pdfService.sendPDF(data);
        return response.data;
    }
);

const initialstate = {
    pdfData:{list:[], pages:1, cardData:{
        pending:30,
        approved:34,
        rejected:346, 
      },total:0 },
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
                    state.pdfData.list = action.payload.data.pdfs;
                    state.pdfData.pages = action.payload.data.pages
                    state.pdfData.cardData = action.payload.data.cardData;
                    state.pdfData.total = action.payload.data.total;
                    state.isLoading = false;
                }
            })
            .addCase(getAllPdf.rejected, (state, action) => {
                state.status = 'failed';
                state.error = true;
                state.isLoading = false;
                state.showLoader = false;
            })
            .addCase(getDashboardData.pending, (state) => {
                state.status = 'loading';
                state.isLoading = true;
                state.showLoader = true;
            })
            .addCase(getDashboardData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.showLoader = false;
                if (!action.payload.hasError) {
                    state.pdfData.list = action.payload.data.pdfs;
                    state.pdfData.pages = action.payload.data.pages
                    state.pdfData.cardData = action.payload.data.cardData;
                    state.pdfData.total = action.payload.data.total;

                    state.isLoading = false;
                }
            })
            .addCase(getDashboardData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = true;
                state.isLoading = false;
                state.showLoader = false;
            })
    }
   
});

export const { } = pdfSlice.actions;
export default pdfSlice;