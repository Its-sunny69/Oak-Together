import { configureStore } from "@reduxjs/toolkit";
import geminiReducers from "./features/geminiSlice";

export default configureStore({
    reducer: {
        gemini: geminiReducers,
    }
})