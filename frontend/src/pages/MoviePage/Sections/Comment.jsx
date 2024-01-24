import React, { useState } from "react";
import useStore from "../../../store/store";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axios";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";
const Comment = ({ commentList, refreshData }) => {
  const { movieId } = useParams();
  const { userRegister, initialState } = useStore();

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
      댓글
      {commentList &&
        commentList.map(
          (comment, i) =>
            !comment.reponseTo && (
              <div>
                <SingleComment
                  movieId={movieId}
                  commentData={comment}
                  refreshData={refreshData}
                />
                <ReplyComment
                  commentList={commentList}
                  commentId={comment._id}
                />
              </div>
            )
        )}
      <form onSubmit={onSubmit}>
        <textarea value={comment} onChange={textValue} />
        <button type="submit">작성</button>
      </form>
    </div>
  );
};

export default Comment;
