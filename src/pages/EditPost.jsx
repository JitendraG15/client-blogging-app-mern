import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../services/operations/post";
import { useNavigate } from "react-router-dom";

const EditPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { currentPost } = useSelector((state) => state.post);
  const { category } = useSelector((state) => state.category);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(() => {
    const storedData = localStorage.getItem("formData");
    return storedData
      ? JSON.parse(storedData)
      : {
          title: currentPost ? currentPost.title : "",
          category:
            currentPost && currentPost.category ? currentPost.category._id : "",
          content: currentPost ? currentPost.content : "",
        };
  });

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const enableEditing = () => {
    setEditing(true);
  };

  const cancelEditing = () => {
    setEditing(false);
    setFormData({
      title: currentPost ? currentPost.title : "",
      category:
        currentPost && currentPost.category ? currentPost.category._id : "",
      content: currentPost ? currentPost.content : "",
    });
  };

  const handleSubmit = async () => {
    dispatch(
      updatePost(
        token,
        currentPost._id,
        formData.title,
        formData.category,
        formData.content,
        navigate
      )
    );
    setEditing(false);
  };

  return (
    <div className="container mx-auto mt-24 w-[50%] max-sm:w-[95%]">
      <h1 className="text-2xl font-semibold mb-4">Edit Your Post</h1>
      <form>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            disabled={!editing}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            disabled={!editing}
            className="mt-1 p-2 w-full border rounded-md"
          >
            <option value={currentPost.category._id}>
              {currentPost.category.categoryName}
            </option>
            {/* Add other categories here */}
            {category.map((category, index) => {
              return (
                <option value={category._id}>{category.categoryName}...</option>
              );
            })}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            disabled={!editing}
            className="mt-1 p-2 w-full h-[35vh] max-sm:min-h-[50vh] border rounded-md"
          ></textarea>
        </div>
        <div className="flex justify-between">
          {!editing ? (
            <button
              type="button"
              onClick={enableEditing}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Enable Editing
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={cancelEditing}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Submit
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditPost;
