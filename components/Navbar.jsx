import { assets } from "@/assets/assets";
import Image from "next/image";
import React from "react";
import { useRef } from "react";

const Navbar = () => {
  // Logout handler
  const handleLogout = () => {
    sessionStorage.removeItem("authenticated");
    router.replace("/"); // explicitly go to the login page
  };

  const sideMenuRef = useRef();

  const openMenu = () => {
    sideMenuRef.current.style.transform = "translateX(-16rem)";
  };

  const closeMenu = () => {
    sideMenuRef.current.style.transform = "translateX(16rem)";
  };

  return (
    <>
      {/* bg-[#1B1B1B] */}
      <nav className=" bg-gray-700 w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between rounded-b-[8px] z-50 ">
        <ul className="hidden md:flex items-center text-[14px] gap-6 lg:gap-15 px-12 py-3 text-[#9C9C9C] bg-opacity-50 font-mono font-normal text-sm ">
          <li>
            <a href="#top">Home</a>
          </li>
          <li>
            <a href="#top">Case Studies</a>
          </li>
          <li>
            <a href="#top">Testimonials</a>
          </li>
          <li>
            <a href="#top">Recent Work</a>
          </li>
          <li onClick={handleLogout}>
            <a href="/">Logout</a>
          </li>
        </ul>

        <div className="flex items-center gap-6 px-15">
          <a href="#top">
            <Image
              src={assets.linkedin_icon}
              className="w-18px h-17px"
              alt="LinkedIn icon"
            />
          </a>
          <a href="#top">
            <Image
              src={assets.behance_icon}
              className="w-21.6px h-13.63px"
              alt="Behance icon"
            />
          </a>
          <a href="#top">
            <Image
              src={assets.twitter_icon}
              className="w-17.54px h-14.28px"
              alt="Twitter icon"
            />
          </a>
        </div>

        <button className="block md:hidden ml-3  " onClick={openMenu}>
          <Image
            src={assets.menu_black}
            alt=""
            className="w-7 cursor-pointer"
          />
        </button>

        {/* --------------------- Mobile menu -------------------- */}

        <ul
          ref={sideMenuRef}
          className="flex md:hidden flex-col gap-4 py-20 px-10
       fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen
       bg-rose-50 transtion duration-500"
        >
          <div className="absolute right-6 top-6" onClick={closeMenu}>
            <Image
              src={assets.close_black}
              alt=""
              className="w-5 cursor-pointer"
            />
          </div>

          <li onClick={closeMenu}>
            <a href="#top">Home</a>
          </li>
          <li onClick={closeMenu}>
            <a href="top">Case Studies</a>
          </li>
          <li onClick={closeMenu}>
            <a href="top">Testimonials</a>
          </li>
          <li onClick={closeMenu}>
            <a href="top">Recent Work</a>
          </li>
          <li onClick={closeMenu}>
            <a href="/">Logout</a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
