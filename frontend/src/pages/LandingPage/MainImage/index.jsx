import React, { useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/scrollbar";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axiosInstance from "../../../utils/axios";

const MainImage = ({ imageLists }) => {
  console.log(imageLists);

  const [playMovie, setPlayMovie] = useState("");

  const youtubeData = async (movieId) => {
    const reuslt = await axiosInstance.get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=d606737f6cc63ae44001ea6e4e7aa84c&language=ko-KR`
    );
    console.log(reuslt);
    setPlayMovie(reuslt.data.results[0].key);
  };

  const removePlayMovie = () => {
    setPlayMovie("");
  };
  return (
    <div className=" w-full relative h-auto bg-cover bg-center ">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
      >
        {imageLists.map((imageList, i) => (
          <SwiperSlide key={i}>
            <img
              src={`${import.meta.env.VITE_BASE_IMAGE_URL}${
                imageList.backdrop_path
              }`}
              alt={`${imageList.title}`}
              className=" h-[40rem] w-full"
            />
            <div className=" absolute bottom-10 left-3 text-white">
              <h1 className=" text-3xl mb-4">{imageList.title}</h1>
              <p>{imageList.overview}</p>
              <button onClick={() => youtubeData(imageList.id)}>플레이</button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
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
};

export default MainImage;
