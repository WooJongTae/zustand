import axios from "axios";
import React, { useEffect, useState } from "react";
import MainImage from "./MainImage";
import GridImage from "./GridImage";
import axiosInstance from "../../utils/axios";

const LandingPage = () => {
  const [movies, setMovies] = useState([]);
  const [mainMovieImage, setMainMovieImage] = useState([]);
  const [currentPage, setCurrentPage] = useState(2);
  console.log(movies);

  useEffect(() => {
    const movieData = async () => {
      try {
        const response = await axiosInstance.get(
          `${import.meta.env.VITE_API_URL}movie/popular?api_key=${
            import.meta.env.VITE_API_KEY
          }&language=ko-KR&page=1&region=ko`
        );
        setCurrentPage((state) => state + 1);
        setMovies((state) => [...state, ...response.data.results]);
        setMainMovieImage(response.data.results[0]);
      } catch (error) {
        console.log(error);
      }
    };
    movieData();
  }, []);

  const loadMovieData = async () => {
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}movie/popular?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=ko-KR&page=${currentPage}&region=ko`
      );
      setCurrentPage((state) => state + 1);
      setMovies((state) => [...state, ...response.data.results]);
      setMainMovieImage(response.data.results[0]);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(currentPage);
  const loadMore = () => {
    loadMovieData();
  };
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
      <button onClick={loadMore}>더 많이</button>
    </div>
  );
};

export default LandingPage;
