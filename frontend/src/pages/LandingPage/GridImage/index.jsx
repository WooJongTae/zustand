import React from "react";

const GridImage = ({ movies }) => {
  return (
    <div className=" grid w-10/12 mx-auto grid-cols-4 mt-10 gap-10">
      {movies.map((movie) => (
        <div>
          <img
            className=""
            src={`${import.meta.env.VITE_BASE_IMAGE_URL}${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
      ))}
    </div>
  );
};

export default GridImage;
