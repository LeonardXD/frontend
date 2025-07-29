import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
      <h1 className="text-4xl font-bold text-green-500 mb-6 text-center">About DemoTasker - Earn</h1>
      <p className="text-lg text-gray-700 mb-4">Welcome to DemoTasker - Earn, your go-to platform for earning virtual coins by engaging in fun and simple tasks!</p>
      <p className="text-lg text-gray-700 mb-4">Our mission is to provide an accessible and enjoyable way for users to earn rewards. Whether you're a math enthusiast or just looking for a quick brain teaser, DemoTasker offers a unique experience.</p>
      <p className="text-lg text-gray-700 mb-6">Here's what makes DemoTasker - Earn special:</p>
      <ul className="list-disc list-inside space-y-3 text-lg text-gray-700 mb-6">
        <li><strong>Engaging Tasks:</strong> Solve math equations and captchas to test your skills and earn coins.</li>
        <li><strong>Daily Rewards:</strong> Log in every day to claim exciting bonuses and boost your coin balance.</li>
        <li><strong>Daily Challenges:</strong> Complete additional tasks to earn extra rewards and climb the ranks.</li>
        <li><strong>User-Friendly Interface:</strong> Our intuitive design ensures a smooth and enjoyable experience for all users.</li>
      </ul>
      <p className="text-lg text-gray-700 mb-4">We are constantly working to improve DemoTasker - Earn and introduce new features to enhance your earning potential and overall experience. Stay tuned for exciting updates!</p>
      <p className="text-lg text-gray-700 text-center font-semibold">Thank you for being a part of the DemoTasker - Earn community!</p>
    </div>
  );
};

export default About;
