import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Organizations from "../components/Organizations";
import Testimonial from "../components/Testimonial";
import ContactUs from "../components/ContactUs";
import AboutUs from "../components/AboutUs";
import Footer from "../components/Footer";

function Landing() {
  return (
    <>
      <div className="my-2">
        <Navbar />
        <HeroSection />
        <Organizations />
        <Testimonial />
        <AboutUs />
        <ContactUs />
        <Footer />
      </div>
    </>
  );
}

export default Landing;
