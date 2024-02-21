import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import { useForm } from "react-hook-form";
import textLength from "../../utils/textLength";

const Search = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const SearchResult = async (searchInput) => {
    const resultData = await axiosInstance(
      `${
        import.meta.env.VITE_SEARCH_URL
      }?query=${searchInput}&include_adult=false&language=ko-KRS&page=${page}&api_key=${
        import.meta.env.VITE_API_KEY
      }`
    );
    setMovies(resultData.data.results);
    setTotal(resultData.data.total_pages);

    for (let i = 2; i <= total; i++) {
      const repeatData = await axiosInstance(
        `${
          import.meta.env.VITE_SEARCH_URL
        }?query=${searchInput}&include_adult=false&language=ko-KRS&page=${i}&api_key=${
          import.meta.env.VITE_API_KEY
        }`
      );

      setMovies((state) => [...state, ...repeatData.data.results]);
    }
  };
  const onSubmit = ({ inputData }) => {
    SearchResult(inputData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-10">
        <input
          {...register("inputData")}
          className=" mt-32 border-4 w-full
    "
        />
        <button
          className="mt-5 bg-white text-black p-4 mx-auto block border-4 border-black"
          type="submit"
        >
          검색하기
        </button>
      </form>
      {/* <button>더 가져오기</button> */}
      {movies && (
        <div className=" mx-auto mt-10">
          {movies.map((movie) => (
            <div className=" text-white relative mx-auto mb-4">
              {movie.backdrop_path ? (
                <img
                  className="block w-3/5 mx-auto"
                  src={`${import.meta.env.VITE_BASE_IMAGE_URL}${
                    movie.backdrop_path
                  }`}
                  alt="이미지 없음"
                />
              ) : (
                <div className="  h-96 bg-black w-3/5 mx-auto">
                  이미지가 없습니다.
                </div>
              )}

              <div className=" absolute z-8 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
                <div className=" opacity-0 hover:opacity-100  duration-500">
                  <p className="mx-auto block">
                    {movie.title || movie.original_title}
                  </p>
                  <p>{textLength(movie.overview)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
