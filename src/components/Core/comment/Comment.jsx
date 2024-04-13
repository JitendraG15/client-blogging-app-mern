import React from "react";

const Comment = ({ comment }) => {
  
 

  return (
    <div className="flex items-start justify-start  p-2 gap-2">
      {/* Part 1 : Profile Image */}
      <img
        src={comment.userID.image}
        alt="Profile Image"
        className="rounded-[50%]"
        width={40}
        height={40}
      />

      {/* Part 2 : Comment content */}
      <div className=" rounded-md  mb-1 ">
        {/* User name and date */}
        <div className="flex items-center justify-between mb-2 gap-2">
          
          <span className="font-semibold">{comment.userID.userName}</span>
          <span className="text-sm text-gray-500">{comment.timeAgo}</span>
        </div>
        {/* Content */}
        <pre className="mb-4 text-xs text-gray-600">{comment.content}</pre>
        
      </div>
    </div>
  );
};

export default Comment;
