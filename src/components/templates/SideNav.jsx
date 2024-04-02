import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useEffect } from "react";

function SideNav() {
  return (
    <div className="w-[20%] max-h-full  border-r-2 border-zinc-400 p-5">
      <h1 className="text-2xl text-white">
        {" "}
        <i className="ri-tv-fill text-[#6556Cd] mr-3"></i>{" "}
        <span className="">JETFLIX</span>{" "}
      </h1>

      <nav className="flex flex-col gap-2 text-zinc-400 text-xl">
        <h1 className="text-white font-semibold text-xl mb-1 mt-1 ">
          {" "}
          New Feeds
        </h1>
        <NavLink to='/trending' className="hover:bg-[#6556Cd] hover:text-white p-2 rounded-lg duration-300 ">
          {" "}
          <i className="ri-fire-fill"></i> Treanding{" "}
        </NavLink>
        <Link to='/popular' className="hover:bg-[#6556Cd] hover:text-white p-2 rounded-lg duration-300 ">
          {" "}
          <i className="ri-bard-line"></i> Popular{" "}
        </Link>
        <Link to='/movie' className="hover:bg-[#6556Cd] hover:text-white p-2 rounded-lg duration-300 ">
          {" "}
          <i className="ri-movie-2-fill"></i> movies{" "}
        </Link>
        <Link to='/tvshows' className="hover:bg-[#6556Cd] hover:text-white p-2 rounded-lg duration-300 ">
          {" "}
          <i className="ri-tv-line"></i> TV shows{" "}
        </Link>
        <Link to='/people' className="hover:bg-[#6556Cd] hover:text-white p-2 rounded-lg duration-300 ">
          {" "}
          <i className="ri-team-fill"></i> People{" "}
        </Link>
      </nav>
      <hr className="border-none h-[1px] mt-5 bg-zinc-400" />

      <nav className="flex flex-col gap-2 text-zinc-400 text-xl">
        <h1 className="text-white font-semibold  mb-1 mt-5 "> About Us </h1>
        <Link className="hover:bg-[#6556Cd] hover:text-white p-2 rounded-lg duration-300 ">
          {" "}
          <i className="ri-information-fill"></i> About{" "}
        </Link>
        <Link className="hover:bg-[#6556Cd] hover:text-white p-2 rounded-lg duration-300 ">
          {" "}
          <i className="ri-phone-fill"></i> Contact{" "}
        </Link>
      </nav>
    </div>
  );
}

export default SideNav;
