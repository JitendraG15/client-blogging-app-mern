import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { fetchPosts } from "../services/operations/post";
import PostContainer from "../components/Core/post/PostContainer";
import LoadingSpinner from "../components/comman/Spinner";
// import MyChart from "../components/charts/MyChart";

function HomePage() {
  const { post } = useSelector((state) => state.post);
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(post);
    dispatch(fetchPosts());
  }, []);
  return (
    <>
      {post && post.length > 0 ? (
        <PostContainer post={post} />
      ) :(
        <LoadingSpinner />
      )}
    </>
  );
}

export default HomePage;
