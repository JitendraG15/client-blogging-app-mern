import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PostContainer from "../../components/Core/post/PostContainer";
import { useEffect } from "react";
import { fetchCategoryPosts } from "../../services/operations/post";
import PostCard from "../../components/Core/post/PostCard";
import LoadingSpinner from "../../components/comman/Spinner";

const AI = () => {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState(null);
  // const { post } = useSelector((state) => state.post);
  const categoryName = "Artificial Inteligence";
  useEffect(() => {
    dispatch(
      fetchCategoryPosts({ categoryID: categoryName, setBlogs: setBlogs })
    );
  }, []);
  return (
    <>
      {blogs && blogs.length > 0 ? (
        <PostContainer post={blogs} />
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default AI;
