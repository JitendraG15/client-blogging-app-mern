import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const maxPageButtons = 10; // Maximum number of page buttons to display
  const halfMaxPageButtons = Math.floor(maxPageButtons / 2);

  // Generate an array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(currentPage - halfMaxPageButtons, 1);
    let endPage = Math.min(currentPage + halfMaxPageButtons, totalPages);

    if (endPage - startPage < maxPageButtons - 1) {
      if (startPage === 1) {
        endPage = Math.min(startPage + maxPageButtons - 1, totalPages);
      } else {
        startPage = Math.max(endPage - maxPageButtons + 1, 1);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  // Function to handle keyboard accessibility
  const handleKeyDown = (event, pageNumber) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      paginate(pageNumber);
    }
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination flex justify-center mt-4 pb-4">
        {/* Previous Button */}
        <li className={`page-item mx-1 ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded bg-gray-200 ${currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            aria-label="Previous"
          >
            Previous
          </button>
        </li>
        {/* Page Numbers */}
        {getPageNumbers().map((pageNumber) => (
          <li key={pageNumber} className="page-item mx-1">
            <button
              onClick={() => paginate(pageNumber)}
              onKeyDown={(e) => handleKeyDown(e, pageNumber)}
              className={`px-3 py-1 rounded ${
                pageNumber === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              aria-current={pageNumber === currentPage ? "page" : undefined}
              tabIndex={pageNumber === currentPage ? "-1" : "0"}
            >
              {pageNumber}
            </button>
          </li>
        ))}
        {/* Next Button */}
        <li className={`page-item mx-1 ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded bg-gray-200 ${currentPage === totalPages ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            aria-label="Next"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
