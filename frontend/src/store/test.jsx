import React from "react";
import { useForm } from "react-hook-form";
const test = () => {
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

  const onSubmit = (data) => {
    console.log("Form submitted.", data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className=" relative ">
          <label className="">이메일 주소</label>
          <input className="" {...register("email", emailRequired)} />
          {errors.email && <p className="">{errors.email.message}</p>}
        </div>
        <button type="submit">시작하기</button>
      </form>
    </div>
  );
};

export default test;
