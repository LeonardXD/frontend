import React from 'react';
import { useTitle } from '../hooks/useTitle';

const Forum = () => {
  useTitle('Forum');

  return (
    <div className="flex items-center justify-center w-full h-full">
      <img
        src="/coming-soon.png"
        alt="Coming Soon"
        className="max-w-full h-auto lg:w-1/3"
      />
    </div>
  );
};

export default Forum;
