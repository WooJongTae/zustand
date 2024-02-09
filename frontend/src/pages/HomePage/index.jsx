import React, { useState } from "react";
import { useForm } from "react-hook-form";

const HomePage = () => {
  const [focused, setFocused] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  console.log(errors);
  console.log(register);
  const emailRequired = {
    required: " 이메일은 필수 입력입니다.",
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: "이메일 형식에 맞지 않습니다.",
    },
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };
  console.log(focused);
  return (
    <div>
      <div>
        <h1>영화, 시리즈 등을 무제한으로</h1>
        <p>어디서나 자유롭게 시청하세요. 해지는 언제든 가능합니다.</p>
        <p>
          시청할 준비가 되셨나요? 멤버쉽 등록하거나 재시작하려면 이메일 주소를
          입력해주세요.
        </p>
        <form>
          <div className=" relative">
            <label
              className={`absolute top-1/2 transform   ${
                focused
                  ? " text-xs  -translate-y-6 left-5"
                  : "-translate-y-1/2 left-5"
              }`}
            >
              이메일 주소
            </label>
            <input
              className="px-4 py-3 border-4 border-black  "
              onFocus={handleFocus}
              onBlur={handleBlur}
              {...register("email", emailRequired)}
            />
          </div>
          <button>시작하기</button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
