import React from "react";
import {
  GeminiPng,
  GlobalRecyclePng,
  MobileLegendPng,
  TrustPilotPng,
} from "../assets/assets.js";

function Organizations() {
  return (
    <>
      <div className="my-20">
        <p className="text-center tracking-widest font-semibold">
          Organizations that support our cause
        </p>

        <div className="flex justify-center items-center overflow-auto">
          <img src={MobileLegendPng} alt="" className="w-[10%] mx-16" />
          <img src={GeminiPng} alt="" className="w-[10%] mx-16" />
          <img src={TrustPilotPng} alt="" className="w-[10%] mx-16" />
          <img src={GlobalRecyclePng} alt="" className="w-[10%] mx-16" />
        </div>
      </div>
    </>
  );
}

export default Organizations;
