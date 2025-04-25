import React from "react";
import { LoginButton, SignUpButton } from ".";
import { useNavigate } from "react-router-dom";
import { LogoPng } from "../assets";

function Navbar() {
  const navigate = useNavigate();

  const navList = ["Home", "About"];

  const handleHomeClick = () => {
    const lowerCased = item.toLowerCase();
    const pathEndPoint = (lowerCased === "home")? "home": lowerCased;
    navigate("/" + pathEndPoint)
    console.log("/" + pathEndPoint)
  }


  return (
    <div>
      <nav className=" flex justify-center items-center">
        <ul className="w-full flex items-center">
          <div>
            <li>
              <img src={LogoPng} alt="" className="w-14" />
            </li>
          </div>

          <div className="w-[30%] flex justify-center gap-4 items-center">
            {navList.map((item, index) => (
              <li
                key={index}
                className="group cursor-pointer"
                onClick={item == "Home" ? handleHomeClick : () => {}}
              >
                {item !== "About" ? item : <a href="#AboutUs">{item}</a>}
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

          
        </ul>
        <div className="w-full flex justify-end items-center">
            <button>
              <div className="rounded-lg bg-gradient-120 from-[#83E2C1] from-50% to-[#1566E7] to-100% p-[2px]">
                <LoginButton action={"/login"} />
              </div>
            </button>
            <SignUpButton action={"/signup"} />
          </div>
      </nav>
    </div>
  );
}

export default Navbar;
