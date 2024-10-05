import React from "react";
import { 
  Navbar, 
  HeroSection, 
  Organizations, 
  Testimonial, 
  ContactUs, 
  AboutUs, 
  Footer 
} from "../components";

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
