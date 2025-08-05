import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../public/logo.png'; // Adjust path as needed

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [activeItem, setActiveItem] = useState(null);
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Tasks', path: '/tasks' },
    { name: 'Leaderboard', path: '/leaderboard' },
    { name: 'History', path: '/history' },
    { name: 'Referral', path: '/referral' },
    { name: 'About', path: '/about' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
    { name: 'Forum', path: '/forum' },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-white text-gray-800 p-4 border-r border-gray-300 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 transition-transform duration-300 ease-in-out z-40 md:relative md:block`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 w-8 mr-2" />
          <span className="text-xl font-semibold">DemoTasker</span>
        </div>
        <button
          onClick={toggleSidebar}
          className="md:hidden text-gray-800 hover:text-gray-600 focus:outline-none"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <nav>
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                onClick={() => {
                  setActiveItem(item.name);
                  toggleSidebar(); // Close sidebar on link click for mobile
                }}
                className={`block rounded-lg p-4 shadow transform transition-all duration-200 ease-in-out
                  ${activeItem === item.name
                    ? 'bg-green-100 text-green-700 border-l-4 border-green-500'
                    : 'bg-white text-gray-800 hover:bg-gray-50 hover:shadow-md hover:scale-105'
                  }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
