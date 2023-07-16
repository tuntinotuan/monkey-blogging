import React from "react";
import { useDropdown } from "./dropdown-context";
import { IconArrowDown } from "components/icon";

const Select = ({ placeholder = "" }) => {
  const { toggle, show, nodeRef } = useDropdown();
  return (
    <div
      className="flex items-center justify-between p-5 bg-[#E7ECF3] rounded cursor-pointer font-medium"
      onClick={toggle}
      ref={nodeRef}
    >
      <span>{placeholder}</span>
      <IconArrowDown
        className={`transition-all duration-300 ${show ? "-rotate-180" : ""}`}
      ></IconArrowDown>
    </div>
  );
};

export default Select;
