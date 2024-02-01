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
  console.log(subscribed);

  useEffect(() => {
    axiosInstance.post("/subscriber/subscribeNumber", movieId).then((res) => {
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
  }, []);

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
      console.log(1212425125);
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
    <div>
      {subscribed ? "구독완료 " : "구독하세요 "}
      {subscribeNumber}
      <button onClick={onSubscribe}> 구독</button>
    </div>
  );
};

export default Subscribe;
