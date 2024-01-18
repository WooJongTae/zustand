import React from "react";
import { useForm } from "react-hook-form";
import useStore from "../../store/store";
const LoginPage = () => {
  const { userLogin, initialState } = useStore();
  console.log(initialState);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  console.log(errors);

  const onSubmit = ({ email, password }) => {
    userLogin({ email, password });
    reset();
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
  return (
    <div className="flex flex-col ">
      <h1 className="text-3xl font-semibold text-center">회원가입</h1>
      <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            className="w-full mt-2 bg-slate-400 rounded-md py-4 text-center"
            {...register("email", emailRequired)}
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            className="w-full mt-2 bg-slate-400 rounded-md py-4 text-center"
            {...register("password", passwordRequired)}
          />
        </div>
        <button className="mt-5 bg-slate-400 p-4" type="submit">
          로그인
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
