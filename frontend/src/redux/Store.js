import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./features/adminSlice";
import companyBrandingSlice from "./features/companyBrandingSlice";
import pdfSlice from "./features/pdfSlice";
import generalSlice from "./features/generalSlice";
import mailSlice from "./features/mailSlice";
const Store = configureStore({
    reducer:{
        adminStore: adminSlice.reducer,
        brandingStore: companyBrandingSlice.reducer,
        pdfStore: pdfSlice.reducer,
        generalStore: generalSlice.reducer,
        mailStore: mailSlice.reducer
        
    },
});

export default Store;