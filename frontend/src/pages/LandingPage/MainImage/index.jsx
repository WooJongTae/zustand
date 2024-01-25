import React from "react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/scrollbar";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const MainImage = ({ imageLists }) => {
  console.log(imageLists);
  return (
    <div className=" w-full relative h-auto bg-cover bg-center ">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        Scrollbar={{ draggable: true }}
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
      >
        {imageLists.map((imageList) => (
          <SwiperSlide>
            <img
              src={`${import.meta.env.VITE_BASE_IMAGE_URL}${
                imageList.backdrop_path
              }`}
              alt={`${imageList.title}`}
              className=" h-[40rem] w-full"
            />
            <div className=" absolute bottom-10 left-3 text-white">
              <h1>{imageList.title}</h1>
              <p>{imageList.overview}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainImage;
