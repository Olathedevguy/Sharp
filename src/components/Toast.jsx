import React from "react";
import PropTypes from "prop-types";

const Toast = ({ message, type }) => {
  // Define Tailwind classes for different toast types
  const typeClasses = {
    error: "border-red-500",
    warning: "border-yellow-500",
    success: "border-green-500",
  };

  // Get the border class based on the type or default to success
  const borderClass = typeClasses[type] || typeClasses.success;

  return (
    <div
      className={`flex items-center justify-between p-4 mb-4 border-l-4 rounded shadow bg-white text-gray-800 ${borderClass}`}
    >
      {message}
    </div>
  );
};

// Define prop types for the component
Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["error", "warning", "success"]).isRequired,
};

export default Toast;
