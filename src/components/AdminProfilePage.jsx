import React, { useState, useEffect } from 'react';
import { FaLock } from 'react-icons/fa';
import { useTitle } from '../hooks/useTitle';

const AdminProfilePage = () => {
  useTitle('Admin Profile | DemoTasker');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const openPasswordModal = () => setIsPasswordModalOpen(true);
  const closePasswordModal = () => setIsPasswordModalOpen(false);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closePasswordModal();
      }
    };

    if (isPasswordModalOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isPasswordModalOpen]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 w-full max-w-2xl">
        {/* Profile Section */}
        <div className="text-center mb-8">
          <img
            src="/profile.png" // Placeholder image
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />
          <h2 className="text-2xl font-bold text-gray-800">Admin</h2>
          <p className="text-gray-600">admin@demotasker.com</p>
        </div>

        {/* Settings Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Settings</h3>
          <div className="space-y-4">
            {/* Change Password Option */}
            <div className="flex items-center bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-200 ease-in-out" onClick={openPasswordModal}>
              <FaLock className="text-green-500 mr-3 text-xl" />
              <span className="text-lg text-gray-700">Change Password</span>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
          onClick={closePasswordModal} // Close modal when clicking outside
        >
          <div
            className="bg-white rounded-lg p-6 shadow-xl w-full max-w-sm mx-auto"
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Change Password</h3>

            <div className="mb-4">
              <label htmlFor="current-password" className="block text-gray-700 text-sm font-bold mb-2">
                Current Password
              </label>
              <input
                type="password"
                id="current-password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter current password"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="new-password" className="block text-gray-700 text-sm font-bold mb-2">
                New Password
              </label>
              <input
                type="password"
                id="new-password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter new password"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="repeat-password" className="block text-gray-700 text-sm font-bold mb-2">
                Repeat Password
              </label>
              <input
                type="password"
                id="repeat-password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Repeat new password"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={closePasswordModal}
                className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfilePage;
