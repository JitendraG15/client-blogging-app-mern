import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../services/operations/post";
import PostRow from "../components/Core/post/PostRow";
import Sidebar from "../components/comman/Sidebar";
import LoadingSpinner from "../components/comman/Spinner";
import { useNavigate } from "react-router-dom";
import { setCurrentPost } from "../slices/post";
import { deletePost } from "../services/operations/post";
import { fetchMyPosts } from "../services/operations/profile";
import { fetchCategoryPosts } from "../services/operations/post";

const CMS = () => {
  const dispatch = useDispatch();
  const svgRef = useRef();

  const { post, loading } = useSelector((state) => state.post);
  const [blogs, setBlogs] = useState(post);

  const [selectedCategory, setSelectedCategory] = useState("all");
  //   const { currentPost } = useSelector((state) => state.post);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const navigate = useNavigate();
  const userID = user._id;

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

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
    if (selectedCategory === "all") {
      setBlogs(post);
    } else {
      dispatch(
        fetchCategoryPosts({ categoryID: selectedCategory, setBlogs: setBlogs })
      );
    }
  }, [selectedCategory]);

  useEffect(() => {
    dispatch(fetchPosts());
    setBlogs(post);
  }, []);

  return (
    <>
      {post.length > 0 ? (
        <div className="flex">
          <Sidebar />
          <div className=" w-screen mx-auto mt-1 p-2 ">
            {/* <h1 className="text-2xl font-semibold mb-4">Dashboard</h1> */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              {/* Main content goes here */}
              <p className="text-center text-2xl">Content Management System</p>

              <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Content Management</h1>

                {/* Category Filter */}
                <div className="mb-4">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Filter by Category:
                  </label>
                  <select
                    id="category"
                    name="category"
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="all">All</option>

                    <option value="Artificial Inteligence">AI</option>
                    <option value="Computer Network">Computer Network</option>
                    <option value="Cyber Security">Cyber Security</option>
                  </select>
                </div>

                {/* Blog Cards */}

                <table className="w-full mx-auto  bg-white border-collapse border border-gray-300 rounded-lg overflow-hidden">
                  <thead className="bg-gray-200 text-gray-700">
                    <tr>
                      <th className="px-4 py-2">Title</th>
                      <th className="px-4 py-2">Published Date</th>
                      <th className="px-4 py-2">Content</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    {blogs.map((post) => (
                      <PostRow
                        key={post._id}
                        post={post}
                        onEdit={() => handleEdit(post)}
                        onDelete={() => handleDelete(post._id)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default CMS;
