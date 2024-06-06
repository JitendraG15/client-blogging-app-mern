// src/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="container mx-auto text-center">
        <div className="mb-4">
          <a href="#" className="text-gray-300 hover:text-white px-2">Home</a>
          <a href="#" className="text-gray-300 hover:text-white px-2">About</a>
          <a href="#" className="text-gray-300 hover:text-white px-2">Contact</a>
        </div>
        <p className="text-gray-400">
          &copy; 2024 ThoughtfulThreads. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
