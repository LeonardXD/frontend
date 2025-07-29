import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../public/logo.png';

const Navbar = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const authPaths = ['/signin', '/signup', '/'];
  const isAuthPage = authPaths.includes(location.pathname);

  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between relative">
      {/* Left Side: Logo, Brand, and Mobile Sidebar Toggle */}
      <div className="flex items-center space-x-4">
        {!isAuthPage && (
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-800 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        )}
        <Link to={isAuthPage ? '/' : '/dashboard'} className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-10 w-10" />
          <span className="text-xl font-bold text-gray-800">DemoTasker</span>
        </Link>
      </div>

      {/* Right Side: Conditional Buttons or Profile Icon */}
      <div className="flex items-center space-x-2">
        {isAuthPage ? (
          // Auth Buttons
          <div className="flex items-center space-x-2">
            <Link
              to="/signin"
              className="py-2 px-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="py-2 px-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </div>
        ) : (
          // Profile Icon for logged-in state
          <div className="relative">
            <img
              src="../../public/profile.png" // Adjust path as needed
              alt="Profile"
              className="h-10 w-10 cursor-pointer rounded-full"
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={toggleDropdown}
                >
                  Profile
                </Link>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
