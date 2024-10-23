import React from "react";
import "./App.css";
import { Landing, Login, SignUp, Home, MapPage, AskAIPage } from "./pages";
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
            <Route path="/askai" element={<AskAIPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
