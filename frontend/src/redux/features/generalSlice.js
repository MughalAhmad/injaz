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
export const getAllUsers = createAsyncThunk(
    'getAllUsers',
    async () => {
        const response = await generalService.getAllUsers();
        return response.data;
    }
);
export const getUser = createAsyncThunk(
    'getUser',
    async (data) => {
        const response = await generalService.getUser(data);
        return response.data;
    }
);
export const updateUser = createAsyncThunk(
    'updateUser',
    async (data) => {
        const response = await generalService.updateUser(data);
        return response.data;
    }
);
export const deleteUser = createAsyncThunk(
    'deleteUser',
    async (data) => {
        const response = await generalService.deleteUser(data);
        return response.data;
    }
);

// References

export const createRef = createAsyncThunk(
    'createRef',
    async (data) => {
        const response = await generalService.createRef(data);
        return response.data;
    }
);
export const getAllRefs = createAsyncThunk(
    'getAllRefs',
    async () => {
        const response = await generalService.getAllRefs();
        return response.data;
    }
);
export const getRef = createAsyncThunk(
    'getRef',
    async (data) => {
        const response = await generalService.getRef(data);
        return response.data;
    }
);
export const updateRef = createAsyncThunk(
    'updateRef',
    async (data) => {
        const response = await generalService.updateRef(data);
        return response.data;
    }
);
export const deleteRef = createAsyncThunk(
    'deleteRef',
    async (data) => {
        const response = await generalService.deleteRef(data);
        return response.data;
    }
);

const initialstate = {
    users: [],
    refs:[],
    status: 'idle',
    error: null,
    isLoading: true,
    showLoader: false,
}

const generalSlice = createSlice({
    name: "geaneral",
    initialState: initialstate,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.status = 'loading';
                state.isLoading = true;
                state.showLoader = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.showLoader = false;
                if (!action.payload.hasError) {
                    state.users = action.payload.data;
                    state.isLoading = false;
                }
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = true;
                state.isLoading = false;
                state.showLoader = false;
            })
             .addCase(getAllRefs.pending, (state) => {
                state.status = 'loading';
                state.isLoading = true;
                state.showLoader = true;
            })
            .addCase(getAllRefs.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.showLoader = false;
                if (!action.payload.hasError) {
                    state.refs = action.payload.data;
                    state.isLoading = false;
                }
            })
            .addCase(getAllRefs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = true;
                state.isLoading = false;
                state.showLoader = false;
            })
    }
});

export const {} = generalSlice.actions;
export default generalSlice;