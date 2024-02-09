import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
const Question = () => {
  const [selectQuestion, setSelectQuestion] = useState(-1);

  const onSelect = () => {
    setSelectQuestion((prev) => (prev === -1 ? 0 : -1));
  };

  console.log(selectQuestion);
  return (
    <div>
      <h1>자주 묻는 질문</h1>
      <ul>
        <li>
          <div>
            <button onClick={onSelect}>
              <span>넷플릭스에서 어떤 콘텐츠를 시청할 수 있나요?</span>
              <span
                className={`inline-block transition duration-150 ${
                  0 === selectQuestion ? `transform rotate-45` : ``
                } `}
              >
                <FaPlus />
              </span>
            </button>
          </div>
          <div
            className={`${
              selectQuestion === 0 ? " max-h-44" : "max-h-0"
            }  transition-all duration-1000 overflow-hidden `}
          >
            넷플릭스는 장편 영화, 다큐멘터리, 시리즈, 애니메이션, 각종 상을
            수상한 넷플릭스 오리지널 등 수많은 콘텐츠를 확보하고 있습니다.
            마음에 드는 콘텐츠를 원하는 시간에 원하는 만큼 시청하실 수 있습니다.
            넷플릭스 콘텐츠를 한번 살펴보세요.
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Question;
