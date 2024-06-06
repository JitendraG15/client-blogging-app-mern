import React from "react";
import moment from "moment";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import LoadingSpinner from "../../comman/Spinner";

const Postrow = ({ post, onEdit, onDelete }) => {
  return (
    <>
      {post ? (
        <tr key={post._id} className="border-b-2 border-gray-200 p-2">
          <td className="px-4 py-2">{post.title.slice(0, 30)}...</td>
          <td className="px-4 py-2">
            {moment(post.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
          </td>
          <td className="px-4 py-2">{post.content.slice(0, 80)}...</td>
          <td className="px-4 py-2">
            <button
              onClick={() => onEdit(post)}
              className="text-blue-500 hover:text-blue-700 text-3xl font-bold py-2 px-4 rounded"
              aria-label={`Edit post titled ${post.title}`}
              tabIndex="0"
            >
              <CiEdit aria-hidden="true" />
            </button>
            <button
              onClick={() => onDelete(post._id)}
              className="text-red-500 hover:text-red-700 text-3xl font-bold py-2 px-4 rounded"
              aria-label={`Delete post titled ${post.title}`}
              tabIndex="0"
            >
              <MdDeleteOutline aria-hidden="true" />
            </button>
          </td>
        </tr>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default Postrow;
