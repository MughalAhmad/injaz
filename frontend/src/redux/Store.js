import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./features/adminSlice";
import companyBrandingSlice from "./features/companyBrandingSlice";
import pdfSlice from "./features/pdfSlice";

const Store = configureStore({
    reducer:{
        adminStore: adminSlice.reducer,
        brandingStore: companyBrandingSlice.reducer,
        pdfStore: pdfSlice.reducer,
        
    },
});

export default Store;