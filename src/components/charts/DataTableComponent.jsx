// src/DataTableComponent.js
import React, { useEffect } from "react";
import $ from "jquery";
import "datatables.net";

const DataTableComponent = ({ data, onEdit, onDelete }) => {
  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
  };

  // Function to preprocess data
  const preprocessData = (data) => {
    return data.map(post => ({
      ...post,
      title: post.title.length > 50 ? post.title.slice(0, 50) + "..." : post.title,
      createdAt: formatDate(post.createdAt),
      lastModified: formatDate(post.lastModified),
    }));
  };

  useEffect(() => {
    if (data.length > 0) {
      const processedData = preprocessData(data);

      $("#postsTable").DataTable({
        destroy: true, // Destroy any existing table to reinitialize
        data: processedData,
        columns: [
          { title: "Title", data: "title" },
          { title: "Category", data: "category.categoryName" },
          { title: "Author", data: "userID.userName" },
          { title: "Created At", data: "createdAt" },
          { title: "Last Modified", data: "lastModified" },
          { title: "Content", data: "content", visible: false }, // Content might be too large to display directly
          {
            title: "Actions",
            data: null,
            render: (data, type, row) => {
              return `
                <button class="modify-btn bg-blue-500 text-white px-2 py-1 rounded mr-2" data-id="${row._id}">Modify</button>
                <button class="delete-btn bg-red-500 text-white px-2 py-1 rounded" data-id="${row._id}">Delete</button>
              `;
            }
          },
        ],
        paging: true,
        searching: true,
        ordering: true,
        dom: 't<"flex justify-between items-center mt-4"ip>',
        language: {
          paginate: {
            previous: "<",
            next: ">",
          },
        },
      });

      // Event delegation for dynamic elements
      $('#postsTable tbody').on('click', '.modify-btn', function () {
        const id = $(this).data('id');
        onEdit(id);
      });

      $('#postsTable tbody').on('click', '.delete-btn', function () {
        const id = $(this).data('id');
        onDelete(id);
      });
    }
  }, [data]);

  return (
    <div className="container mx-auto p-4">
      <table id="postsTable" className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Author
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created At
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Modified
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Content
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* Rows will be dynamically handled by DataTable */}
        </tbody>
      </table>
    </div>
  );
};

export default DataTableComponent;
