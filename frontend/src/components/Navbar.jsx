import React, { useState } from "react";

const Navbar = () => {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [languageDropdown, setLanguageDropdown] = useState(false);

  return (
    <nav className="bg-white shadow-md px-4 py-3 flex items-center justify-between mt-16 md:mt-0">
      {/* Left Section: Search Bar */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-64 px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right Section: Icons and Dropdowns */}
      <div className="flex items-center space-x-6">
        {/* Language Selector Dropdown */}
        <div className="relative">
          <button
            className="flex items-center space-x-1 text-sm font-medium text-gray-700"
            onClick={() => setLanguageDropdown(!languageDropdown)}
          >
            <span>Language</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {languageDropdown && (
            <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg">
              <button className="block px-4 py-2 text-sm hover:bg-gray-100">
                English
              </button>
              <button className="block px-4 py-2 text-sm hover:bg-gray-100">
                Spanish
              </button>
              <button className="block px-4 py-2 text-sm hover:bg-gray-100">
                French
              </button>
            </div>
          )}
        </div>

        {/* Notification Icon */}
        <button className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-gray-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3.001 3.001 0 11-6 0m6 0H9"
            />
          </svg>
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile Icon with Dropdown */}
        <div className="relative">
          <button
            className="flex items-center space-x-2"
            onClick={() => setProfileDropdown(!profileDropdown)}
          >
            <img
              src="https://via.placeholder.com/30"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-4 h-4 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {profileDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg">
              <button className="block px-4 py-2 text-sm hover:bg-gray-100">
                Profile
              </button>
              <button className="block px-4 py-2 text-sm hover:bg-gray-100">
                Settings
              </button>
              <button className="block px-4 py-2 text-sm hover:bg-gray-100">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
