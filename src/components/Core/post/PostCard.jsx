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
      return words.slice(0, 20).join(" ") + "...";
    }
    return content;
  };

  return (
    <div className="min-h-[15%] flex justify-center items-center text-left bg-white rounded-lg shadow-md p-6 m-4">
      <div className="  flex flex-col justify-start items-start ">
        <div className="flex items-center gap-2 justify-start mb-4 w-full">
          <span className="border-2 rounded-[50%]  p-1">
            <img
              src={userID.image}
              alt="Author Profile Image"
              className="rounded-full  w-[20px]"
            />
          </span>
          <div className="text-sm text-gray-600">{userID.userName}</div>
          <span className="border-2 border-red-700 h-[15px]"></span>
          <div className="text-sm text-gray-600">{formatDate(createdAt)}</div>
        </div>

        <div className="flex gap-2">
          <div>
            <Link to={`/post/${post._id}`} className="hover:text-blue-500">
              <h2 className="text-xl font-semibold mb-4 max-sm:text-sm">
                {shortenTitle(title)}
              </h2>
            </Link>

            <p className="text-base text-gray-700 max-sm:text-xs">
              {shortenContent(content)}
            </p>
          </div>

          <div>
            {post.thumbnail.includes(".") ? (
              <img
                src={post.thumbnail}
                alt="Thumbnail"
                className="h-[150px] min-w-[200px] max-w-[200px] max-sm:hidden  rounded"
              />
            ) : (
              <img
                src={randomImage}
                alt="Thumbnail"
                className="min-h-[150px] max-w-[200px] "
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
