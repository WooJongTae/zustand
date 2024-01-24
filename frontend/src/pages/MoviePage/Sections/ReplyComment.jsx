import React from "react";

const ReplyComment = ({ commentList, commentId }) => {
  const renderReply = (parentComment) => {
    {
      commentList &&
        commentList.map(() => (
          <div>
            {commentList.responseTo === parentComment && (
              <div>
                <SingleComment
                  movieId={movieId}
                  commentData={commentList}
                  refreshData={refreshData}
                />
                <ReplyComment commentList={commentList} />
              </div>
            )}
          </div>
        ));
    }
  };
  return <div>{renderReply(commentId)}</div>;
};

export default ReplyComment;
