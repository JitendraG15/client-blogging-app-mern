import React, { useState } from "react";
import Postrow from "../components/Core/post/PostRow";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMyPosts } from "../services/operations/profile";
import { deletePost } from "../services/operations/post";
import post, { setCurrentPost } from "../slices/post";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/comman/Spinner";

const MyPosts = () => {
  const { currentPost } = useSelector((state) => state.post);
  const { token } = useSelector((state) => state.auth);
  const { myPosts, user, loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userID = user._id;

  const handleEdit = (post) => {
    dispatch(setCurrentPost(post));
    console.log(`Editing post with ID: ${post._id}`);
    navigate("/dashboard/editPost");
  };

  const handleDelete = (postId) => {
    console.log(`Deleting post with ID: ${postId}`);
    dispatch(deletePost(token, postId));
    dispatch(fetchMyPosts({ userID }));
  };

  useEffect(() => {
    dispatch(fetchMyPosts({ userID }));
  }, []);

  return (
    <>
      {!loading ? (
        <table className="w-11/12  mx-auto mt-24 bg-white border-collapse border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Published Date</th>
              <th className="px-4 py-2">Content</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {myPosts.length > 0 ? myPosts.map((post) => (
              <Postrow
                key={post._id}
                post={post}
                onEdit={() => handleEdit(post)}
                onDelete={() => handleDelete(post._id)}
              />
            )):<div className="text-center my-10">No Posts</div>}
          </tbody>
        </table>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default MyPosts;
