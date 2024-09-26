import React from "react";

function ContactBox({ icon, title, subTitle, contact, contactHref }) {
  return (
    <>
      <div className="w-[22%] bg-blue-100 p-4 mx-12 rounded-lg drop-shadow-lg">
        <div className="w-fit p-3 bg-blue-200 rounded-lg flex justify-center items-center">
         {icon}
        </div>

        <div className="my-6">
          <p className="text-lg font-semibold">{title}</p>
          <p className="text-[0.8rem] text-slate-500">
           {subTitle}
          </p>
        </div>

        <div>
          <a href={contactHref} className="text-sm font-semibold text-blue-600">
            {contact}
          </a>
        </div>
      </div>
    </>
  );
}

export default ContactBox;
