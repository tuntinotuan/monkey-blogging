import { useEffect } from "react";
import { useRef } from "react";
import { createContext, useContext, useState } from "react";

const DropdownContext = createContext();
function DropdownProvider(props) {
  const nodeRef = useRef(null);
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState(null);
  const toggle = (e) => {
    setShow(!show);
    setCoords(e.currentTarget.getBoundingClientRect());
  };
  useEffect(() => {
    function handleClickOutSide(e) {
      if (
        nodeRef.current &&
        !nodeRef.current.contains(e.target) &&
        !e.target.matches("button")
      ) {
        setShow(false);
      }
    }
    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, []);
  const values = { show, setShow, toggle, coords, setCoords, nodeRef };
  return (
    <DropdownContext.Provider value={values}>
      {props.children}
    </DropdownContext.Provider>
  );
}
function useDropdown() {
  const context = useContext(DropdownContext);
  if (typeof context === "undefined")
    throw new Error("useDropdown must be used within DropdownProvider");
  return context;
}
export { useDropdown, DropdownProvider };
