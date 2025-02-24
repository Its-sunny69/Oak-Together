import { configureStore } from "@reduxjs/toolkit";
import geminiReducers from "./features/geminiSlice";
import locationReducers from "./features/locationSlice";
import eventReducers from "./features/eventSlice";
import userReducers from "./features/userSlice"

export default configureStore({
  reducer: {
    user: userReducers,
    gemini: geminiReducers,
    location: locationReducers,
    event: eventReducers,
  },
});
