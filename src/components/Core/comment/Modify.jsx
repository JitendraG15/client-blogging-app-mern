import React, { useState, useRef, useEffect } from "react";

const Modify = ({ comment, onClose, onModify, onDelete }) => {
  const [action, setAction] = useState(null);
  const [modifiedContent, setModifiedContent] = useState(comment.content);
  const popupRef = useRef();

  const handleModify = () => {
    setAction('modify');
  };

  const handleDelete = () => {
    setAction('delete');
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleContentChange = (event) => {
    setModifiedContent(event.target.value);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
    >
      <div ref={popupRef} className="bg-white p-4 rounded shadow-md w-80" role="document">
        <h2 id="popup-title" className="sr-only">
          Modify or Delete Comment
        </h2>
        {action === null && (
          <div>
            <button
              onClick={handleModify}
              className="w-full mb-2 py-2 px-4 bg-blue-500 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Modify
            </button>
            <button
              onClick={handleDelete}
              className="w-full py-2 px-4 bg-red-500 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              Delete
            </button>
          </div>
        )}
        {action === 'modify' && (
          <div>
            <label htmlFor="modify-textarea" className="sr-only">
              Modify Comment
            </label>
            <textarea
              id="modify-textarea"
              value={modifiedContent}
              onChange={handleContentChange}
              className="w-full mb-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              aria-label="Modify Comment"
            />
            <button
              onClick={() => onModify({ comment, content: modifiedContent })}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Modify Comment
            </button>
          </div>
        )}
        {action === 'delete' && (
          <div>
            <p className="mb-2">Are you sure you want to delete this comment?</p>
            <button
              onClick={() => onDelete(comment._id)}
              className="w-full py-2 px-4 bg-red-500 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              Delete Comment
            </button>
          </div>
        )}
        <button
          onClick={onClose}
          className="w-full mt-2 py-2 px-4 bg-gray-300 text-black rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Modify;
