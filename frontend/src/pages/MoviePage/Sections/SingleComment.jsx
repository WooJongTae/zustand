import React, { useState } from "react";
import useStore from "../../../store/store";
import axiosInstance from "../../../utils/axios";

const SingleComment = ({ movieId, commentData }) => {
  const { userRegister, initialState } = useStore();
  const [reply, setReply] = useState(false);
  const [comment, setComment] = useState("");

  const textValue = (e) => {
    setComment(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const body = {
      writer: initialState.userData.id,
      content: comment,
      movieId,
      responseTo: commentData._id,
    };

    axiosInstance.post("/comment/commentSave", body).then((res) => {
      if (res.data.success) {
        console.log(res);
      } else {
        alert("실패");
      }
    });
  };
  const handleReply = () => {
    setReply(!reply);
  };
  return (
    <div>
      <p>{commentData.content}</p>
      <p onClick={handleReply}>리플보기</p>
      {reply && (
        <form onSubmit={onSubmit}>
          <textarea value={comment} onChange={textValue} />
          <button type="submit">작성</button>
        </form>
      )}
    </div>
  );
};

export default SingleComment;
