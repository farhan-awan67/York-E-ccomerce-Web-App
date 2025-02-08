import { useState } from "react";
import { Link,NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { MdOutlineShoppingBag } from "react-icons/md";
import { CiMenuFries } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";

const Header = () => {
  const [menu, setMenu] = useState(false);
  return (
    <div className="flex justify-between items-center py-4">
      <h1 className="text-[45px] tracking-tighter leading-none">York.</h1>
      <div className="justify-between items-center gap-4 hidden sm:flex text-[#5D5C68]">
        <NavLink
          className="flex justify-between items-center flex-col gap-0.5"
          to={"/"}
        >
          <p className="text-[16px] font-medium">HOME</p>
          <hr className="h-0.5 bg-[#5D5C68] w-4 rounded hidden" />
        </NavLink>
        <NavLink
          className="flex justify-between items-center flex-col gap-0.5"
          to={"/collection"}
        >
          <p className="text-[16px] font-medium">COLLECTION</p>
          <hr className="h-0.5 bg-[#5D5C68] w-4 rounded hidden" />
        </NavLink>
        <NavLink
          className="flex justify-between items-center flex-col gap-0.5"
          to={"/about"}
        >
          <p className="text-[16px] font-medium">ABOUT</p>
          <hr className="h-0.5 bg-[#5D5C68] w-4 rounded hidden" />
        </NavLink>
        <NavLink
          className="flex justify-between items-center flex-col gap-0.5"
          to={"/contact"}
        >
          <p className="text-[16px] font-medium">CONTACT</p>
          <hr className="h-0.5 bg-[#5D5C68] w-4 rounded hidden" />
        </NavLink>
        <NavLink
          className="flex justify-between items-center flex-col gap-0.5"
          to={"/admin"}
        >
          <p className="text-[14px] font-medium rounded-full py-1 px-2 border-2 border-[#5D5C68]">
            Admin Panel
          </p>
        </NavLink>
      </div>
      <div className="flex justify-between items-center gap-3 md:gap-3">
        <CiSearch className="text-[26px] font-bold" />
        <div className="group relative">
          <CiUser className="text-[26px] font-bold cursor-pointer" />
          <div className="hidden group-hover:block absolute right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 px-5 py-3 bg-slate-100 text-teal-600">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>
        <Link to={"/cart"} className="relative">
          <MdOutlineShoppingBag className="text-[26px] font-bold" />
          <p className="bg-black text-white absolute rounded-full text-center leading-4 text-[8px] aspect-square w-4 bottom-[-5px] right-[-5px]">
            0
          </p>
        </Link>
        <CiMenuFries
          onClick={() => {
            setMenu(!menu);
            console.log("clicked");
          }}
          className="text-[24px] font-extrabold block sm:hidden"
        />
      </div>

      {/* side bar */}
      {menu ? (
        <div
          className={`absolute top-0 right-0 bottom-0 left-0 bg-white transition-all duration-300 ease-in-out transform ${
            menu ? "translate-x-0" : "translate-x-full"
          } flex items-start p-4 flex-col gap-4 text-[#5D5C68]`}
        >
          <IoIosClose
            onClick={() => setMenu(!menu)}
            className="text-[24px] font-extrabold block"
          />
          <NavLink
            className="flex justify-between items-center flex-col gap-0.5"
            to={"/"}
          >
            <p
              onClick={() => {
                setMenu(!menu);
                console.log("clicked");
              }}
              className="text-[16px] font-medium"
            >
              HOME
            </p>
            <hr className="h-0.5 bg-[#5D5C68] w-4 rounded hidden" />
          </NavLink>
          <NavLink
            className="flex justify-between items-center flex-col gap-0.5"
            to={"/collection"}
          >
            <p
              onClick={() => {
                setMenu(!menu);
                console.log("clicked");
              }}
              className="text-[16px] font-medium"
            >
              COLLECTION
            </p>
            <hr className="h-0.5 bg-[#5D5C68] w-4 rounded hidden" />
          </NavLink>
          <NavLink
            className="flex justify-between items-center flex-col gap-0.5"
            to={"/about"}
          >
            <p
              onClick={() => {
                setMenu(!menu);
                console.log("clicked");
              }}
              className="text-[16px] font-medium"
            >
              ABOUT
            </p>
            <hr className="h-0.5 bg-[#5D5C68] w-4 rounded hidden" />
          </NavLink>
          <NavLink
            className="flex justify-between items-center flex-col gap-0.5"
            to={"/contact"}
          >
            <p
              onClick={() => {
                setMenu(!menu);
                console.log("clicked");
              }}
              className="text-[16px] font-medium"
            >
              CONTACT
            </p>
            <hr className="h-0.5 bg-[#5D5C68] w-4 rounded hidden" />
          </NavLink>
          <NavLink
            className="flex justify-between items-center flex-col gap-0.5"
            to={"/admin"}
          >
            <p
              onClick={() => {
                setMenu(!menu);
                console.log("clicked");
              }}
              className="text-[14px] font-medium rounded-full"
            >
              Admin Panel
            </p>
          </NavLink>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Header;
