import React, { useState } from "react";
import Search from "/svgs/search.svg";
import French from "/svgs/french.svg";
import English from "/svgs/english.svg";
import Spanish  from "/svgs/spanish.svg";
import Checked from "/svgs/gray-check.svg";
import Notification from "/svgs/notification.svg";

const Navbar = () => {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [languageDropdown, setLanguageDropdown] = useState(false);

  return (
    <nav className="bg-white shadow-md px-4 py-3 flex flex-col-reverse gap-5 md:gap-0 md:flex-row md:items-center md:justify-between mt-16 md:mt-0 sticky top-[60px] md:top-0 z-10">
      {/* Left Section: Search Bar */}
      <div className="flex items-center h-14 w-full md:w-96 rounded-2xl bg-backgroundGray50">
      <img src={Search} alt="Search" className="m-4"/>
        <input
          type="text"
          placeholder="Search here..."
          className="w-full text-lg text-black text-opacity-50 font-normal pr-4 outline-none bg-transparent"
        />
      </div>

      {/* Right Section: Icons and Dropdowns */}
      <div className="flex justify-end items-center space-x-6">
        {/* Language Selector Dropdown */}
        <div className="relative mr-3">
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
            <div className="absolute left-0 md:right-0 mt-2 w-64 bg-white border rounded-2xl shadow-lg z-10">
              <p className="text-base py-3.5 pl-5">Select Language </p>
              <hr/>
              <button className="flex items-center gap-5 px-4 py-4 text-sm hover:bg-gray-100">
              <img src={English} alt="English" className="w-11 h-auto" />
                English
              < img src={Checked} alt="Checked" className="ml-20"/>
              </button>
              <button className="flex items-center gap-5 px-4 py-4 text-sm hover:bg-gray-100">
              <img src={Spanish} alt="Spanish" className="w-11 h-auto"/>
                Spanish
              < img src={Checked} alt="Checked" className="ml-20"/>
              </button>
              <button className="flex items-center gap-5 px-4 py-4 text-sm hover:bg-gray-100 hover:rounded-bl-2xl hover:rounded-br-2xl">
              <img src={French} alt="French" className="w-11 h-auto"/>
                French
              < img src={Checked} alt="Checked" className="ml-20"/>
              </button>
            </div>
          )}
        </div>

        {/* Notification Icon */}
        <button className="relative flex justify-center items-center bg-backgroundYellow400 bg-opacity-12 w-12 h-12 rounded-lg mr-6">
         <img src={Notification} alt="Notification" className="" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile Icon with Dropdown */}
        <div className="relative md:pr-5">
          <button
            className="flex items-center space-x-2"
            onClick={() => setProfileDropdown(!profileDropdown)}
          >
            <img
              src="https://via.placeholder.com/30"
              alt="Profile"
              className="w-16 h-16 mr-3 rounded-xl hidden md:block"
            />
            <div className="pr-5 md:pr-10 leading-5">
              <p className="text-base font-medium text-textPrimary">Asad</p>
              <p className="text-sm font-normal text-stone300">Admin</p>
            </div>
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
