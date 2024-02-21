import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AiFillLike, AiTwotoneDislike } from "react-icons/ai";
import useStore from "../../../store/store";
import axiosInstance from "../../../utils/axios";
import LazyLoad from "react-lazy-load";

const GridImage = ({ movies, actorList }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = { id };
        const movieData = await axiosInstance.post(
          "/subscriber/recommendData",
          userId
        );

        const movieImages = movieData.data.movieData;
        const detailRequests = movieImages.map((movie) =>
          axiosInstance.get(
            `https://api.themoviedb.org/3/movie/${movie.movieId}?api_key=${
              import.meta.env.VITE_API_KEY
            }`
          )
        );

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
    // subscribed 이거지움
  }, []);
  // if문써서 return 을 다르게
  const { initialState } = useStore();
  const { id } = initialState.userData;
  const [test, setTest] = useState(-1);
  const [subscribed, setSubscribed] = useState(false);
  const [recommendMovie, setRecommendMovie] = useState([]);
  const [playMovie, setPlayMovie] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [text, setText] = useState("");

  const youtubeData = async (movieId) => {
    const reuslt = await axiosInstance.get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=d606737f6cc63ae44001ea6e4e7aa84c&language=ko-KR`
    );

    setPlayMovie(reuslt.data.results[0].key);
  };

  const youtubeListData = async (movieKey) => {
    setPlayMovie(movieKey);
  };
  const removePlayMovie = () => {
    setPlayMovie("");
  };

  const youtubeList = async (movieId) => {
    const result = await axiosInstance.get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=d606737f6cc63ae44001ea6e4e7aa84c`
    );
    setMovieList(result.data.results);
  };

  const onEnter = (num) => {
    setTest(num);
  };

  const onLeave = () => {
    setTest(-1);
    setMovieList([]);
  };

  const onSubscribe = (movieId) => {
    let subscribeData = {
      movieId,
      userForm: id,
    };

    axiosInstance.post("/subscriber/subscribed", subscribeData).then((res) => {
      if (res.data.success) {
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
            setSubscribed(!subscribed);
          } else {
            alert("구독하기 실패");
          }
        });
    }
  };

  const textHover = (text) => {
    setText(text);
  };

  const textLeave = (text) => {
    setText("");
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
                <LazyLoad>
                  <img
                    className=" "
                    src={`${import.meta.env.VITE_BASE_IMAGE_URL}${
                      movie.poster_path
                    }`}
                    alt={movie.title}
                  />
                </LazyLoad>
              </Link>
            </div>
            {test === i && (
              <div className="w-full bg-red-400 h-[100px] absolute z-20 opacity-100 ">
                <div>
                  <button onClick={() => youtubeData(movie.id)}>플레이</button>
                </div>
                <div>
                  <button onClick={() => youtubeList(movie.id)}>
                    영상 리스트
                  </button>
                </div>
                {movieList && (
                  <div>
                    {movieList.map((data) => (
                      <div>
                        <p>{data.name}</p>
                        <button onClick={() => youtubeListData(data.key)}>
                          영상 보기
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {recommendMovie.includes(movie.id) ? (
                  <div className=" relative">
                    <AiFillLike
                      className=" bg-white"
                      onClick={() => onSubscribe(movie.id)}
                      onMouseEnter={() => textHover("좋아요를 눌러주세요")}
                      onMouseLeave={() => textLeave("좋아요를 취소합니다.")}
                    />
                    {text && <p className=" absolute">{text}</p>}
                  </div>
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
        {playMovie && (
          <div>
            <iframe
              className="w-full h-screen z-30 fixed top-0 left-0"
              src={`https://www.youtube.com/embed/${playMovie}?si=G_x-1YIxiVQ6Q1n6`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <button
              className="fixed left-0 top-1/2 z-30 text-white"
              onClick={removePlayMovie}
            >
              제거
            </button>
          </div>
        )}
      </div>
    );
  }
};

export default GridImage;
