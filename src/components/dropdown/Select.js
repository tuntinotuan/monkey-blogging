import React from "react";
import { useDropdown } from "./dropdown-context";
import { IconArrowDown } from "components/icon";

const Select = ({ active, placeholder = "", padding = 5, arrowSize }) => {
  const { toggle, show, nodeRef } = useDropdown();
  let styleText = "";
  switch (active) {
    case "approved":
    case "admin":
    case "active":
      styleText = "text-darkPrimary";
      break;
    case "pending":
    case "moderator":
      styleText = "text-orange-500";
      break;
    case "unapproved":
    case "rejected":
    case "banned":
    case "user":
      styleText = "text-red-500";
      break;

    default:
      break;
  }
  return (
    <div
      className={`flex items-center justify-between p-${padding} bg-[#E7ECF3] rounded cursor-pointer font-medium ${
        active ? "dark:shadow-darkmode !font-bold" : ""
      }`}
      onClick={toggle}
      ref={nodeRef}
    >
      <span className={`capitalize ${active ? styleText : ""}`}>
        {placeholder}
      </span>
      <IconArrowDown
        className={`transition-all duration-300 ${show ? "-rotate-180" : ""}`}
        size={arrowSize}
      ></IconArrowDown>
    </div>
  );
};

export default Select;
