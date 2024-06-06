import React from "react";
import { Link } from "react-router-dom";
import randomImage from "../../../utils/images/random.jpeg";

const PostCard = ({ post }) => {
  const { title, userID, createdAt, content } = post;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Function to display only first 40 words from content
  const shortenTitle = (content) => {
    const words = content.split(" ");
    if (words.length > 6) {
      return words.slice(0, 6).join(" ") + "...";
    }
    return content;
  };

  const shortenContent = (content) => {
    const words = content.split(" ");
    if (words.length > 40) {
      return words.slice(0, 40).join(" ") + "...";
    }
    return content;
  };

  return (
    <article
      className="min-h-[15%] flex justify-center items-center text-left bg-white rounded-lg shadow-md p-6 m-4"
      role="article"
      aria-labelledby={`post-title-${post._id}`}
      aria-describedby={`post-content-${post._id}`}
    >
      <div className="flex flex-col justify-start items-start">
        <div className="flex items-center gap-2 justify-start mb-4 w-full">
          <span className="border-2 rounded-[50%] p-1">
            <img
              src={userID.image}
              alt={`${userID.userName}'s profile`}
              className="rounded-full w-[20px]"
            />
          </span>
          <div
            role="text"
            className="text-sm text-gray-600"
            aria-label={`Author: ${userID.userName}`}
          >
            {userID.userName}
          </div>
          <span className="border-2 border-red-700 h-[15px]" aria-hidden="true"></span>
          <div
            className="text-sm text-gray-600"
            aria-label={`Posted on: ${formatDate(createdAt)}`}
          >
            {formatDate(createdAt)}
          </div>
        </div>

        <div className="flex gap-2">
          <div>
            <Link
              to={`/post/${post._id}`}
              className="hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-labelledby={`post-title-${post._id}`}
            >
              <h2
                id={`post-title-${post._id}`}
                className="text-xl font-semibold mb-4 max-sm:text-sm"
              >
                {shortenTitle(title)}
              </h2>
            </Link>

            <p
              id={`post-content-${post._id}`}
              className="text-base text-gray-700 max-sm:text-xs"
              aria-label={`Post content: ${shortenContent(content)}`}
            >
              {shortenContent(content)}
            </p>
          </div>

          <div>
            {post.thumbnail.includes(".") ? (
              <img
                src={post.thumbnail}
                alt="Post thumbnail"
                className="h-[150px] min-w-[200px] max-w-[200px] max-sm:hidden rounded"
              />
            ) : (
              <img
                src={randomImage}
                alt="Default thumbnail"
                className="min-h-[150px] max-w-[200px] rounded"
              />
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
