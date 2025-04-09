import React from "react";
import "./App.css";
import { Landing, Login, SignUp, Home, MapPage, AskAIPage, UserProfile, Events } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { duration } from "@mui/material"; // What does this import do?


function App() {
  return (
    <>
      <div>
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
            <Route path="/home" element={<Home />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/events" element={<Events />} />
            <Route path="/askai" element={<AskAIPage />} />
            {/* <Route path="/learnings" element={} /> */}
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
