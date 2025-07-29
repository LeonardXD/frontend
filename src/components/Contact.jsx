import React from 'react';
import { useTitle } from '../hooks/useTitle';

const Contact = () => {
  useTitle('Contact | DemoTasker');

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
      <h1 className="text-4xl font-bold text-green-500 mb-6 text-center">Contact Us</h1>
      <p className="text-lg text-gray-700 mb-8 text-center">Have questions, feedback, or need support? Reach out our project manager using the information below:</p>
      <div className="flex flex-col md:flex-row justify-around mb-8">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-4 md:mb-0">
          <h3 className="text-2xl font-bold text-teal-600 mb-2">Email</h3>
          <p className="text-lg">l.awebhub@gmail.com</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-teal-600 mb-2">FB Page</h3>
          <p className="text-lg">L.A WebHub</p>
          <a href="https://www.facebook.com/profile.php?id=61578307141788" className="text-blue-500 hover:underline">https://www.facebook.com/profile.php?id=61578307141788</a>
        </div>
      </div>
      <p className="text-lg text-gray-700 mb-8 text-center">Alternatively, you can fill out the form below and we will get back to you as soon as possible.</p>
      <form className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name:</label>
          <input type="text" id="name" name="name" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
        </div>
        <div>
          <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email:</label>
          <input type="email" id="email" name="email" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
        </div>
        <div>
          <label htmlFor="subject" className="block text-lg font-medium text-gray-700">Subject:</label>
          <input type="text" id="subject" name="subject" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
        </div>
        <div>
          <label htmlFor="message" className="block text-lg font-medium text-gray-700">Message:</label>
          <textarea id="message" name="message" rows="5" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"></textarea>
        </div>
        <div className="text-center">
          <button type="submit" className="w-full md:w-auto bg-green-500 text-white py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Send Message</button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
