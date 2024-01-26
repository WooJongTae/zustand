import React, { useState } from "react";
import useStore from "../../../store/store";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axios";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";
const Comment = ({ commentList, refreshData }) => {
  const { movieId } = useParams();
  const { initialState } = useStore();

  console.log(initialState.userData.id);

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
    };
    axiosInstance.post("/comment/commentSave", body).then((res) => {
      if (res.data.success) {
        refreshData(res.data.data.content);
        console.log(res);
      } else {
        alert("실패");
      }
    });
  };

  return (
    <div>
      <p className="border-b border-solid border-black p-4 font-bold">댓글</p>
      {commentList &&
        commentList.map(
          (comment, i) =>
            !comment.responseTo && (
              <div className=" mx-0 sm:mx-96 ">
                <SingleComment
                  movieId={movieId}
                  commentData={comment}
                  refreshData={refreshData}
                />
                <ReplyComment
                  commentList={commentList}
                  // 리프레쉬추가
                  movieId={movieId}
                  parentComment={comment._id}
                />
              </div>
            )
        )}
      <form onSubmit={onSubmit}>
        <textarea
          value={comment}
          onChange={textValue}
          className="border border-solid w-full border-black"
        />
        <button type="submit">작성하기!</button>
      </form>
    </div>
  );
};

export default Comment;
