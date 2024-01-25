import React from "react";
import { Link } from "react-router-dom";
const GridImage = ({ movies, actorList }) => {
  // if문써서 return 을 다르게

  if (actorList) {
    return (
      <div className=" grid w-10/12 mx-auto grid-cols-4 mt-10 gap-10">
        {actorList.map((actor) => (
          <div>
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
        {movies.map((movie) => (
          <Link to={`movie/${movie.id}`}>
            <div className=" relative">
              <div className="  hover:bg-slate-500">
                <img
                  className=""
                  src={`${import.meta.env.VITE_BASE_IMAGE_URL}${
                    movie.poster_path
                  }`}
                  alt={movie.title}
                />
              </div>
              <div className="opacity-0  absolute top-[0] left-[0] w-full h-full hover:opacity-1 flex justify-center items-center">
                123142515
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }
};

export default GridImage;
