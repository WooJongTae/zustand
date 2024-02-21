import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useForm } from "react-hook-form";

const Question = () => {
  const {
    register,
    handleSubmit,
    reset,

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
  const onSubmit = (data, e) => {
    console.log("Form submitted.", data);
    console.log(e);
  };

  const questionDataList = [
    {
      name: "넷플릭스에서 어떤 콘텐츠를 시청할 수 있나요?",
      sub: `넷플릭스는 장편 영화, 다큐멘터리, 시리즈, 애니메이션, 각종 상을 수상한 넷플릭스 오리지널 등 수많은 콘텐츠를 확보하고 있습니다.\n
      마음에 드는 콘텐츠를 원하는 시간에 원하는 만큼 시청하실 수 있습니다. 넷플릭스 콘텐츠를 한번 살펴보세요.`,
    },
    {
      name: "넷플릭스란 무엇인가요?",
      sub: `넷플릭스는 각종 수상 경력에 빛나는 시리즈, 영화, 애니메이션, 다큐멘터리 등 다양한 콘텐츠를 인터넷 연결이 가능한 수천 종의 디바이스에서 시청할 수 있는 스트리밍 서비스입니다.\n
      저렴한 월 요금으로 원하는 시간에 원하는 만큼 즐길 수 있습니다. 무궁무진한 콘텐츠가 준비되어 있으며 매주 새로운 시리즈와 영화가 제공됩니다.`,
    },
    {
      name: "넷플릭스 요금은 얼마인가요?",
      sub: "스마트폰, 태블릿, 스마트 TV, 노트북, 스트리밍 디바이스 등 다양한 디바이스에서 월정액 요금 하나로 넷플릭스를 시청하세요. 멤버십 요금은 월 17,000원부터 5,500원까지 다양합니다. 추가 비용이나 약정이 없습니다.",
    },
    {
      name: "어디에서 시청할 수 있나요?",
      sub: `언제 어디서나 시청할 수 있습니다. 넷플릭스 계정으로 로그인하면 PC에서 netflix.com을 통해 바로 시청할 수 있으며, 인터넷이 연결되어 있고 넷플릭스 앱을 지원하는 디바이스(스마트 TV, 스마트폰, 태블릿, 스트리밍 미디어 플레이어, 게임 콘솔 등)에서도 언제든지 시청할 수 있습니다. 
      \n iOS, Android, Windows 10용 앱에서는 좋아하는 시리즈를 저장할 수도 있습니다. 저장 기능을 이용해 이동 중이나 인터넷에 연결할 수 없는 곳에서도 시청하세요. 넷플릭스는 어디서든 함께니까요.`,
    },
    {
      name: "멤버십을 해지하려면 어떻게 하나요?",
      sub: "넷플릭스는 부담 없이 간편합니다. 성가신 계약도, 약정도 없으니까요. 멤버십 해지도 온라인에서 클릭 두 번이면 완료할 수 있습니다. 해지 수수료도 없으니 원할 때 언제든 계정을 시작하거나 종료하세요.",
    },
    {
      name: "아이들이 넷플릭스를 봐도 좋을까요?",
      sub: `멤버십에 넷플릭스 키즈 환경이 포함되어 있어 자녀가 자기만의 공간에서 가족용 시리즈와 영화를 즐기는 동안 부모가 이를 관리할 수 있습니다.\n
      키즈 프로필과 더불어 PIN 번호를 이용한 자녀 보호 기능도 있어, 자녀가 시청할 수 있는 콘텐츠의 관람등급을 제한하고 자녀의 시청을 원치 않는 특정 작품을 차단할 수도 있습니다. 넷플릭스 콘텐츠를 한번 살펴보세요.`,
    },
  ];
  const [selectQuestion, setSelectQuestion] = useState(-1);

  const onSelect = (num) => {
    setSelectQuestion((prev) => (prev === num ? -1 : num));
  };

  return (
    <div className=" border-y-8 border-gray relative bg-black text-white flex justify-center flex-col items-center w-full h-auto pb-40">
      <h1 className=" text-2xl sm:text-5xl mb-5">자주 묻는 질문</h1>
      <div className="mx-auto w-[50%]">
        <ul className="flex justify-center flex-col items-center  w-full">
          {questionDataList.map((data, key) => (
            <div className=" relative w-full h-auto ">
              <li
                className={`   py-7 bg-bgGray ${
                  key === selectQuestion ? "" : "mb-2"
                } w-full`}
              >
                <div className="w-full  box-border  px-3">
                  <button className=" w-full " onClick={() => onSelect(key)}>
                    <div className="w-full flex justify-between text-xl sm:text-2xl">
                      <span>{data.name}</span>
                      <span
                        className={` transition duration-100 flex items-center ${
                          key === selectQuestion ? `transform rotate-45` : ``
                        } `}
                      >
                        <AiOutlinePlus />
                      </span>
                    </div>
                  </button>
                </div>
              </li>
              <div
                className={`${
                  selectQuestion === key
                    ? " max-h-[600px] border-t-4 border-black mb-2 opacity-100 p-5"
                    : "max-h-0 opacity-0"
                }  transition-all duration-200 overflow-hidden  bg-bgGray text-xl sm:text-2xl whitespace-pre-line  box-border`}
              >
                {data.sub}
              </div>
            </div>
          ))}
        </ul>
      </div>
      <div className="mt-5 text-xl mb-5">
        <h1>
          시청할 준비가 되셨나요? 멤버쉽을 등록하거나 재시작하려면 이메일 주소를
          입력하세요
        </h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="  block sm:flex z-20 text-black text-center "
      >
        <div className=" relative w-full">
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
            className=" box-border w-[100%] sm:w-[25rem] sm:pl-4 pl-4 py-4 border-2 border-white mr-4"
            // onFocus={handleFocus}
            {...register("email", emailRequired)}
          />
          {errors.email && (
            <p className="  bg-bgRed z-20 absolute top-[60px] left-0">
              {errors.email.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className=" bg-bgRed text-white px-8 min-w-[128px]  h-[60px] mt-7 sm:mt-0"
        >
          시작하기
        </button>
      </form>
    </div>
  );
};

export default Question;
