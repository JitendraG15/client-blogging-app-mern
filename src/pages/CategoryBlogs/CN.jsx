import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCategoryPosts } from "../../services/operations/post";
import PostContainer from "../../components/Core/post/PostContainer"
import LoadingSpinner from "../../components/comman/Spinner";

const CN = () => {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState("");
  // const { post } = useSelector((state) => state.post);
  const categoryName = "Computer Network";
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

export default CN;
