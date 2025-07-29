import React, { useEffect, useState } from 'react';

const Alert = ({ message, type, onClose, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  let bgColor = '';
  let textColor = '';
  let borderColor = '';

  switch (type) {
    case 'success':
      bgColor = 'bg-green-500';
      textColor = 'text-white';
      borderColor = 'border-green-700';
      break;
    case 'error':
      bgColor = 'bg-red-500';
      textColor = 'text-white';
      borderColor = 'border-red-700';
      break;
    case 'info':
      bgColor = 'bg-blue-500';
      textColor = 'text-white';
      borderColor = 'border-blue-700';
      break;
    case 'warning':
      bgColor = 'bg-yellow-500';
      textColor = 'text-gray-800';
      borderColor = 'border-yellow-700';
      break;
    default:
      bgColor = 'bg-gray-700';
      textColor = 'text-white';
      borderColor = 'border-gray-900';
  }

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center justify-between space-x-4
        ${bgColor} ${textColor} border-l-4 ${borderColor}
        transition-all duration-300 ease-out transform
        ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
        max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg
      `}
      role="alert"
    >
      <p className="flex-grow text-sm sm:text-base">{message}</p>
      <button
        onClick={handleClose}
        className={`ml-4 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2
          ${type === 'warning' ? 'text-gray-800 hover:bg-yellow-600 focus:ring-yellow-700' : 'text-white hover:bg-opacity-75 focus:ring-white'}
        `}
        aria-label="Close alert"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  );
};

export default Alert;
