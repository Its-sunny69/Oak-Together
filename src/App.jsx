import React from "react";
import "./App.css";
import Landing from "./pages/Landing";
import Login from "./pages/Login"
import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      {/* <div className=" mx-24 my-2">
        <Landing />
      </div> */}
      {/* <div className="h-screen ">
        <Login />
      </div> */}
      <div className="h-screen">
        <SignUp />
      </div>
    </>
  );
}

export default App;
