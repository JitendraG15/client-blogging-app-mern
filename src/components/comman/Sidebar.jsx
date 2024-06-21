import React, { useState } from "react";
import {
  FaHome,
  FaUser,
  FaCog,
  FaAngleDown,
  FaAngleLeft,
  FaBars,
} from "react-icons/fa";

import { SiGoogleanalytics } from "react-icons/si";

import { MdContentPaste } from "react-icons/md";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isUsersMenuOpen, setIsUsersMenuOpen] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleUsersMenu = () => {
    setIsUsersMenuOpen(!isUsersMenuOpen);
  };

  return (
    <div
      className={`bg-gray-800 text-white mt-2 pt-4 ${
        isCollapsed ? "w-20" : "w-64"
      } min-h-screen flex flex-col transition-width duration-300`}
    >
      <div className="py-4 px-6 flex items-center justify-between">
        <h2
          className={`text-xl text-gray-300 font-semibold ${
            isCollapsed ? "hidden" : "block"
          }`}
        >
          Admin Panel
        </h2>
        <button
          onClick={toggleCollapse}
          className="text-gray-300 focus:outline-none"
        >
          <FaBars />
        </button>
      </div>
      <nav className="flex flex-col flex-grow text-gray-300">
        <a href="/admin" className="py-2 px-6 flex items-center hover:bg-gray-700">
          <FaHome className="mr-3" />
          <span className={`${isCollapsed ? "hidden" : "block"}`}>Home</span>
        </a>
        {/* <div className="flex flex-col">
          <button
            onClick={toggleUsersMenu}
            className="py-2 px-6 flex items-center justify-between hover:bg-gray-700 focus:outline-none"
          >
            <div className="flex items-center">
              <FaUser className="mr-3" />
              <span className={`${isCollapsed ? "hidden" : "block"}`}>
                Users
              </span>
            </div>
            {!isCollapsed && (
              <FaAngleDown
                className={`transition-transform duration-200 ${
                  isUsersMenuOpen ? "transform rotate-180" : ""
                }`}
              />
            )}
          </button>
          {!isCollapsed && isUsersMenuOpen && (
            <div className="flex flex-col pl-12">
              <a href="/users/list" className="py-2 hover:bg-gray-700">
                User List
              </a>
              <a href="/users/add" className="py-2 hover:bg-gray-700">
                Add User
              </a>
            </div>
          )}
        </div> */}

        <a
          href="/admin/cms"
          className="py-2 px-6 flex items-center hover:bg-gray-700"
        >
          <MdContentPaste className="mr-3" />
          <span className={`${isCollapsed ? "hidden" : "block"}`}>
            Content Management
          </span>
        </a>

        <a
          href="/admin/analytics"
          className="py-2 px-6 flex items-center hover:bg-gray-700"
        >
          <SiGoogleanalytics className="mr-3" />
          <span className={`${isCollapsed ? "hidden" : "block"}`}>
            Analytics
          </span>
        </a>

        {/* <a
          href="/settings"
          className="py-2 px-6 flex items-center hover:bg-gray-700"
        >
          <FaCog className="mr-3" />
          <span className={`${isCollapsed ? "hidden" : "block"}`}>
            Settings
          </span>
        </a> */}
      </nav>
    </div>
  );
};

export default Sidebar;
