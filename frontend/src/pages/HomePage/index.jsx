import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const HomePage = () => {
  const [focused, setFocused] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    setState,
    watch,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onBlur " });

  const watchForm = watch("email");
  console.log(watch());
  console.log(errors);

  const emailRequired = {
    required: " 이메일은 필수 입력입니다.",
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: "이메일 형식에 맞지 않습니다.",
    },
  };
  const onSubmit = (data) => {
    console.log("Form submitted.", data);
  };

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <div>
      <div className=" relative">
        <div className=" overflow-hidden lg:max-h-[700px] relative">
          <img
            className="  object-cover scale-125 -translate-y-[10%]  min-h-[350px] sm:min-h-[480px] lg:min-h-[43.75rem] "
            src="https://assets.nflxext.com/ffe/siteui/vlv3/5e16108c-fd30-46de-9bb8-0b4e1bbbc509/c2e7a54c-765d-48c8-a9ef-91990cacba49/KR-ko-20240205-popsignuptwoweeks-perspective_alpha_website_large.jpg"
            alt="배경 이미지"
          />
        </div>
        <div className="bg-gradient-to-t from-black/80 from-10% via-black/0 via-60% to-black/80 absolute z-[2] top-0 left-0 w-full min-h-[350px] sm:min-h-[480px] lg:min-h-[43.75rem] rgba(0,0,0,0.8) "></div>
        <div className=" absolute top-64 left-1/2 -translate-x-1/2 text-white text-center">
          <h1 className=" font-black text-[45px] ">
            영화, 시리즈 등을 무제한으로
          </h1>
          <p className="text-[20px] mb-3 ">
            어디서나 자유롭게 시청하세요. 해지는 언제든 가능합니다.
          </p>
          <p className="text-[20px]">
            시청할 준비가 되셨나요? 멤버쉽 등록하거나 재시작하려면 이메일 주소를
            입력해주세요.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" absolute top-[450px] left-[48%] -translate-x-1/2 flex z-20"
        >
          <div className=" relative ">
            <label
              className={`absolute top-1/2 transform transition-all duration-200
              ${
                watchForm
                  ? " text-xs  -translate-y-6 left-[18px] "
                  : "-translate-y-1/2 left-5"
              }              `}
            >
              이메일 주소
            </label>
            <input
              className=" box-border w-[25rem] pl-4 py-4 border-2 border-white mr-4"
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
            className=" bg-red-500 text-white px-8 min-w-[128px]"
          >
            시작하기
          </button>
        </form>
      </div>
      <div className="bg-black">
        <div className="  flex border-y-8 border-gray-400 px-28">
          <div className="w-1/2 text-white">
            <h1>TV로 즐기세요</h1>
            <p>
              스마트 TV, PlayStation, Xbox, Chromecast, Apple TV, 블루레이
              플레이어 등 다양한 디바이스에서 시청하세요
            </p>
          </div>
          <div className="w-1/2 relative h-[40rem] flex items-center">
            <div className="flex justify-center items-center ">
              <img
                className="w-[40rem] min-w-[20rem] max-w-[100%] "
                src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png"
                alt="이미지"
              />
              <div className=" w-[29.3rem] absolute top-[28%] left-[82px]">
                <video autoPlay loop muted className="w-full">
                  <source src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v" />
                </video>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <h1>어디서나 자유롭게 시청하세요</h1>
            <p>
              각종 영화와 시리즈를 스마트폰, 태블릿, 노트북, TV에서 무제한으로
              스트리밍하세요.
            </p>
          </div>
          <div>
            <img
              src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile.png"
              alt="이미지"
            />
            <video autoPlay loop muted>
              <source src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-devices.m4v" />
            </video>
          </div>
        </div>
        <div className="1">
          <div>
            <h1>어린이 전용 프로필을 만들어 보세요</h1>
            <p>
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
        <div className="1">
          <div>
            <h1>즐겨 보는 콘텐츠를 저장해 오프라인으로 시청하세요</h1>
            <p>비행기, 기차, 잠수함. 어디서든 시청하세요.</p>
          </div>
          <div>
            <img
              src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg"
              alt="이미지"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
