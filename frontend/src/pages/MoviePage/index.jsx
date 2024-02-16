import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import GridImage from "../LandingPage/GridImage";
import Comment from "./Sections/Comment";
import Subscribe from "./Sections/Subscribe";

const MoviePage = () => {
  const { movieId } = useParams();
  const [detailMovie, setDetailMovie] = useState([]);
  const [creditData, setCreditData] = useState([]);
  const [actor, setActor] = useState(false);
  const [comments, setComment] = useState([]);
  // 이름뭐하지?
  useEffect(() => {
    const detailMovies = async () => {
      try {
        const credit = await axiosInstance.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${
            import.meta.env.VITE_API_KEY
          }`
        );
        const movieData = await axiosInstance.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${
            import.meta.env.VITE_API_KEY
          }&language=ko-KR&region=ko`
        );

        const commentData = await axiosInstance.post("/comment/getComments", {
          movieId,
        });
        if (commentData.data.success) {
          setComment(commentData.data.data);
        } else {
          alert("코멘트 가져오기 실패");
        }
        setDetailMovie(movieData.data);
        setCreditData(credit.data.cast);
      } catch (error) {
        console.log(error);
      }
    };
    detailMovies();
  }, []);

  const actorDataHandle = () => {
    setActor(!actor);
  };

  const refreshData = (newData) => {
    setComment([...comments, newData]);
  };
  return (
    <div className=" bg-white">
      <img
        className=" w-3/5 mx-auto h-[50rem] mt-32 "
        src={`${import.meta.env.VITE_BASE_IMAGE_URL}${detailMovie.poster_path}`}
      />
      <h1 className=" text-2xl font-bold my-4">{detailMovie.original_title}</h1>
      <p className="mb-5">{detailMovie.overview}</p>
      {actor && <GridImage actorList={creditData} />}

      <button
        onClick={actorDataHandle}
        className=" border border-solid border-black p-4 font-bold mx-auto block"
      >
        {actor ? "닫기" : "배우 보기"}
      </button>
      <Subscribe comments={comments} />
      <Comment commentList={comments} refreshData={refreshData} />
    </div>
  );
};

export default MoviePage;
