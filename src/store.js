import { configureStore } from "@reduxjs/toolkit";
import geminiReducers from "./features/geminiSlice";
import locationReducers from "./features/locationSlice"

export default configureStore({
    reducer: {
        gemini: geminiReducers,
        location: locationReducers,
    }
})