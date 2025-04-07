import { configureStore } from "@reduxjs/toolkit";
import geminiReducers from "./features/geminiSlice";
import locationReducers from "./features/locationSlice";
import eventReducers from "./features/eventSlice";
import userReducers from "./features/userSlice";
import airVisualReducers from "./features/airVisualAPISlice";
import badgeReducers from "./features/badgeSlice";

export default configureStore({
  reducer: {
    airVisual: airVisualReducers,
    badge: badgeReducers,
    user: userReducers,
    gemini: geminiReducers,
    location: locationReducers,
    event: eventReducers,
  },
});
