import { IconDocument, IconLongArrow } from "components/icon";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const CardOverview = ({
  bgColor = "bg-darkPrimary",
  size = "oo",
  text = "Current Any",
  to = "/",
}) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className={`flex flex-col justify-between w-full h-[200px] text-white rounded-3xl transition-all p-7 ${bgColor}`}
    >
      <div className="flex items-start justify-between p-0">
        <IconLongArrow
          className={`transition-all ${
            hover ? "customize-bounce opacity-100" : "opacity-0"
          }`}
        ></IconLongArrow>
        <Link
          to={to}
          className={`flex items-center justify-center w-10 h-10 bg-white bg-opacity-20 rounded-xl`}
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
        >
          <IconDocument></IconDocument>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <h1 className="text-5xl font-bold">{size}</h1>
        <p className="text-md font-semibold">{text}</p>
      </div>
    </div>
  );
};

export default CardOverview;
