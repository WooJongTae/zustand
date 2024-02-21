import axios from "axios";
import React, { useEffect, useState } from "react";
import MainImage from "./MainImage";
import GridImage from "./GridImage";
import axiosInstance from "../../utils/axios";

const LandingPage = () => {
  const [movies, setMovies] = useState([]);
  const [mainMovieImage, setMainMovieImage] = useState([]);
  const [currentPage, setCurrentPage] = useState(2);
  useEffect(() => {
    const movieData = async () => {
      try {
        const response = await axiosInstance.get(
          `${import.meta.env.VITE_API_URL}movie/popular?api_key=${
            import.meta.env.VITE_API_KEY
          }&language=ko-KR&page=1&region=ko`
        );

        // setCurrentPage((state) => state + 1);
        setMovies((state) => [...state, ...response.data.results]);
        setMainMovieImage(response.data.results.slice(0, 5));
      } catch (error) {
        console.log(error);
      }
    };
    movieData();
  }, []);

  const a = axios
    .get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=ko-KR&page=1`
    )
    .then((res) => {});

  const loadMovieData = async () => {
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}movie/popular?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=ko-KR&page=${currentPage}&region=ko`
      );
      setCurrentPage((state) => state + 1);
      setMovies((state) => [...state, ...response.data.results]);
      // setMainMovieImage(response.data.results.splice(0, 5));
    } catch (error) {
      console.log(error);
    }
  };

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
          imageLists={mainMovieImage}
          // title={mainMovieImage.title}
          // sub={mainMovieImage.overview}
        />
      )}
      <GridImage movies={movies} />
      <button
        onClick={loadMore}
        className=" border border-solid bg-slate-200 mx-auto block p-4 my-4 rounded-lg"
      >
        더 많이
      </button>
    </div>
  );
};

export default LandingPage;
