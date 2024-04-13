import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../services/operations/category";
import { createPost } from "../services/operations/post";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../components/Core/imageUpload/ImageUploader";

const CreatePostPage = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { category } = useSelector((state) => state.category);
  const { thumbnail } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const {token}
  const [title, setTitle] = useState("");
  // const [thumbnail, setThumbnail] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form Data:", {
      userID: user._id,
      token,
      title,
      thumbnail,
      categoryID,
      content,
    });
    const userID = user._id;
    dispatch(
      createPost(userID, token, title, thumbnail, categoryID, content, navigate)
    );
    setTitle("");
    setCategoryID("");
    setContent("");
  };

  useEffect(() => {
    dispatch(fetchCategory());
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96 mx-auto max-sm:w-[95%] ">
        <h2 className="text-2xl font-semibold mb-4">Create Post</h2>
        <ImageUploader />
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="categoryID"
              className="block text-sm font-medium text-gray-600"
            >
              Category
            </label>
            <select
              id="categoryID"
              name="categoryID"
              value={categoryID}
              onChange={(e) => setCategoryID(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              {category.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-600"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          {/* <div className="mb-4">
            <label
              htmlFor="thumbnail"
              className="block text-sm font-medium text-gray-600"
            >
              {thumbnail}
            </label>
            <input
            disabled
              type="text"
              id="thumbnail"
              name="thumbnail"
              value={thumbnail}
              // onChange={(e) => setThumbnail(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div> */}

          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-600"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPage;
