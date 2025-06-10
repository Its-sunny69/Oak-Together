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
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Landing() {

  const navigate = useNavigate();
  const userID = useSelector((state) => state.user.user);

  if(userID) navigate("/home");

  return (
    <>
      {!userID && <div className="mx-24 my-2">
        <Navbar />
        <HeroSection />
        <Organizations />
        <Testimonial />
        <AboutUs />
        <ContactUs />
        <Footer />
      </div>}
    </>
  );
}

export default Landing;
