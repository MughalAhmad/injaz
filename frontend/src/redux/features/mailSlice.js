import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MailService from "../../services/mail.service";
const mailService = new MailService();

export const sendMailResponse = createAsyncThunk(
    'sendMailResponse',
    async (data) => {
        const response = await mailService.sendMailResponse(data);
        return response.data;
    }
);




const mailSlice = createSlice({
    name: "mail",
    initialState: { },
    reducers: { },
});

export const { } = mailSlice.actions;
export default mailSlice;