import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../services/operations/auth";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen((isOpen) => !isOpen); // Toggle isOpen state
  };

  return (
    <div>
      <nav className="bg-gray-700 text-white p-4 fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold  hover:text-yellow-500">
              ThoughtfulThreads
            </Link>
          </div>

          {/* Navigation Tabs */}
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="hover:bg-gray-700 px-3 py-2 rounded hover:text-yellow-500  ">
              Random
            </Link>

            <Link to="/ai" className="hover:bg-gray-700 px-3 py-2 rounded hover:text-yellow-500 ">
              Artificial Inteligence
            </Link>

            <Link to="/cn" className="hover:bg-gray-700 px-3 py-2 rounded hover:text-yellow-500 ">
              Computer Network
            </Link>

            <Link to="/cs" className="hover:bg-gray-700 px-3 py-2 rounded hover:text-yellow-500 ">
              Cyber Security
            </Link>
          </div>

          {/* Profile Icons and Dropdown */}
          <div className="relative">
            <button
              className="flex items-center focus:outline-none font-semibold text-3xl  hover:text-yellow-500"
              onClick={toggleDropdown}
            >
              {user ? (
                <img
                  src={user.image}
                  alt="Profile Image"
                  className="rounded-[50%] w-[40px] h-full "
                />
              ) : (
                <CgProfile />
              )}
            </button>
            {isOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-48 bg-white text-gray-500 rounded-lg shadow-xl py-2 z-10"
              >
                {!token ? (
                  <Link
                    to="/signup"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Signup
                  </Link>
                ) : (
                  <></>
                )}

                {!token ? (
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Login
                  </Link>
                ) : (
                  <></>
                )}

                {token && user.role === "user" ? (
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <></>
                )}

                {token && user.role === "user" ? (
                  <Link
                    to="/createPost"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Create Post
                  </Link>
                ) : (
                  <></>
                )}

                {token && user.role === "user" ? (
                  <Link
                    to="/dashboard/myposts"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    My Posts
                  </Link>
                ) : (
                  <></>
                )}

                {token && user.role === "admin" ? (
                  <Link
                    to="/admin"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Admin Panel
                  </Link>
                ) : (
                  <></>
                )}

                {token ? (
                  <Link
                    to="/"
                    onClick={handleLogout}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Logout
                  </Link>
                ) : (
                  <></>
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
