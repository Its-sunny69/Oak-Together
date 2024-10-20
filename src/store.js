import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./features/authSlice";

export default configureStore({
    reducer: {
        auth: authReducers,
    }
})