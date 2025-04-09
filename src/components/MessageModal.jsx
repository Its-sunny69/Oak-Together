import React from "react";
import { SuccessMessagePng } from "../assets";

function MessageModal({ setIsModalVisible, task, message }) {
  return (
    <div className="w-[60%] bg-white mx-auto rounded-lg p-4 border relative overflow-clip">
      <img
        src={SuccessMessagePng}
        alt=""
        className="absolute w-[65%] -right-10 -top-10 bottom-0 opacity-30"
      />
      <div className="w-3/5 z-10">
        <p className=" text-lg">{task}</p>
        <p className="text-4xl font-extrabold text-[#60D6D9]">Successfully!</p>
        <p className="text-sm my-4 text-[#00000099]">
          {message}
          <br />
          Inform your friends regarding this!
        </p>
      </div>
      <div className="mt-20 flex justify-center items-center">
        <button
          className="px-14 z-10 py-2 rounded-lg bg-gradient-120 shadow-md from-[#83E2C1] from-50% to-[#1566E7] to-100% hover:from-[#1566E7] hover:to-[#83E2C1] text-white"
          onClick={() => setIsModalVisible(false)}
        >
          Done
        </button>
      </div>
    </div>
  );
}

export default MessageModal;
