import React from "react";
import { Link } from "react-router-dom";
import noimage from '../../img/noimage.jpeg'

function HorizontalCards({ data, }) {

  return (
    <div className="w-full h-[40vh] p-5 bg-transparent mb-5">
      


      <div  className="w-[100%] flex h-44 p-5 overflow-y-hidden bg-transparent ">
        {data.map((trending, index) => (
          <Link to={`/${trending.media_type}/details/${trending.id}`} key={index} className="min-w-[15%] h-full m-5 bg-zinc-900">
            <img
              className="w-full object-cover"
              src={ trending.backdrop_path || trending.poster_path  ? `https://image.tmdb.org/t/p/original${
                trending.backdrop_path || trending.poster_path 
              }` : noimage }
            />

            

            <div className="text-white overflow-hidden p-3 bg-transparent">
              <h1 className="text-sm font-semibold bg-transparent ">
                {trending.title ||
                  trending.original_name ||
                  trending.oritinal_title}
              </h1>

              {/* <p className="text-sm">{trending.overview.slice(0, 50)}</p> */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HorizontalCards;
