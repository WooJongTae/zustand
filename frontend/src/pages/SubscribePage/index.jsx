import React, { useEffect, useState } from "react";
import useStore from "../../store/store";
import axiosInstance from "../../utils/axios";

const SubscribePage = () => {
  const { initialState } = useStore();
  const { id } = initialState.userData;
  const [recommendMovie, setRecommendMovie] = useState([]);
  console.log(recommendMovie);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = { id };
        const movieData = await axiosInstance.post(
          "/subscriber/recommendData",
          userId
        );
        console.log(movieData);
        const movieImages = movieData.data.movieData;

        const detailRequests = movieImages.map((movie) =>
          axiosInstance.get(
            `https://api.themoviedb.org/3/movie/${movie.movieId}?api_key=${
              import.meta.env.VITE_API_KEY
            }`
          )
        );
        const detailResponses = await Promise.all(detailRequests);
        console.log(detailResponses);
        setRecommendMovie(detailResponses);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // 이러면 2개다 들고올 필요 없는데,,,
  }, []);
  const removeData = async (movieId) => {
    try {
      const isResult = window.confirm("정말 삭제 하실 겁니까?..");
      if (!isResult) return;
      const userId = { id };
      const response = await axiosInstance.post("/subscriber/removeData", {
        movieId,
        userId,
      });
      console.log(response);
      const updateMovie = recommendMovie.filter((movie) => {
        return movie.data.id !== movieId;
      });
      setRecommendMovie(updateMovie);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {recommendMovie.map((img) => (
        <div onClick={() => removeData(img.data.id)}>
          <img
            src={`https://image.tmdb.org/t/p/original/${img.data.backdrop_path}`}
          />
          <p></p>
        </div>
      ))}
    </div>
  );
};

export default SubscribePage;
