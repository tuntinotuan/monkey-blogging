import React from "react";
import { useDropdown } from "./dropdown-context";
import ReactDOM from "react-dom";

const List = ({ children }) => {
  const { show, coords } = useDropdown();
  if (typeof document === "undefined") return <></>;
  return ReactDOM.createPortal(
    <div
      className={`absolute top-0left-0w-full rounded bg-white shadow-md transition-all duration-300 ${
        show ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      style={
        coords && {
          top: coords.top + coords.height + window.scrollY + 1,
          left: coords.left,
          width: coords.width,
        }
      }
    >
      {children}
    </div>,
    document.querySelector("body")
  );
};

export default List;
