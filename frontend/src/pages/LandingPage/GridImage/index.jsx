import React from "react";
import { Link } from "react-router-dom";
const GridImage = ({ movies, actorList }) => {
  // if문써서 return 을 다르게

  if (actorList) {
    return (
      <div className=" grid w-10/12 mx-auto sm:grid-cols-3 mt-10 gap-10 xl:grid-cols-4 grid-cols-1">
        {actorList.map((actor, i) => (
          <div key={i}>
            {actor.profile_path ? (
              <img
                className=""
                src={`${import.meta.env.VITE_BASE_IMAGE_URL}${
                  actor.profile_path
                }`}
                alt={actor.name}
              />
            ) : (
              <div className="flex items-center justify-center flex-col h-full">
                <p> 이미지 없음</p>
                <p>이름 : {actor.name}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className=" grid w-10/12 mx-auto sm:grid-cols-3 mt-10 gap-10 xl:grid-cols-4 grid-cols-1">
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
              <div className="opacity-0 bg-white  absolute top-[0] left-[0] w-full h-full hover:opacity-100 flex justify-center items-center transition duration-500">
                {
                  <p className=" text-black text-5xl text-center">
                    {movie.title}
                  </p>
                }
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }
};

export default GridImage;
