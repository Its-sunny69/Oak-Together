import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from "@mui/icons-material";
import React, { useState } from "react";

function GeneralDropDown({ listName, ListContent }) {
  const [isOpen, setIsOpen] = useState(false);

  const formatTitle = (str) => {
    return str
      .replace(/([A-Z])/g, " $1") // add space before capital letters
      .replace(/^./, (char) => char.toUpperCase()); // capitalize first letter
  };

  return (
    <div
      className="px-4 py-4 my-4 broder rounded-xl shadow-[3.5px_5.5px_16px_0px_#60d6d973]"
      onClick={() => setIsOpen(!isOpen)}
    >
      <p className="text-[#3BA5DA] flex justify-between items-center">{formatTitle(listName)}
        {isOpen ? <KeyboardArrowUpRounded/> : <KeyboardArrowDownRounded/>}
      </p>
      <div className={`${isOpen ? "" : "hidden"} animate-fade-down transition-all`}>
        <hr className="my-4 w-[95%] mx-auto" />
        <p>{ListContent}</p>
      </div>
    </div>
  );
}

export default GeneralDropDown;
