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
    async (data) => {
        const response = await generalService.getAllUsers(data);
        return response.data;
    }
);
export const getAllUsersNameAndId = createAsyncThunk(
    'getAllUsersNameAndId',
    async () => {
        const response = await generalService.getAllUsersNameAndId();
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
export const assignToUser = createAsyncThunk(
    'assignToUser',
    async (data) => {
        const response = await generalService.assignToUser(data);
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

export const sendEmailAndPassword = createAsyncThunk(
    'sendEmailAndPassword',
    async (data) => {
        const response = await generalService.sendEmailAndPassword(data);
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
    async (data) => {
        const response = await generalService.getAllRefs(data);
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
    users: {},
    usersOptions:{currentPage:1, query:'', sort:'' },
    refs:{},
    refsOptions:{currentPage:1, query:'', sort:'' },
    status: 'idle',
    error: null,
    isLoading: true,
    showLoader: false,
}

const generalSlice = createSlice({
    name: "geaneral",
    initialState: initialstate,
    reducers: { 

        updateUserOptions(state, action) {
            if(action.payload.field === 'currentPage'){
                state.usersOptions.currentPage = action.payload.value;
            }
            if(action.payload.field === 'query'){
                state.usersOptions.query = action.payload.value;
            }
            if(action.payload.field === 'sort'){
                state.usersOptions.sort = action.payload.value;
            }
         },
         updateRefOptions(state, action) {
            if(action.payload.field === 'currentPage'){
                state.refsOptions.currentPage = action.payload.value;
            }
            if(action.payload.field === 'query'){
                state.refsOptions.query = action.payload.value;
            }
            if(action.payload.field === 'sort'){
                state.refsOptions.sort = action.payload.value;
            }
         }
},
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

export const {updateUserOptions,updateRefOptions} = generalSlice.actions;
export default generalSlice;