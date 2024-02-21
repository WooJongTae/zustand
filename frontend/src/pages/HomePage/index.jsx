import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();
  const [focused, setFocused] = useState(false);

  const {
    register,
    handleSubmit,
    setState,
    watch,
    formState: { errors },
  } = useForm({ mode: "onBlur " });

  const watchForm = watch("email");

  const emailRequired = {
    required: " 이메일은 필수 입력입니다.",
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: "이메일 형식에 맞지 않습니다.",
    },
  };
  const onSubmit = (data) => {
    console.log("Form submitted.", data);
    navigate("/login");
  };

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <div>
      <div className=" relative">
        <div className=" overflow-hidden  h-[700px] relative">
          <img
            className="  object-cover scale-125 -translate-y-[10%]  h-[700px] w-full  "
            src="https://assets.nflxext.com/ffe/siteui/vlv3/5e16108c-fd30-46de-9bb8-0b4e1bbbc509/c2e7a54c-765d-48c8-a9ef-91990cacba49/KR-ko-20240205-popsignuptwoweeks-perspective_alpha_website_large.jpg"
            alt="배경 이미지"
          />
        </div>
        <div className="bg-gradient-to-t from-black/80 from-10% via-black/0 via-60% to-black/80 absolute  top-0 left-0 w-full lg:max-h-[700px] h-[700px] rgba(0,0,0,0.8) "></div>
        {/* min-h-[350px] sm:min-h-[542px] lg:min-h-[43.75rem] */}
        <div className=" absolute top-[120px] xl:top-64 left-1/2 -translate-x-1/2 text-white text-center w-full">
          <div>
            <h1 className=" font-black sm:text-[45px] text-[20px]">
              영화, 시리즈 등을 무제한으로
            </h1>
            <p className="sm:text-[20px] mb-3 text-[15px]">
              어디서나 자유롭게 시청하세요. 해지는 언제든 가능합니다.
            </p>
            <p className="sm:text-[20px] text-[15px]">
              시청할 준비가 되셨나요? 멤버쉽 등록하거나 재시작하려면 이메일
              주소를 입력해주세요.
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" absolute top-[300px] xl:top-[200px] left-[48%] -translate-x-1/2 flex z-20 xl:flex-row flex-col items-center"
          >
            <div className=" relative ">
              <label
                className={`absolute top-1/2 transform transition-all duration-200 text-white
              ${
                watchForm
                  ? " text-xs  -translate-y-6 left-[18px] "
                  : "-translate-y-1/2 left-5"
              }              `}
              >
                이메일 주소
              </label>
              <input
                className=" text-white box-border w-[100%] sm:w-[25rem] pl-4 py-4 border-2 border-white/40 mr-4 bg-black/30  relative"
                onFocus={handleFocus}
                {...register("email", emailRequired)}
              />
              {errors.email && (
                <p className=" text-red-500 z-20 absolute top-[60px] left-0">
                  {errors.email.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className=" bg-bgRed text-white px-8 min-w-[128px] block w-[30px] h-[60px]  xl:mt-0 mt-5"
            >
              시작하기
            </button>
          </form>
        </div>
      </div>
      <div className="bg-black">
        <div className="   border-y-8 border-gray-400 xl:px-80  xl:h-[40rem] lg:flex lg:flex-row h-full flex justify-center items-center  flex-col ">
          <div className="w-1/2 text-white flex justify-center items-center flex-col xl:mt-0 mt-10">
            <h1 className="text-2xl lg:text-5xl font-bold mb-5">
              TV로 즐기세요
            </h1>
            <p className="text-xl lg:text-2xl">
              스마트 TV, PlayStation, Xbox, Chromecast, Apple TV, 블루레이
              플레이어 등 다양한 디바이스에서 시청하세요
            </p>
          </div>
          <div className="w-full xl:w-1/2  h-auto sm:h-[40rem] flex items-center">
            <div className="flex justify-center items-center relative">
              <img
                className="w-[40rem] min-w-[20rem] max-w-[100%] "
                src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png"
                alt="이미지"
              />
              <div className=" w-[73%] absolute top-[21%]  left-[13%]">
                <video autoPlay loop muted className="w-full">
                  <source src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v" />
                </video>
              </div>
            </div>
          </div>
        </div>
        <div className=" border-b-8 border-gray-400 xl:px-60 xl:h-[40rem] h-full">
          <div className="flex mx-20 justify-center items-center h-full lg:flex-row flex-col-reverse ">
            <div className=" relative ">
              <img
                className=" relative z-10 w-[60rem]"
                src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile.png"
                alt="이미지"
              />
              <video
                autoPlay
                loop
                muted
                className=" absolute top-[8%] left-[19%] w-[61%] z-0"
              >
                <source src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-devices.m4v" />
              </video>
            </div>
            <div className="text-white">
              <h1 className="text-2xl sm:text-5xl font-bold mb-5">
                어디서나 자유롭게 시청하세요
              </h1>
              <p className="text-xl sm:text-2xl">
                각종 영화와 시리즈를 스마트폰, 태블릿, 노트북, TV에서 무제한으로
                스트리밍하세요.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col xl:px-80 lg:flex-row h-auto sm:h-[40rem] border-b-8 border-gray-400  justify-center items-center ">
          <div className="text-white">
            <h1 className=" text-2xl sm:text-5xl font-bold mb-5 mt-4 xl:mt-0">
              어린이 전용 프로필을 만들어 보세요
            </h1>
            <p className="text-xl sm:text-2xl ">
              자기만의 공간에서 좋아하는 캐릭터와 즐기는 신나는 모험. 자녀에게
              이 특별한 경험을 선물하세요. 넷플릭스 회원이라면 무료입니다.
            </p>
          </div>
          <div>
            <img
              src="https://occ-0-3996-2218.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABdl4VeWgVycbbzJBV1KbIpMScxU_I4h6uTvNRpFab-65jsTTqI0V-g-4Jq4CLaIVqx-wbKAwA_Ee8KhZyTb0SFJ5tK2mifI-GYEB.png?r=15b"
              alt="이미지"
            />
          </div>
        </div>
        <div className=" h-[40rem] xl:px-80 flex  justify-center items-center ">
          <div className="flex flex-col-reverse xl:flex-row items-center ">
            <div>
              <img
                src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg"
                alt="이미지"
              />
            </div>
            <div className="text-white flex items-center flex-col justify-center">
              <h1 className="text-2xl sm:text-5xl font-bold mb-5">
                즐겨 보는 콘텐츠를 저장해 오프라인으로 시청하세요
              </h1>
              <p className="text-xl w-full">
                비행기, 기차, 잠수함. 어디서든 시청하세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
