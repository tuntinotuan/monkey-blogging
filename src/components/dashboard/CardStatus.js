import React from "react";

const CardStatus = ({
  bgColor = "bg-gray-800",
  title = "Status Any",
  children,
}) => {
  return (
    <div
      className={`flex flex-col justify-between gap-5 w-full h-[200px] text-white shadow-sm rounded-3xl p-7 ${bgColor} select-none group`}
    >
      <div className="text-4xl font-bold text-center">{title}</div>
      <div className="flex items-center justify-around">{children}</div>
    </div>
  );
};

export default CardStatus;
