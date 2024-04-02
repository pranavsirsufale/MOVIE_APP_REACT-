import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson, removeperson } from "../store/actions/personActions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loader from "./templates/Loader";
import HorizontalCards from "../components/templates/HorizontalCards";
import Dropdown from "../components/Dropdown";

function Persondetails() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [category, setCategory] = useState("movie");
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.person);
  console.log(info);

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, []);

  return info ? (
    <div className="w-screen h-auto overflow-x-hidden ">
      {/* Part 1 navigation   */}
      <nav className="h-[10vh] items-center w-full  text-zinc-100 flex gap-10 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6554CD] ri-arrow-left-line  px-5"
        >
          {" "}
        </Link>
      </nav>

      <div className="w-full flex px-10">
        {/* Part 2 left poster and details  */}

        <div className="w-[30%] ">
          <img
            className=" shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[40vh] object-cover "
            src={`https://image.tmdb.org/t/p/original${info.detail.profile_path}`}
          />
          {/* 
          <h1 className="text-zinc-400 text-2xl font-black leading-1 mt-2 ">
            {" "}
            {info.detail.name}{" "}
          </h1> */}

          {/* <hr className="mt-10  mb-5 border-none h-[2px] bg-zinc-500" /> */}
          {/* social media links  */}
          <div className="text-xl text-white flex gap-x-5 bg-transparent">
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
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              <i className="ri-facebook-circle-fill"></i>
            </a>
            <a
              target="_blank"
              className=" hover:text-[#6554CD]"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              <i className="ri-instagram-fill bg-transparent"></i>
            </a>
            <a
              target="_blank"
              className=" hover:text-[#6554CD]"
              href={`https://twitter.com/${info.externalid.twitter_id}`}
            >
              <i className="ri-twitter-x-fill bg-transparent"></i>
            </a>
          </div>

          {/* personal information  */}

          <h1 className="text-2xl text-zinc-400 font-semibold my-2">
            {" "}
            Personal Info{" "}
          </h1>

          <h1 className=" text-zinc-400 font-semibold my-1"> Known For </h1>

          <h1 className=" text-zinc-500  my-1">
            {" "}
            {info.detail.known_for_department}{" "}
          </h1>

          <h1 className=" text-zinc-400 font-semibold my-1"> Gender </h1>

          <h1 className=" text-zinc-500  my-1">
            {" "}
            {info.detail.gender === 2 ? "Male" : "Female"}{" "}
          </h1>

          <h1 className=" text-zinc-400 font-semibold my-1"> Birth Day </h1>

          <h1 className=" text-zinc-500 my-1"> {info.detail.birthday} </h1>

          <h1 className=" text-zinc-400 font-semibold my-1">
            {" "}
            Place of Birth{" "}
          </h1>

          <h1 className=" text-zinc-500 my-1">
            {" "}
            {info.detail.place_of_birth}{" "}
          </h1>

          {/*  Part 3 right Details and Information  */}
        </div>

        <div className="w-[70%]">
          <h1 className="text-3xl text-zinc-300 font-black my-2">
            {" "}
            {info.detail.name}{" "}
          </h1>

          <h1 className="text-2xl text-zinc-400 font-semibold my-2">
            Biography
          </h1>
          <h1 className="text-zinc-400 text-sm  my-1">
            {info.detail.biography}
          </h1>

          <h1 className="text-2xl text-zinc-400 font-semibold my-2">
            Known for
          </h1>

          <HorizontalCards data={info.combinedCredits.cast} />

          <div className="w-full flex justify-between py-5">
            <h1 className="text-2xl text-zinc-400 font-semibold ">
              Category
            </h1>

            <Dropdown
              title="category"
              options={["tv", "movie"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="list-disc text-zinc-400 w-full h-72 overflow-x-hidden overflow-y-auto shadow-2xl shadow-[rgba(255,255,255,.5)] border-2 border-zinc-700 p-5 my-5">
            {info[category + "Cretids"].cast.map((c, i) => (
              <li
                key={c.id}
                className="hover:text-white hover:bg-[#19191d] duration-300 cursor-pointer rounded p-5 overflow-hidden"
              >
                <Link to={`/${category}/details/${c.id}`}>
                  <span>
                    {" "}
                    {c.name ||
                      c.title ||
                      c.original_name ||
                      c.original_title}{" "}
                  </span>
                  <span className="block">
                    {" "}
                    {c.character && `character name : ${c.character}`}{" "}
                  </span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
}

export default Persondetails;
