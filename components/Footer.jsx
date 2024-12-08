import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-center py-8 bg-gray-100 hidden lg:block">
      {/* Links Section */}
      <div className="mb-4 flex justify-center flex-wrap">
        <a href="#" className="mx-2 text-gray-600 hover:text-gray-800">
          About
        </a>
        <a href="#" className="mx-2 text-gray-600 hover:text-gray-800">
          Blog
        </a>
        <a href="#" className="mx-2 text-gray-600 hover:text-gray-800">
          Jobs
        </a>
        <a href="#" className="mx-2 text-gray-600 hover:text-gray-800">
          Press
        </a>
        <a href="#" className="mx-2 text-gray-600 hover:text-gray-800">
          Accessibility
        </a>
        <a href="#" className="mx-2 text-gray-600 hover:text-gray-800">
          Partners
        </a>
      </div>

      {/* Social Media Icons Section */}
      <div className="mb-4 flex justify-center space-x-4">
        <a href="#" className="text-gray-600 hover:text-gray-800">
          <FaFacebook size={24} />
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-800">
          <FaInstagram size={24} />
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-800">
          <FaTwitter size={24} />
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-800">
          <FaGithub size={24} />
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-800">
          <FaYoutube size={24} />
        </a>
      </div>

      {/* Copyright Section */}
      <div className="text-gray-600">
        © 2024 Your Company, Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
