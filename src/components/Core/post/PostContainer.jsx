import React from "react";
import PostCard from "./PostCard";

const PostContainer = ({post}) => {
  return (
    <section className="post-container lg:px-10 p-2 lg:py-5">
      <div className="flex flex-col lg:flex-row">
        <div className="grid grid-cols-1 lg:grid-cols-2" role="list">
          {post.map((item, index) => (
            <PostCard post={item} key={item._id} tabIndex="0" role="listitem" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PostContainer;
