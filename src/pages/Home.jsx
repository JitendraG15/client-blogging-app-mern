import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../services/operations/post";
import PostContainer from "../components/Core/post/PostContainer";
import LoadingSpinner from "../components/comman/Spinner";
import Pagination from "../components/Core/post/Pagination";

function HomePage() {
  const { post } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  useEffect(() => {
    document.title = "ThoughtfullThreads - Home";
    dispatch(fetchPosts());
  }, [dispatch]);

  // Calculate the current posts to display
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = post.slice(indexOfFirstPost, indexOfLastPost);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <main role="main" id="main-home-page" aria-labelledby="home-page-heading">
      <h1 id="home-page-heading" className="sr-only">
        Home Page
      </h1>
      {post && post.length > 0 ? (
        <>
          <PostContainer post={currentPosts} />
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={post.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      ) : (
        <LoadingSpinner aria-label="Loading posts" />
      )}
    </main>
  );
}

export default HomePage;
