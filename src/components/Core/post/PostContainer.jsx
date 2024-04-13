import React from "react";
import PostCard from "./PostCard";

const PostContainer = ({post}) => {
    console.log(post)
  return (
    <div className=" lg:px-10  p-2 lg:py-5">
      <div className="flex flex-col lg:flex-row">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {post.map((item, index) => {
            return <PostCard post={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default PostContainer;
