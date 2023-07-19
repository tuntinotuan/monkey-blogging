import React from "react";
import { useDropdown } from "./dropdown-context";

const Option = (props) => {
  const { className, onClick, colorType = "default", hoverBg } = props;
  const { setShow } = useDropdown();
  const handleClick = () => {
    onClick && onClick();
    setShow(false);
  };
  let styleText = "";
  switch (colorType) {
    case "approved":
    case "admin":
    case "active":
      styleText = "text-darkPrimary bg-green-100";
      break;
    case "pending":
    case "moderator":
      styleText = "text-orange-500 bg-orange-100";
      break;
    case "unapproved":
    case "rejected":
    case "banned":
    case "user":
      styleText = "text-red-500 bg-red-100";
      break;

    default:
      break;
  }
  return (
    <div
      className={`px-5 py-4 cursor-pointer flex items-center justify-between transition-all hover:font-bold rounded ${className} ${styleText} ${
        hoverBg ? "hover:bg-gray-100" : ""
      }`}
      onClick={handleClick}
    >
      {props.children}
    </div>
  );
};

export default Option;
