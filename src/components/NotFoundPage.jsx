import React from 'react';
import { Link } from 'react-router-dom';

/**
 * A simple and modern 404 Not Found page component using Tailwind CSS.
 * It is responsive, supports dark mode, and includes a link to the homepage.
 */
const NotFoundPage = () => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Illustration */}
          <div className="flex justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-24 h-24 text-indigo-500 dark:text-indigo-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.828 12.172a4 4 0 00-5.656 0"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 14l2-2m0 0l2-2m-2 2v-2m0 4v.01"
              />
            </svg>
          </div>

          {/* Headline */}
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-extrabold text-indigo-600 dark:text-indigo-500 tracking-tight">
            404
          </h1>

          {/* Message */}
          <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-black">
            Page Not Found
          </h2>

          {/* Description */}
          <p className="mt-4 max-w-md mx-auto text-base text-black">
            Sorry, we couldn't find the page you’re looking for. It might have been moved, deleted, or maybe you just mistyped the URL.
          </p>

          {/* Call-to-action button */}
          <div className="mt-8">
            <Link
              to="/"
              className="inline-block px-6 py-3 font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300 ease-in-out"
              aria-label="Go back to the homepage"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
