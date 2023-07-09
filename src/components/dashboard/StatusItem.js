import React from "react";
import { Link } from "react-router-dom";

const StatusItem = ({ textColor = "", figures, to = "" }) => {
  return (
    <Link to={`/${to}`} className="flex items-center gap-2">
      <span
        className={`relative inline-block w-5 h-5 rounded-full bg-current ${textColor}`}
      >
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-100 ${textColor}`}
        ></span>
      </span>
      <p className={`font-semibold`}>{figures}</p>
    </Link>
  );
};

export default StatusItem;
