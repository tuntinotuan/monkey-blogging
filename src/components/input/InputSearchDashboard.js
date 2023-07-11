import React from "react";

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

export default InputSearchDashboard;
