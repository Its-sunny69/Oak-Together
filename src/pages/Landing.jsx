import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Organizations from "../components/Organizations";
import Testimonial from "../components/Testimonial";
import ContactUs from "../components/ContactUs";
import AboutUs from "../components/AboutUs";

function Landing() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Organizations />
      <Testimonial />
      <AboutUs />
      <ContactUs />
    </>
  );
}

export default Landing;
