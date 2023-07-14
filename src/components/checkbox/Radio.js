import React from "react";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";

const Radio = ({ checked, children, control, name, ...rest }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <label>
      <input
        checked={checked}
        type="radio"
        className="hidden-input"
        {...field}
        {...rest}
      />
      <div className="flex items-center gap-x-3 font-medium dark:text-darkTextA0 dark:font-normal cursor-pointer">
        <div
          className={`w-7 h-7 rounded-full ${
            checked ? "bg-green-400" : "bg-gray-200"
          }`}
        ></div>
        <span>{children}</span>
      </div>
    </label>
  );
};

Radio.propTypes = {
  checked: PropTypes.bool,
  children: PropTypes.node,
  control: PropTypes.any,
  name: PropTypes.string,
};

export default Radio;
