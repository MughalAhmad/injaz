import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
    companyName: localStorage.getItem("companyName") ? localStorage.getItem("companyName"):'Injaz'
}

const companyBrandingSlice = createSlice({
    name: "brand",
    initialState: initialstate,
    reducers: {
        updateCompanyName(state, action) {
            state.companyName = action.payload;
        }
    },
    
   
});

export const { updateCompanyName} = companyBrandingSlice.actions;
export default companyBrandingSlice;