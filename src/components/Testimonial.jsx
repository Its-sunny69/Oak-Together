import TestimonialCard from "./TestimonialCard";
import { Tree1Png } from "../assets/assets";
import "../App";  // <- this import does what??

function Testimonial() {
  return (
    <>
      <div className="my-5">
        <p className="text-center text-2xl font-semibold">WHAT PEOPLE SAY</p>

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
