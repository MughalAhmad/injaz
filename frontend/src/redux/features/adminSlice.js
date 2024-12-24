import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AdminService from "../../services/admin.service";
const adminService = new AdminService();

export const initialFetch = createAsyncThunk(
    'initialFetch',
    async () => {
        const response = await adminService.initialFetch();
        return response.data;
    }
);
export const userLogin = createAsyncThunk(
    'userLogin',
    async (data) => {
        const response = await adminService.userLogin(data);
        return response.data;
    }
);


export const userLogout = createAsyncThunk(
    'userLogout',
    async (data) => {
        const response = await adminService.userLogout(data);
        return response.data;
    }
);
export const forgot = createAsyncThunk(
    'forgot',
    async (data) => {
        const response = await adminService.forgot(data);
        return response.data;
    }
);
export const checkCode = createAsyncThunk(
    'checkCode',
    async (data) => {
        const response = await adminService.checkCode(data);
        return response.data;
    }
);

export const newPassword = createAsyncThunk(
    'newPassword',
    async (data) => {
        const response = await adminService.newPassword(data);
        return response.data;
    }
);

export const resetPassword = createAsyncThunk(
    'resetPassword',
    async (data) => {
        const response = await adminService.resetPassword(data);
        return response.data;
    }
);
export const changePassword = createAsyncThunk(
    'changePassword',
    async (data) => {
        const response = await adminService.changePassword(data.resetToken, data.body);
        return response.data;
    }
);


const initialstate = {
    isAuthenticated: false,
    token: null,
    userImg:localStorage.getItem('profileImage'),
    user: {},
    status: 'idle',
    error: null,
    isLoading: true,
    showLoader: false,
    showBackDropLoader: false,
}

const adminSlice = createSlice({
    name: "user",
    initialState: initialstate,
    reducers: {
        updateAuthStatus(state, action) {
            state.isAuthenticated = action.payload;
        },
        updateToken(state, action) {
            state.token = action.payload;
        },
        updateUser(state, action) {
            state.user = action.payload;
        },
        updateAuthSliceErrorStatus(state, action) {
            state.error = action.payload;
        },
        updateShowLoader(state, action) {
            state.showLoader = action.payload;
        },
        updateShowBackDropLoader(state, action) {
            state.showBackDropLoader = action.payload;
        },
        updateUserImg(state, action) {
            state.userImg = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(initialFetch.pending, (state) => {
                state.status = 'loading';
                state.isLoading = true;
                state.showLoader = true;
            })
            .addCase(initialFetch.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.showLoader = false;
                if (!action.payload.hasError) {
                    state.isAuthenticated = action.payload.data.isAuthenticated;
                    state.token = action.payload.data.token;
                    state.user = action.payload.data.user;
                    state.isLoading = false;
                }
            })
            .addCase(initialFetch.rejected, (state, action) => {
                state.status = 'failed';
                state.error = true;
                state.isLoading = false;
                state.showLoader = false;
            })
    }
   
});

export const { updateAuthStatus, updateToken, updateUser, updateAuthSliceErrorStatus,
     updateShowLoader, updateShowBackDropLoader, updateUserImg } = adminSlice.actions;
export default adminSlice;