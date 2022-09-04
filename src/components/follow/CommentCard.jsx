import React from 'react';
import { getDate } from "../../helpers/funcs"

const CommentCard = ({ comment }) => {
  return (
    <div className="comment__block">
      <div className="comment__right-block">
        <img src={comment.user_image} alt="" />
      </div>
      <div className="comment__left-block">
        <div className="comment__username">
          {comment.user}
        </div>
        <div className="comment__text">
          {comment.body}
        </div>
      </div>
      <div className="comment__time">
        <sup>{getDate(comment.created_at)}</sup>
      </div>
    </div>
  );
};

export default CommentCard;