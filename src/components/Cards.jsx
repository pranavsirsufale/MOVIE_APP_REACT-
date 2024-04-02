import React from "react";
import { Link } from "react-router-dom";
import noimage from '../img/noimage.jpeg'


function Cards({ data, title }) {

  console.log(data);

  return (
    <div className="flex flex-wrap w-full ">
      {data.map((card, index) => (
        <Link to={`/${card.media_type || title }/details/${card.id}`} className="relative w-[25vh] m-[5%] " key={index}>
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] w-[40vh] object-cover hover:scale-110 ease-linear duration-300"
            src={ card.poster_path || card.backdrop_path || card.profile_path ? `https://image.tmdb.org/t/p/original${
              card.poster_path || card.backdrop_path || card.profile_path  
            }` : noimage }
            alt=""
          />

          <h1 className="text-xl mt-2 text-zinc-400 bg-transparent font-semibold">
            {card.name || card.original_name || card.original_title}
          </h1>

          {card.vote_average && (
            <div className="text-purple-200 rounded-full bg-yellow-800 w-8 pl-1.5 absolute top-[70%] left-[-10%] hover:scale-110 ease-linear duration-100">
              {card.vote_average?.toFixed(1) || ""}
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}

export default Cards;
