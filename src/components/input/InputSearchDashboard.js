import React from "react";
import PropTypes from "prop-types";

const InputSearchDashboard = ({
  className,
  placeholder = "Search any...",
  onChange = () => {},
}) => {
  return (
    <div className="w-full max-w-[250px]">
      <input
        type="text"
        className="w-full py-3 px-4 rounded-lg dark:bg-gray-800 dark:text-white dark:border-none border border-solid border-gray-300"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

InputSearchDashboard.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputSearchDashboard;
