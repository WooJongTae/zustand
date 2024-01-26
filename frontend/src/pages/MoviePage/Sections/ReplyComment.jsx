import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleComment from "./SingleComment";

const ReplyComment = ({ commentList, movieId, parentComment, refreshData }) => {
  const [commentNumber, setCommentNumber] = useState(0);
  const [replyOn, setReplyOn] = useState(false);
  useEffect(() => {
    let commentNumbers = 0;
    commentList.map((comment) => {
      if (comment.responseTo === parentComment) {
        commentNumbers++;
      }
      setCommentNumber(commentNumbers);
    });
  }, []);
  const renderReply = () => {
    return (
      commentList &&
      commentList.map((comment) => (
        <div>
          {comment.responseTo === parentComment && (
            <div className=" ml-8">
              <SingleComment
                movieId={movieId}
                commentData={comment}
                refreshData={refreshData}
              />
              <ReplyComment
                commentList={commentList}
                movieId={movieId}
                parentComment={comment._id}
              />
            </div>
          )}
        </div>
      ))
    );
  };

  const replyHanlde = () => {
    setReplyOn(!replyOn);
  };
  return (
    <div className="">
      {commentNumber > 0 && (
        <p onClick={replyHanlde} className=" inline-block">
          댓글수{commentNumber}
        </p>
      )}
      {replyOn && renderReply()}
    </div>
  );
};

export default ReplyComment;
