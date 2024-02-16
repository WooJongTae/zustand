import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AiFillLike, AiTwotoneDislike } from "react-icons/ai";
import useStore from "../../../store/store";
import axiosInstance from "../../../utils/axios";

const GridImage = ({ movies, actorList }) => {
  // if문써서 return 을 다르게
  const { initialState } = useStore();
  const { id } = initialState.userData;
  const [test, setTest] = useState(-1);
  const [subscribed, setSubscribed] = useState(false);
  const [recommendMovie, setRecommendMovie] = useState([]);
  console.log(movies);
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
        const resultData = detailResponses.map((data) => {
          return data.data.id;
        });
        setRecommendMovie(resultData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [subscribed]);
  const onEnter = (num) => {
    setTest(num);
  };
  console.log(recommendMovie);
  const onLeave = () => {
    console.log(1244);
    setTest(-1);
  };

  const onSubscribe = (movieId) => {
    let subscribeData = {
      movieId,
      userForm: id,
    };

    axiosInstance.post("/subscriber/subscribed", subscribeData).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        setSubscribed(res.data.subscribed);
      } else {
        alert("실패");
      }
    });
    if (subscribed) {
      axiosInstance
        .post("/subscriber/unSubscribedData", subscribeData)
        .then((res) => {
          if (res.data.success) {
            console.log("성공스");
            setSubscribed(!subscribed);
          } else {
            alert("구독 취소실패");
          }
        });
    } else {
      axiosInstance
        .post("/subscriber/SubscribedData", subscribeData)
        .then((res) => {
          if (res.data.success) {
            console.log("성공");
            setSubscribed(!subscribed);
          } else {
            alert("구독하기 실패");
          }
        });
    }
  };

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
      <div className=" grid w-10/12 mx-auto sm:grid-cols-3 mt-10 gap-10 xl:grid-cols-4 grid-cols-1 ">
        {movies.map((movie, i) => (
          // <Link to={`/movie/${movie.id}`} key={i}>
          <div
            className=" relative  hover:scale-125 hover:z-[100]"
            key={i}
            onMouseEnter={() => onEnter(i)}
            onMouseLeave={onLeave}
          >
            <div className=" ">
              <Link to={`/movie/${movie.id}`} key={i}>
                <img
                  className=" "
                  src={`${import.meta.env.VITE_BASE_IMAGE_URL}${
                    movie.poster_path
                  }`}
                  alt={movie.title}
                />
              </Link>
            </div>
            {test === i && (
              <div className="w-full bg-red-400 h-[100px] absolute z-20 opacity-100 ">
                {recommendMovie.includes(movie.id) ? (
                  <AiFillLike
                    className=" bg-white"
                    onClick={() => onSubscribe(movie.id)}
                  />
                ) : (
                  <AiTwotoneDislike
                    className=" bg-white"
                    onClick={() => onSubscribe(movie.id)}
                  />
                )}
              </div>
            )}
          </div>
          // </Link>
        ))}
      </div>
    );
  }
};

export default GridImage;
