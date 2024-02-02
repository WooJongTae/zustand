import React, { useEffect, useState } from "react";
import useStore from "../../store/store";
import axiosInstance from "../../utils/axios";

const SubscribePage = () => {
  const { initialState } = useStore();
  const { id } = initialState.userData;
  const [recommendMovie, setRecommendMovie] = useState([]);
  const [backImages, setBackImages] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = { id };
        const movieData = await axiosInstance.post(
          "/subscriber/recommendData",
          userId
        );
        const movieImages = movieData.data.movieData;
        const imageRequests = movieImages.map((movie) =>
          axiosInstance.get(
            `https://api.themoviedb.org/3/movie/${
              movie.movieId
            }/images?api_key=${import.meta.env.VITE_API_KEY}`
          )
        );
        const imageResponses = await Promise.all(imageRequests);
        const imageUrls = imageResponses.map(
          (response) => response.data.backdrops[0].file_path
        );
        const result = imageUrls.map((img) => (
          <div>
            <img src={`https://image.tmdb.org/t/p/original/${img}`} />
          </div>
        ));
        setRecommendMovie(imageUrls);
        console.log(imageUrls);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {recommendMovie.map((img) => (
        <div>
          <img src={`https://image.tmdb.org/t/p/original/${img}`} />
        </div>
      ))}
    </div>
  );
};

export default SubscribePage;
