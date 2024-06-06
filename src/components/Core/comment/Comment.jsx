import React from "react";
import { useSelector } from "react-redux";

const Comment = ({ comment }) => {
  const { user } = useSelector((state) => state.profile);

  const handleClick = () => {
    // Define handleClick logic here
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
            onClick={handleClick}
            aria-label="Edit or delete comment"
            tabIndex="0"
          >
            ...
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Comment;
