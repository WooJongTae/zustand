import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axios";
import useStore from "../../../store/store";

const Subscribe = () => {
  const { initialState } = useStore();
  const { id } = initialState.userData;
  const { movieId } = useParams();
  const [subscribeNumber, setSubscribeNumber] = useState(0);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    axiosInstance
      .post("/subscriber/subscribeNumber", { movieId })
      .then((res) => {
        if (res.data.success) {
          setSubscribeNumber(res.data.subscribeNumber);
        } else {
          alert("실패");
        }
      });

    const subscribedData = { movieId, userForm: id };
    axiosInstance.post("/subscriber/subscribed", subscribedData).then((res) => {
      if (res.data.success) {
        setSubscribed(res.data.subscribed);
      } else {
        alert("실패");
      }
    });
  }, [movieId, id]);

  const onSubscribe = () => {
    let subscribeData = {
      movieId,
      userForm: id,
    };
    if (subscribed) {
      axiosInstance
        .post("/subscriber/unSubscribedData", subscribeData)
        .then((res) => {
          if (res.data.success) {
            setSubscribeNumber(subscribeNumber - 1);
            setSubscribed(!subscribed);
          } else {
            alert("구독 취소실패");
          }
        });
    } else {
      axiosInstance
        .post("/subscriber/SubscribedData", subscribeData)
        .then((res) => {
          if (res.data.success) {
            setSubscribeNumber(subscribeNumber + 1);
            setSubscribed(!subscribed);
          } else {
            alert("구독하기 실패");
          }
        });
    }
  };
  return (
    <div className="flex justify-between mx-10">
      <div
        className={` border-black border-4 cursor-pointer p-3 ${
          subscribed ? "bg-red-400" : ""
        } `}
      >
        {subscribed ? (
          <p className="  ">총 추천 수: {subscribeNumber}</p>
        ) : (
          <p>추천하세요 {subscribeNumber}</p>
        )}
      </div>
      <div className=" border-black p-3 border-4 cursor-pointer">
        <button onClick={onSubscribe}>추천하기 </button>
      </div>
    </div>
  );
};

export default Subscribe;
