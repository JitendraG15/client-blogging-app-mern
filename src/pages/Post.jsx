import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchPost } from "../services/operations/post";
import { useDispatch, useSelector } from "react-redux";
import CommentForm from "../components/Core/comment/CommentForm";
import Comment from "../components/Core/comment/Comment";
import LoadingSpinner from "../components/comman/Spinner";
import randomImage from "../utils/images/random.jpeg";
import ShareComponent from "../components/Core/comment/ShareComponent";
import { fetchComments } from "../services/operations/comment";

const PostDetail = () => {
  const [currentPost, setCurrentPost] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.comment);

  const dispatch = useDispatch();
  const { postId } = useParams();

  function calculateReadingTime(content) {
    // Average reading speed in words per minute (adjust as needed)
    const averageReadingSpeed = 200;

    // Count the number of words in the content
    const wordCount = content.split(/\s+/).length;

    // Calculate the estimated reading time
    const readingTimeInMinutes = wordCount / averageReadingSpeed;

    // Round up to the nearest whole number
    const roundedReadingTime = Math.ceil(readingTimeInMinutes);

    return roundedReadingTime;
  }

  useEffect(() => {
    dispatch(
      fetchPost(postId, (fetchedPost) => {
        setCurrentPost(fetchedPost);
        if (fetchedPost && fetchedPost.title) {
          document.title = fetchedPost.title;
        }
      })
    );
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  return (
    <div className="container p-4 w-[95%] md:w-[50%] mx-auto pt-12">
      {currentPost && currentPost.title ? (
        <>
          <article>
            <header>
              <h1 className="text-xl font-semibold mb-2 max-sm:text-md">
                {currentPost.title}
              </h1>
              <div className="text-gray-600 mb-4 flex items-center justify-between rounded p-2">
                <div className="flex gap-2 items-center">
                  <span className="border-2 rounded-[50%] border-blue-500 text-3xl p-1">
                    <img
                      src={currentPost.userID.image}
                      alt="Author Profile Image"
                      className="rounded-full"
                      width={40}
                      height={40}
                    />
                  </span>
                  <span className="flex-grow max-sm:text-xs">
                    {currentPost.userID ? currentPost.userID.userName : "Unknown"} (Author)
                  </span>
                </div>
                <div className="flex gap-2 text-xs items-center">
                  <span>
                    {currentPost ? calculateReadingTime(currentPost.content) : "NA"} min read
                  </span>
                  <span className="text-xl max-sm:hidden"> 🎯</span>
                  <span className="text-xs max-sm:hidden">
                    Published On: {new Date(currentPost.createdAt).toLocaleDateString()}
                  </span>
                  <span className="text-xl max-sm:hidden"> 🎯</span>
                  <span className="text-xs">
                    <ShareComponent />
                  </span>
                </div>
              </div>
              <div>
                {currentPost.thumbnail.includes(".") ? (
                  <img
                    src={currentPost.thumbnail}
                    alt="Thumbnail"
                    className="w-full my-4 max-h-[35vh] rounded"
                  />
                ) : (
                  <img
                    src={randomImage}
                    alt="Thumbnail"
                    className="w-full my-4 max-h-[35vh] rounded"
                  />
                )}
              </div>
            </header>
            <section>
              {currentPost.content.split("\n").map((para, index) => (
                <p className="text-base text-gray-700 mb-4" key={index}>{para}</p>
              ))}
            </section>
          </article>
          <aside>
            <div className="max-h-[75vh] flex flex-col">
              {token ? (
                <CommentForm postID={currentPost._id} />
              ) : (
                <p className="py-4">
                  Please{" "}
                  <Link className="text-blue-500" to="/login">
                    Login
                  </Link>{" "}
                  to comment on this post
                </p>
              )}
              <div>
                {comments && comments.length > 0 ? (
                  comments.map((comment, index) => <Comment key={index} comment={comment} />)
                ) : (
                  <div className="p-4">No comments available.</div>
                )}
              </div>
            </div>
          </aside>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default PostDetail;
