import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modify from "./Modify";
import { useNavigate } from 'react-router-dom';
import { updateComment , deleteComment} from "../../../services/operations/comment";


const Comment = ({ comment }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleModify = ({comment, content}) => {
    // Logic to modify the comment
    dispatch(updateComment(comment.postID._id, comment._id, content, navigate));

    // Example: dispatch an action to update the comment
    // console.log(`Modify comment with ID: ${commentId}`); 
    setIsPopupOpen(false);
  };

  const handleDelete = (commentId) => {
    // Logic to delete the comment
    dispatch(deleteComment(commentId,  navigate));
    console.log(`Delete comment with ID: ${commentId}`);
    setIsPopupOpen(false);
  };

  return (
    <div className="flex items-start justify-start p-2 gap-2 relative" role="article" aria-labelledby={`comment-title-${comment._id}`}>
      {/* Part 1: Profile Image */}
      <img
        src={comment.userID.image}
        alt={`${comment.userID.userName}'s profile`}
        className="rounded-full"
        width={40}
        height={40}
      />

      {/* Part 2: Comment content */}
      <div className="rounded-md mb-1">
        {/* User name and date */}
        <div className="flex items-center justify-between mb-2 gap-2">
          <span id={`comment-title-${comment._id}`} className="font-semibold">
            {comment.userID.userName}
          </span>
          <span className="text-sm text-gray-500">{comment.timeAgo}</span>
        </div>
        {/* Content */}
        <pre className="mb-4 text-xs text-gray-600">{comment.content}</pre>
      </div>

      {/* Edit/Delete button */}
      <div className="absolute right-3">
        {user && user._id === comment.userID._id ? (
          <button
            className="text-3xl -mt-4 px-5"
            onClick={handlePopupOpen}
            aria-label="Edit or delete comment"
            tabIndex="0"
          >
            ...
          </button>
        ) : null}
      </div>

      {isPopupOpen && (
        <Modify
          comment={comment}
          onClose={handlePopupClose}
          onModify={handleModify}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Comment;
