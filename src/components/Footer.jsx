import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white text-center p-4">         
      <p>&copy; {new Date().getFullYear()} DemoTasker. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
