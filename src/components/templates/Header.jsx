import React from "react";
import { Link } from "react-router-dom";

function Header({ data }) {
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.7) ,rgba(0,0,0,0.9)),url(https://image.tmdb.org/t/p/original${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "top 10%",
        backgroundSize: "cover",backgroundRepeat:'no-repeat'
      }}
      className="w-full  text-zinc-500 h-[50vh] flex flex-col justify-end p-[5%] items-start "
    >
      <h1 className="w-[70%]  text-3xl font-black bg-transparent">
        {" "}
        {data.name || data.original_name || data.original_title}{" "}
      </h1>

      <p className="w-[70%] bg-transparent ">
        {" "}
        {data.overview.slice(0, 200)}{" "}
        <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-400 bg-transparent">...More</Link>{" "}
      </p>
      <p className=" flex gap-x-2 mb-2 bg-transparent">
        <i className="text-yellow-500 ri-megaphone-fill bg-transparent"></i>
        {data.release_date || "Not Available "}
        <i className="text-yellow-500 ri-album-fill bg-transparent"></i>
        {data.media_type}
      </p>

      <Link to={`/${data.media_type}/details/${data.id}/trailer`} className="p-3 bg-[#6556CD] rounded text-white font-semibold">
        Watch Trailer
      </Link>
    </div>
  );
}

export default Header;
