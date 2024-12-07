import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import GeneralService from "../../services/general.service";
const generalService = new GeneralService();

export const createUser = createAsyncThunk(
    'createUser',
    async (data) => {
        const response = await generalService.createUser(data);
        return response.data;
    }
);


const initialstate = {
    user: [],
}

const generalSlice = createSlice({
    name: "geaneral",
    initialState: initialstate,
    reducers: {},
});

export const {} = generalSlice.actions;
export default generalSlice;