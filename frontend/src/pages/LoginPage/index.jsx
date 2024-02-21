import React from "react";
import { useForm } from "react-hook-form";
import useStore from "../../store/store";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { userLogin, initialState } = useStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  console.log(errors);

  const onSubmit = ({ email, password }) => {
    userLogin({ email, password });
    // reset();
  };

  const emailRequired = {
    required: " 이메일은 필수 입력입니다.",
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: "이메일 형식에 맞지 않습니다.",
    },
  };

  const passwordRequired = {
    required: "비밀번호는 필수 입력입니다.",
    minLength: {
      value: 8,
      message: "8자리 이상 비밀번호를 사용하세요.",
    },
  };

  const registerPage = () => {
    navigate("/register");
  };

  return (
    <div className=" bg-main h-screen w-full bg-cover flex justify-center items-center ">
      <div className="z-20  h-50% w-50%  p-4 sm:p-16 bg-black/50">
        <h1 className="text-3xl font-semibold text-left text-white">로그인</h1>
        <form className=" w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className=" text-white">
            <label htmlFor="email" className=" text-lg font-bold">
              이메일
            </label>
            <input
              type="email"
              id="email"
              className="w-full mt-2 bg-white rounded-md py-4 text-center text-black outline-gray-50"
              {...register("email", emailRequired)}
            />
          </div>
          {errors.email && (
            <p className=" text-red-600">{errors.email.message}</p>
          )}
          <div className=" text-white">
            <label htmlFor="password" className=" text-lg font-bold">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              className="w-full mt-2 bg-white rounded-md py-4 text-center text-black outline-gray-50"
              {...register("password", passwordRequired)}
            />
          </div>
          {errors.password && (
            <p className=" text-red-600">{errors.password.message}</p>
          )}
          <button
            className="mt-5 bg-white text-black p-4 mx-auto block"
            type="submit"
          >
            로그인
          </button>
        </form>
        <p className="text-white mt-4">
          회원가입을 안하셨으면?{" "}
          <button onClick={registerPage}>회원가입!!</button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
