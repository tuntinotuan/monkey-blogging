import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const StatusItem = ({ children, textColor = "", figures, to = "" }) => {
  return (
    <Link to={`/${to}`} className="relative flex items-center gap-2">
      <StatusChildren
        children={children}
        textColor={textColor}
      ></StatusChildren>
      <span
        className={`relative inline-block w-5 h-5 rounded-full bg-current ${textColor}`}
      >
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-100 ${textColor}`}
        ></span>
      </span>
      <p className={`font-semibold`}>{figures || 0}</p>
    </Link>
  );
};

function StatusChildren({ children = "Approved", textColor }) {
  return (
    <div
      className={`absolute text-xs font-semibold rounded-md bg-current ${textColor} px-3 py-1 -translate-y-[109%] -translate-x-1/3 transition-all duration-500 invisible opacity-0 group-hover:visible group-hover:opacity-100`}
    >
      <span className="text-white">{children}</span>
    </div>
  );
}

StatusItem.propTypes = {
  children: PropTypes.node,
  textColor: PropTypes.string,
  figures: PropTypes.number,
  to: PropTypes.string,
};

export default StatusItem;
