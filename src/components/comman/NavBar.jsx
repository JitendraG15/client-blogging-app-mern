import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../services/operations/auth";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileButtonRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !profileButtonRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <div>
      <nav className="bg-gray-700 text-white p-4 fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center" id="logo-link">
            <Link to="/" className="text-2xl font-bold text-gray-300 hover:text-yellow-500">
              ThoughtfulThreads
            </Link>
          </div>

          {/* Navigation Tabs */}
          <div className="hidden md:flex space-x-4">
            <Link
              to="/"
              className="hover:bg-gray-700 px-3 py-2 rounded text-gray-300 hover:text-yellow-500"
            >
              Random
            </Link>
            <Link
              to="/ai"
              className="hover:bg-gray-700 px-3 py-2 rounded text-gray-300 hover:text-yellow-500"
            >
              Artificial Intelligence
            </Link>
            <Link
              to="/cn"
              className="hover:bg-gray-700 text-gray-300  px-3 py-2 rounded  hover:text-yellow-500"
            >
              Computer Network
            </Link>
            <Link
              to="/cs"
              className="hover:bg-gray-700 px-3 py-2 rounded text-gray-300 hover:text-yellow-500"
            >
              Cyber Security
            </Link>
          </div>

          {/* Profile Icons and Dropdown */}
          <div className="relative">
            <button
              ref={profileButtonRef}
              className="flex items-center focus:outline-none font-semibold text-3xl hover:text-yellow-500"
              onClick={toggleDropdown}
              aria-haspopup="true"
              aria-expanded={isOpen}
              aria-controls="profile-dropdown"
            >
              {user ? (
                <img
                  src={user.image}
                  alt="Profile Menu Button"
                  className="rounded-[50%] w-[40px] h-full"
                />
              ) : (
                <CgProfile />
              )}
            </button>
            {isOpen && (
              <div
                ref={dropdownRef}
                id="profile-dropdown"
                className="absolute right-0 mt-2 w-48 bg-white text-gray-500 rounded-lg shadow-xl py-2 z-10"
                role="menu"
              >
                {!token && (
                  <>
                    <Link
                      to="/signup"
                      className="block px-4 py-2 text-gray-600 hover:text-white"
                      role="menuitem"
                      tabIndex="0"
                    >
                      Signup
                    </Link>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-gray-600 hover:text-white"
                      role="menuitem"
                      tabIndex="0"
                    >
                      Login
                    </Link>
                  </>
                )}
                {token && user.role === "user" && (
                  <>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-gray-300 hover:text-white"
                      role="menuitem"
                      tabIndex="0"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/createPost"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      role="menuitem"
                      tabIndex="0"
                    >
                      Create Post
                    </Link>
                    <Link
                      to="/dashboard/myposts"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      role="menuitem"
                      tabIndex="0"
                    >
                      My Posts
                    </Link>
                  </>
                )}
                {token && user.role === "admin" && (
                  <Link
                    to="/admin"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    role="menuitem"
                    tabIndex="0"
                  >
                    Admin Panel
                  </Link>
                )}
                {token && (
                  <Link
                    to="/"
                    onClick={handleLogout}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    role="menuitem"
                    tabIndex="0"
                  >
                    Logout
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
