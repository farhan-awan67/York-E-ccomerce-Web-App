import React from "react";

const Navbar = () => {
  return (
    <div class="flex items-center py-2 px-[4%] justify-between">
      <img class="w-[max(10%,80px)]" src="/assets/logo-BI5h54w2.png" alt="" />
      <button class="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
