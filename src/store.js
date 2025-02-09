import { configureStore } from "@reduxjs/toolkit";
import geminiReducers from "./features/geminiSlice";
import locationReducers from "./features/locationSlice";
import eventReducers from "./features/eventSlice";

export default configureStore({
  reducer: {
    gemini: geminiReducers,
    location: locationReducers,
    event: eventReducers,
  },
});
