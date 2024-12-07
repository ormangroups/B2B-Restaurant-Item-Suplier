import React from "react";
import { FaSearch, FaBell, FaChevronDown } from "react-icons/fa";

const Header = () => {
  return (
    <header className="flex items-center justify-between h-16 px-4 bg-white shadow">
      <div className="flex items-center">
        <FaSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="ml-2 border-none focus:ring-0"
        />
      </div>
      <div className="flex items-center">
        <FaBell className="text-gray-400 mr-4" />
        <div className="flex items-center">
          <img
            src="https://placehold.co/32x32"
            alt="User profile picture"
            className="h-8 w-8 rounded-full"
          />
          <span className="ml-2 text-gray-700">Tom Cook</span>
          <FaChevronDown className="ml-2 text-gray-400" />
        </div>
      </div>
    </header>
  );
};

export default Header;
