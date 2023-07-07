import React from "react";
import PropTypes from "prop-types";
import { IconMoon, IconSun } from "components/icon";

const ToggleDarkMode = (props) => {
  const { on, onClick, ...rest } = props;

  return (
    <label>
      <input
        type="checkbox"
        checked={on}
        onClick={onClick}
        className="hidden-input"
        onChange={() => {}}
      />
      <div
        className={`inline-block w-[70px] h-[42px] relative cursor-pointer rounded-full p-1 transition-all ${
          on ? "bg-gray-800" : "bg-gray-300"
        }`}
        {...rest}
      >
        <span
          className={`flex items-center justify-center transition-all duration-700 w-[34px] h-[34px] rounded-full ${
            on ? "translate-x-[28px] bg-darkMain" : "bg-white"
          }`}
        >
          {on ? <IconMoon></IconMoon> : <IconSun></IconSun>}
        </span>
      </div>
    </label>
  );
};

ToggleDarkMode.propTypes = {
  on: PropTypes.bool,
  onClick: PropTypes.func,
};

export default ToggleDarkMode;
