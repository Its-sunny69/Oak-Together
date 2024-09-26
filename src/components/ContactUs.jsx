import React from "react";
import ContactBox from "./ContactBox";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';

function ContactUs() {
  return (
    <>
      <div className="my-24">
        <p className="text-center text-2xl font-semibold">Contact Us</p>

        <div className="flex flex-col justify-center items-center mt-14">
          <div className="w-full flex flex-col">
            <p className="text-2xl">We would love to hear from you</p>
            <p className="text-sm text-slate-500">
              Our Friendly Team Is Here Always To Chat
            </p>
          </div>

          <div className="w-full my-10 flex justify-center items-center">
            <ContactBox
              icon={<ChatOutlinedIcon sx={{ color: "#0053ed" }} />}
              title={"Chat to Support"}
              subTitle={"We are here to Help"}
              contact={"Start New Chat"}
              contactHref={""}
            />
            <ContactBox
              icon={<MailOutlineIcon sx={{ color: "#0053ed" }} />}
              title={"Chat to Sales"}
              subTitle={"Speak to our Friendly Team"}
              contact={"Help@email.com"}
              contactHref={""}
            />
            <ContactBox
              icon={<PinDropOutlinedIcon sx={{ color: "#0053ed" }} />}
              title={"Visit Us"}
              subTitle={"Visit Office HQ."}
              contact={"See on Map"}
              contactHref={""}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
