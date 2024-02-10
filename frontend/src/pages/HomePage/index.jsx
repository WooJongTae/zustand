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

  const handleBlur = () => {
    console.log(567);
  };
  return (
    <div>
      <div className="">
        <div className=" overflow-hidden lg:max-h-[700px] relative">
          <img
            className="  object-cover scale-125 -translate-y-[10%]  min-h-[350px] sm:min-h-[480px] lg:min-h-[43.75rem] "
            src="https://assets.nflxext.com/ffe/siteui/vlv3/5e16108c-fd30-46de-9bb8-0b4e1bbbc509/c2e7a54c-765d-48c8-a9ef-91990cacba49/KR-ko-20240205-popsignuptwoweeks-perspective_alpha_website_large.jpg"
            alt="배경 이미지"
          />
        </div>
        <div className="bg-gradient-to-t from-black/80 to-black/80 absolute z-[2] top-0 left-0 w-full min-h-[350px] sm:min-h-[480px] lg:min-h-[43.75rem] rgba(0,0,0,0.8)">
          safasfasfafas
        </div>
        <h1>영화, 시리즈 등을 무제한으로</h1>
        <p>어디서나 자유롭게 시청하세요. 해지는 언제든 가능합니다.</p>
        <p>
          시청할 준비가 되셨나요? 멤버쉽 등록하거나 재시작하려면 이메일 주소를
          입력해주세요.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" relative">
            <label
              className={`absolute top-1/2 transform transition-all duration-200
              ${
                watchForm
                  ? " text-xs  -translate-y-6 left-5 "
                  : "-translate-y-1/2 left-5"
              }              `}
            >
              이메일 주소
            </label>
            <input
              className="px-4 py-3 border-4 border-black  "
              onFocus={handleFocus}
              //   onBlur={handleBlur}
              {...register("email", emailRequired)}
            />
          </div>
          {errors.email && <p>{errors.email.message}</p>}
          <button type="submit">시작하기</button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
