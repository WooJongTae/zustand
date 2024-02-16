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
        console.log(detailRequests);
        const detailResponses = await Promise.all(detailRequests);
        console.log(detailResponses);
        setRecommendMovie(detailResponses);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  console.log(recommendMovie);
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
    <div className="mt-40">
      <p className=" text-2xl font-bold text-center">
        이미지를 클릭시 삭제됩니다!
      </p>
      {recommendMovie.map((img) => (
        <div onClick={() => removeData(img.data.id)}>
          <img
            className=" w-3/5 mx-auto mb-4"
            src={`https://image.tmdb.org/t/p/original/${img.data.backdrop_path}`}
          />
        </div>
      ))}
    </div>
  );
};

export default SubscribePage;
