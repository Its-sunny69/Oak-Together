import React from "react";
import TestimonialCard from "./TestimonialCard";
import { Tree1Png } from "../assets/assets";
import "../App";

function Testimonial() {
  return (
    <>
      <div className="my-5">
        <p className="text-center text-2xl font-semibold">WHAT PEOPLE SAY'S</p>

        <div className="flex justify-center items-center mt-14 relative">
          <img
            src={Tree1Png}
            alt=""
            className="z-0 absolute w-[30%] opacity-40"
          />

          <div className="z-10 flex justify-center items-center">
            <TestimonialCard />
            <TestimonialCard />
            <TestimonialCard />

          </div>
        </div>
      </div>
    </>
  );
}

export default Testimonial;
