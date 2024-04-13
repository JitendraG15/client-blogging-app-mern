import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createComment } from "../../../services/operations/comment";
import { fetchPost } from "../../../services/operations/post";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CommentForm = (postID) => {
  const { user } = useSelector((state) => state.profile);
  const profileURL = user.image;
  const [commentText, setCommentText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setCommentText(e.target.value);
    const lineCount = (e.target.value.match(/\n/g) || []).length + 1;
    e.target.rows = lineCount; // Set a minimum of 5 rows
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (commentText.trim() === "") {
      return; // Prevent submitting empty comments
    }

    // Dispatch action to add comment to post
    dispatch(createComment(user._id, postID.postID, commentText, navigate));
    dispatch(fetchPost(postID.postID));
    window.location.reload();

    // Clear the comment input field
    setCommentText("");
  };

  return (
    <div className="container  mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 pb-4">
            Add a comment
          </label>

          <div className="flex items-start justify-center gap-5">
            <div className="border-2 rounded-[50%] border-blue-500 text-3xl p-1">
              {" "}
              <img
                src={profileURL}
                alt="Profile Image"
                className="rounded-[50%] w-[40px]"
              />
            </div>
            <textarea
              className="mt-1 p-2 w-full border-b-2 rounded-md"
              rows="1"
              value={commentText}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 ml-16 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
