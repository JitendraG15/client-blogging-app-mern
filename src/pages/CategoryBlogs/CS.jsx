import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PostContainer from "../../components/Core/post/PostContainer";
import { useEffect } from "react";
import { fetchCategoryPosts } from "../../services/operations/post";
import PostCard from "../../components/Core/post/PostCard";
import LoadingSpinner from "../../components/comman/Spinner";

const CS = () => {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState(null);
  // const { post } = useSelector((state) => state.post);
  const categoryName = "Cyber Security";
  useEffect(() => {
    dispatch(
      fetchCategoryPosts({ categoryID: categoryName, setBlogs: setBlogs })
    );
  }, []);
  return (
    <>
      {blogs && blogs.length > 0 ? (
        <PostContainer post={blogs} />
      ) : blogs && blogs.length <= 0 ? (
        <div className="text-center text-2xl mt-20">
          Category blogs not found
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default CS;
