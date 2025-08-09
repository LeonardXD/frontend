import React from 'react';

const AnnouncementModal = ({ announcement, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full mx-4 transform transition-transform duration-300 scale-95 hover:scale-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{announcement.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
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
        <p className="text-gray-700">{announcement.content}</p>
      </div>
    </div>
  );
};

export default AnnouncementModal;
