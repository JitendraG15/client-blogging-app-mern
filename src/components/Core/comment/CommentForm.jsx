import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment, fetchComments } from "../../../services/operations/comment";
import { useNavigate } from "react-router-dom";

const CommentForm = ({ postID }) => {
  const { user } = useSelector((state) => state.profile);
  const { comments, loading } = useSelector((state) => state.comment);
  const profileURL = user.image;
  const [commentText, setCommentText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setCommentText(e.target.value);
    const lineCount = (e.target.value.match(/\n/g) || []).length + 1;
    e.target.rows = Math.max(lineCount, 5); // Ensure at least 5 rows
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (commentText.trim() === "") {
      return; // Prevent submitting empty comments
    }

    // Dispatch action to add comment to post
    dispatch(createComment(user._id, postID, commentText, navigate));
    dispatch(fetchComments(postID));

    // Clear the comment input field
    setCommentText("");
  };

  return (
    <div className="container mx-auto p-4">
      {!loading ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 pb-4">
              Add a comment
            </label>
            <div className="flex items-start justify-center gap-5">
              <div className="border-2 rounded-full border-blue-500 text-3xl p-1">
                <img
                  src={profileURL}
                  alt={`${user.name}'s profile`}
                  className="rounded-full w-[40px]"
                />
              </div>
              <textarea
                id="comment"
                className="mt-1 p-2 w-full border-b-2 rounded-md"
                rows="5"
                value={commentText}
                onChange={handleInputChange}
                aria-label="Write your comment here"
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 ml-16 rounded-md"
            aria-label="Submit your comment"
          >
            Submit
          </button>
        </form>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default CommentForm;
