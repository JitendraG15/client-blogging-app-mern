import React, { useState } from "react";
import { useSelector } from "react-redux";
import Modify from "./Modify";

const Comment = ({ comment }) => {
  const { user } = useSelector((state) => state.profile);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleModify = (commentId) => {
    // Logic to modify the comment
    // Example: dispatch an action to update the comment
    console.log(`Modify comment with ID: ${commentId}`);
    setIsPopupOpen(false);
  };

  const handleDelete = (commentId) => {
    // Logic to delete the comment
    // Example: dispatch an action to delete the comment
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
