import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removemovie } from "../store/actions/movieActions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loader from "./templates/Loader";
import HorizontalCards from "../components/templates/HorizontalCards";

function Moviedetails() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, []);

  document.title = `Jetflix Movieapp | movie  |  Details` 

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.7) ,rgba(0,0,0,0.9)),url(https://image.tmdb.org/t/p/original${info.detail.backdrop_path})`,
        backgroundPosition: "top 10%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-screen h-screen px-[10%] overflow-hidden relative overflow-y-auto"
    >
      {/* part one navigation  */}

      <nav className="h-[10vh] items-center w-full  text-zinc-100 flex gap-10 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6554CD] ri-arrow-left-line "
        >
          {" "}
        </Link>

        <a
          target="_blank"
          href={info.detail.homepage}
          className=" hover:text-[#6554CD]"
        >
          <i className="ri-external-link-fill "></i>
        </a>
        <a
          target="_blank"
          className=" hover:text-[#6554CD]"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="ri-earth-fill bg-transparent"></i>
        </a>
        <a
          target="_blank"
          className=" hover:text-[#6554CD]"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
        >
          IMDB
        </a>
      </nav>

      {/* part two poseter and details  */}

      <div className="w-full bg-transparent flex ">
        <img
          className=" shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[40vh] object-cover "
          src={`https://image.tmdb.org/t/p/original${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
        />

        <div className="content bg-transparent ml-10 text-zinc-200">
          <h1 className="text-4xl font-black ">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title ||
              ""}

            <small className="text-xl font-bold text-zinc-500">
              {" "}
              ({info.detail.release_date.split("-")[0]}){" "}
            </small>

            <div className="bg-transparent gap-2 flex text-zinc-400 text-[13px]">
              {info.detail.vote_average && (
                <span className="text-purple-200 rounded-full bg-yellow-800 w-8 pl-1.5 text-[13px] top-[70%] left-[-10%] ">
                  {info.detail.vote_average.toFixed(1) || ""}
                </span>
              )}
              <h1> User Score </h1>
              <h1> {info.detail.release_date} </h1>
              <h1> {info.detail.genres.map((g) => g.name).join(",")} </h1>
              <h1 className="text-zinc-300">
                {" "}
                {`${info.detail.runtime} min`}{" "}
              </h1>
            </div>
          </h1>
          <h1 className="text-xl font-semibold italic ">
            {info.detail.tagline}
          </h1>
          <h1 className="text-2xl mb-3 mt-5 font-semibold"> OverView </h1>
          <p className="text-zinc-300">{info.detail.overview}</p>
          <h1 className="text-2xl mb-3 mt-5 font-semibold">
            {" "}
            Movie Translated{" "}
          </h1>
          <p className="text-[12px] text-zinc-400">
            {info.translations.map((lan) => lan.english_name).join(", ")}
          </p>
          <div className="mt-10 bg-transparent">
            <Link
              to={`${pathname}/trailer`}
              className="p-3 bg-[#6554CD] rounded-md hover:bg-[#392a99]"
            >
              <i className="ri-play-fill"> </i>
              Play Trailer
            </Link>
          </div>
        </div>
      </div>

      {/* part 3 avalable platforms */}

      <div className="bg-transparent">
        <div className="bg-transparent w-[15%]  top-[50%] left-10%">
          <div className="bg-transparent mt-5 grid grid-rows-4 grid-flow-col gap-6">
            {info.watchproviders &&
              info.watchproviders.flatrate.map((provider, index) => (
                <img
                  className="w-[5vh] h-[5vh] object-cover rounded-md"
                  key={index}
                  src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                />
              ))}

            {info.watchproviders &&
              info.watchproviders.rent &&
              info.watchproviders.rent.map((provider, index) => (
                <img
                  className="w-[5vh] h-[5vh] object-cover rounded-md"
                  key={index}
                  src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                />
              ))}

            {info.watchproviders &&
              info.watchproviders.buy &&
              info.watchproviders.buy.map((provider, index) => (
                <img
                  className="w-[5vh] h-[5vh] object-cover rounded-md"
                  key={index}
                  src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                />
              ))}
          </div>
        </div>
      </div>

      {/* part 4 recommendation and similair stuff  */}
      <HorizontalCards
        data={info.recommendation ? info.recommendation : info.similar}
      />

      <Outlet />
    </div>
  ) : (
    <Loader />
  );
}

export default Moviedetails;
