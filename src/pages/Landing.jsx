import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Organizations from "../components/Organizations";
import Testimonial from "../components/Testimonial";

function Landing() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Organizations />
      <Testimonial />
    </>
  );
}

export default Landing;
