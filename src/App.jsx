import React from "react";
import "./App.css";
import {Landing, Login, SignUp, Home } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
