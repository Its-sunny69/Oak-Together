import React from "react";
import { ProfilePng, QuotePng } from "../assets";

function TestimonialCard() {
  return (
    <>
      <div className="w-60 bg-transparent backdrop-blur-sm shadow-lg mx-3 p-5 rounded-lg hover:scale-110 transition-all">
        <div className=" flex justify-end items-center">
          <img src={QuotePng} alt="" className="w-[20%]" />
        </div>

        <div className="my-8 h-54 flex justify-center items-center">
          <p className="text-sm opacity-80">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
            laborum eius laudantium ipsa quas modi commodi eligendi facere
            repudiandae aliquid!
          </p>
        </div>

        <div className="flex justify-start items-center">
          <img src={ProfilePng} alt="" className="w-[15%]" />

          <div className="ml-3">
            <p className="font-semibold">Username</p>
            <p className="text-[0.7rem] text-slate-500">In Event XYZ</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default TestimonialCard;
