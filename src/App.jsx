import React, { useEffect } from "react";
import "./App.css";
import {
  Landing,
  Login,
  SignUp,
  Home,
  MapPage,
  AskAIPage,
  UserProfile,
  Events,
} from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import EventInfo from "./pages/EventInfo";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import EventDetail from "./components/EventDetail";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById, loginUser } from "./features/userSlice";
import PrivateRoute from "./PrivateRoute";
import "@lottiefiles/lottie-player";

function App() {
  const userId = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("userdata dipatch from App.jsx");
    if (userId) dispatch(fetchUserById(userId));
  }, [userId]);
  return (
    <>
      <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,

              success: {
                duration: 3000,
              },

              error: {
                duration: 3000,
              },
            }}
          />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/map"
              element={
                <PrivateRoute>
                  <MapPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/events"
              element={
                <PrivateRoute>
                  <Events />
                </PrivateRoute>
              }
            />
            <Route
              path="/events/details/:eventId"
              element={
                <PrivateRoute>
                  <EventInfo />
                </PrivateRoute>
              }
            />
            <Route
              path="/askai"
              element={
                <PrivateRoute>
                  <AskAIPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/learnings"
              element={
                <PrivateRoute>
                  <EventInfo />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <UserProfile />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
        </LocalizationProvider>
      </div>
    </>
  );
}

export default App;
