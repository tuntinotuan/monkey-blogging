import React from "react";
import PropTypes from "prop-types";

const CardStatus = ({ bgColor, title, children }) => {
  return (
    <div
      className={`flex flex-col justify-between gap-5 w-full h-[200px] text-white shadow-sm rounded-3xl p-7 ${bgColor} select-none group`}
    >
      <div className="text-4xl font-bold text-center">{title}</div>
      <div className="flex items-center justify-around">{children}</div>
    </div>
  );
};

CardStatus.propTypes = {
  bgColor: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
};

CardStatus.defaultProps = {
  bgColor: "bg-gray-800",
  title: "Status Any",
};

export default CardStatus;
