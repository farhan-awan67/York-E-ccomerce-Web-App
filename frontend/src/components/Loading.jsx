import React from "react";

const Loading = ({ className }) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <span
        className={`${className} border-gray-100 border-t-gray-700 animate-spin`}
      ></span>
    </div>
  );
};

export default Loading;
