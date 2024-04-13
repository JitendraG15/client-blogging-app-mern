import React, { useState } from "react";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { IoAnalyticsOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`bg-gray-800 text-white h-screen p-2 relative flex flex-col ${
        isOpen ? "w-64" : "w-20"
      } transition-width duration-500 `}
    >
      <div className="flex gap-2 ">
        <span className="text-3xl p-2 font-semibold flex gap-2 mt-4">
          <MdOutlineAdminPanelSettings />{" "}
          {isOpen ? <h1 className="text-xl"> Admin </h1> : <></>}
        </span>

        <button
          className="focus:outline-none absolute -right-3 top-8 bg-gray-400 hover:bg-gray-600 text-white p-1 rounded-[50%] "
          onClick={toggleSidebar}
        >
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>
      <div className="p-4">
        <ul>
          <li className="mb-4">
            <Link to={"/admin"} className="text-white hover:text-gray-300 flex gap-2">
              <span className="text-2xl">
                <RxDashboard/>
              </span>{" "}
              {isOpen ? "Dashboard" : ""}{" "}
            </Link>
          </li>
          <li className="mb-4">
            <Link to={"/admin/cms"} className="text-white hover:text-gray-300 flex gap-2 items-center ">
              <span className="text-2xl">
                <IoSettingsOutline/>
              </span>{" "}
              {isOpen ? "Content Management" : ""}{" "}
            </Link>
          </li>
          <li className="mb-4">
            <Link to={"/admin/analytics"} className="text-white hover:text-gray-300 flex gap-2 ">
              <span className="text-2xl">
                <IoAnalyticsOutline/>
              </span>{" "}
              {isOpen ? "Analytics" : ""}{" "}
            </Link>
          </li>
          {/* Add more sidebar items as needed */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
