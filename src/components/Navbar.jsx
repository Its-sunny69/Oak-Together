import React from "react";
import { LoginButton, SignUpButton } from ".";
import { useNavigate } from "react-router-dom";
import { LogoPng } from "../assets";

function Navbar() {
  const navigate = useNavigate();

  const navList = ["Home", "Features", "Glimps", "About"];

  return (
    <div>
      <nav className=" flex justify-center items-center">
        <ul className="w-full flex justify-between items-center">
          <div>
            <li>
              <img src={LogoPng} alt="" className="w-14" />
            </li>
          </div>

          <div className="w-[30%] flex justify-between items-center">
            {navList.map((item, index) => (
              <li
                key={index}
                className="group cursor-pointer"
                onClick={() => {
                  const lowerCased = item.toLowerCase();
                  const pathEndPoint = (lowerCased === "home")? "home": lowerCased;
                  navigate("/" + pathEndPoint)
                  console.log("/" + pathEndPoint)
                }}
              >
                {item}
                <div className="bg-gradient-120 from-[#83E2C1] from-50% to-[#1566E7] to-100% h-[2px] w-0 group-hover:w-full transition-all duration-500"></div>
              </li>
            ))}
            {/* <li className="group cursor-pointer">
              Home
              <div className="bg-gradient-120 from-[#83E2C1] from-50% to-[#1566E7] to-100% h-[2px] w-0 group-hover:w-full transition-all duration-500"></div>
            </li>
            <li className="group cursor-pointer">
              Features
              <div className="bg-gradient-120 from-[#83E2C1] from-50% to-[#1566E7] to-100% h-[2px] w-0 group-hover:w-full transition-all duration-500"></div>
            </li>
            <li className="group cursor-pointer">
              Glimps
              <div className="bg-gradient-120 from-[#83E2C1] from-50% to-[#1566E7] to-100% h-[2px] w-0 group-hover:w-full transition-all duration-500"></div>
            </li>
            <li className="group cursor-pointer">
              About
              <div className="bg-gradient-120 from-[#83E2C1] from-50% to-[#1566E7] to-100% h-[2px] w-0 group-hover:w-full transition-all duration-500"></div>
            </li> */}
          </div>

          <div className="flex justify-center items-center">
            <button>
              <div className="rounded-lg bg-gradient-120 from-[#83E2C1] from-50% to-[#1566E7] to-100% p-[2px]">
                <LoginButton action={"/login"} />
              </div>
            </button>
            <SignUpButton action={"/signup"} />
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
