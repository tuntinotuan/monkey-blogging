import { IconArrowDown } from "components/icon";
import React, { useState } from "react";

const Help = ({ data = [], initialize = false }) => {
  const [on, setOn] = useState(initialize);
  return (
    <div className="flex flex-col rounded-md dark:bg-gray-800 dark:border-none dark:shadow-black bg-white border border-gray-100 shadow-sm mb-2">
      <div
        className="flex items-center justify-between cursor-pointer p-4"
        onClick={() => setOn(!on)}
      >
        <h2 className="dark:text-darkPrimary select-none">{data.question}</h2>
        <IconArrowDown
          size="4"
          className={`dark:text-white transition-all ${
            on ? "-rotate-180" : "rotate-0"
          }`}
        ></IconArrowDown>
      </div>
      <p
        className={`dark:text-darkTextA0 text-gray-400 overflow-hidden transition-all ${
          on
            ? "dark:border-t-darkMain border border-transparent border-t-gray-100 p-4 opacity-100 visible"
            : "h-0 opacity-0 invisible"
        }`}
      >
        {data.answer}
      </p>
    </div>
  );
};

export default Help;
