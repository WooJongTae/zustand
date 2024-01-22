import axios from "axios";
import React, { useEffect, useState } from "react";
import MainImage from "./MainImage";
import GridImage from "./GridImage";

const LandingPage = () => {
  const [movies, setMovies] = useState([]);
  const [mainMovieImage, setMainMovieImage] = useState([]);
  console.log(movies);
  useEffect(() => {
    const movieData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}movie/popular?api_key=${
            import.meta.env.VITE_API_KEY
          }&language=ko-KR&page=1&region=ko`
        );
        setMovies(response.data.results);
        setMainMovieImage(response.data.results[0]);
      } catch (error) {
        console.log(error);
      }
    };
    movieData();
  }, []);
  return (
    <div className="w w-full">
      {mainMovieImage && (
        <MainImage
          imagePath={`${import.meta.env.VITE_BASE_IMAGE_URL}${
            mainMovieImage.backdrop_path
          }`}
          title={mainMovieImage.title}
          sub={mainMovieImage.overview}
        />
      )}
      <GridImage movies={movies} />
    </div>
  );
};

export default LandingPage;
