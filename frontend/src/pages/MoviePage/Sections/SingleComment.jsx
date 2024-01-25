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
    console.log(commentData._id);
    const body = {
      writer: initialState.userData.id,
      content: comment,
      movieId,
      responseTo: commentData._id,
    };

    axiosInstance.post("/comment/commentSave", body).then((res) => {
      console.log(res);
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
    <div className="border border-solid  border-red-400">
      <p>{commentData.content}</p>
      <p onClick={handleReply}>리플작성하기</p>
      {reply && (
        <form onSubmit={onSubmit}>
          <textarea
            className=" bg-red-200 w-full "
            value={comment}
            onChange={textValue}
          />
          <button className=" inline-block bg-slate-400" type="submit">
            작성
          </button>
        </form>
      )}
    </div>
  );
};

export default SingleComment;
