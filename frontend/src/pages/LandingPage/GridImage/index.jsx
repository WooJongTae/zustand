import React from "react";
import { Link } from "react-router-dom";
const GridImage = ({ movies, actorList }) => {
  // if문써서 return 을 다르게

  if (actorList) {
    return (
      <div className=" grid w-10/12 mx-auto grid-cols-4 mt-10 gap-10">
        {actorList.map((actor, i) => (
          <div key={i}>
            <img
              className=""
              src={`${import.meta.env.VITE_BASE_IMAGE_URL}${
                actor.profile_path
              }`}
              alt={actor.name}
            />
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className=" grid w-10/12 mx-auto grid-cols-4 mt-10 gap-10 ">
        {movies.map((movie, i) => (
          <Link to={`movie/${movie.id}`} key={i}>
            <div className=" relative" key={i}>
              <div className="">
                <img
                  className=""
                  src={`${import.meta.env.VITE_BASE_IMAGE_URL}${
                    movie.poster_path
                  }`}
                  alt={movie.title}
                />
              </div>
              <div className="opacity-0 bg-zinc-400  absolute top-[0] left-[0] w-full h-full hover:opacity-100 flex justify-center items-center transition duration-500">
                {<p className=" text-black">{movie.title}</p>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }
};

export default GridImage;
