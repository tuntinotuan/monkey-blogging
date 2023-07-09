import { IconDocument } from "components/icon";
import React from "react";
import { Link } from "react-router-dom";

const CardOverview = ({
  bgColor = "bg-darkPrimary",
  size = "oo",
  text = "Current Any",
  to = "/",
}) => {
  return (
    <div
      className={`flex flex-col justify-between w-full h-[200px] text-white rounded-3xl transition-all p-7 ${bgColor} group`}
    >
      <Link
        to={to}
        className="flex items-center justify-center w-10 h-10 bg-white bg-opacity-20 rounded-xl group-hover:animate-bounce"
      >
        <IconDocument></IconDocument>
      </Link>
      <div className="flex items-center gap-2">
        <h1 className="text-5xl font-bold">{size}</h1>
        <p className="text-md font-semibold">{text}</p>
      </div>
    </div>
  );
};

export default CardOverview;
