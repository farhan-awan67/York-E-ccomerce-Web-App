import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { MdOutlineShoppingBag, MdToken } from "react-icons/md";
import { CiMenuFries } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import { ShopContext } from "../context/shopContext";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const { setShowSearch, getCartCount, navigate, setToken, token } =
    useContext(ShopContext);

  const handleNavigate = () => {
    if (token) {
      return null;
    } else {
      navigate("/login");
    }
  };

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <div className="flex justify-between items-center py-4">
      <h1
        onClick={() => navigate("/")}
        className="text-[45px] tracking-tighter leading-none cursor-pointer"
      >
        York.
      </h1>
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
          to={"https://york-e-ccomerce-web-app-15zm.vercel.app"}
        >
          <p className="border px-5 text-xs rounded-full -mt-2 py-2">
            Admin Panel
          </p>
        </NavLink>
      </div>
      <div className="flex justify-between items-center gap-3 md:gap-3">
        <CiSearch
          onClick={() => setShowSearch(true)}
          className="text-[26px] font-bold cursor-pointer"
        />
        <div className="group relative">
          <CiUser
            className="text-[26px] font-bold cursor-pointer"
            onClick={handleNavigate}
          />
          {token && (
            <div className="hidden group-hover:block absolute right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 px-5 py-3 bg-slate-100 text-teal-600">
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        <Link to={"/cart"} className="relative">
          <MdOutlineShoppingBag className="text-[26px] font-bold" />
          <p className="bg-black text-white absolute rounded-full text-center leading-4 text-[8px] aspect-square w-4 bottom-[-5px] right-[-5px]">
            {getCartCount()}
          </p>
        </Link>
        <CiMenuFries
          onClick={() => {
            setMenu(!menu);
          }}
          className="text-[24px] font-extrabold block sm:hidden cursor-pointer"
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
