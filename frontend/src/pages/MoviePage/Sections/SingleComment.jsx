import React, { useState } from "react";
import useStore from "../../../store/store";
import axiosInstance from "../../../utils/axios";
import { BiReply } from "react-icons/bi";

const SingleComment = ({ movieId, commentData }) => {
  const { initialState } = useStore();
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
        window.location.reload();
      } else {
        alert("실패");
      }
    });
  };
  const handleReply = () => {
    setReply(!reply);
  };
  console.log(commentData);
  return (
    <div className="border-4 border-solid border-black mt-4">
      {commentData.responseTo && <BiReply />}
      <p>작성자: {commentData.writer.name}</p>
      <p>{commentData.content}</p>
      <p onClick={handleReply}>리플작성하기</p>
      {reply && (
        <form onSubmit={onSubmit} className="text-center">
          <textarea
            className=" border-4  w-full "
            value={comment}
            onChange={textValue}
          />
          <button
            className=" inline-block border-4 mb-2 border-black p-2"
            type="submit"
          >
            작성
          </button>
        </form>
      )}
    </div>
  );
};

export default SingleComment;
