import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setToken }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <h1 className="text-[45px] tracking-tighter leading-none cursor-pointer">
        York Admin Panel
      </h1>
      <button
        onClick={() => (setToken(""))}
        className="cursor-pointer bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
