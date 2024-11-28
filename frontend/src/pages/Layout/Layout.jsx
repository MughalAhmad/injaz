import React from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
const Layout = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 bg-gray-800 text-white flex-col">
        <div className="p-4 text-xl font-bold">Logo</div>
        <nav className="flex-1 px-4 space-y-2">
          <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
            Dashboard
          </a>
          <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
          Quotations
          </a>
          <p onClick={()=>navigate('/form')} className="block py-2 px-4 rounded hover:bg-gray-700 cursor-pointer">
          Create Quotations
          </p>
          <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
          Team
          </a>
          <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
          Refrence 
          </a>
          <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
          Settings
          </a>
          <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
            Logout
          </a>

          <hr/>
          <p onClick={()=>navigate('/login')} className="block py-2 px-4 rounded hover:bg-gray-700 cursor-pointer">
            Login
          </p>
          <p onClick={()=>navigate('/forgot')} className="block py-2 px-4 rounded hover:bg-gray-700 cursor-pointer">
            Forgot Password
          </p>
          <p onClick={()=>navigate('/digit6')} className="block py-2 px-4 rounded hover:bg-gray-700 cursor-pointer">
            6 Digit 
          </p>
          <p onClick={()=>navigate('/newpassword')} className="block py-2 px-4 rounded hover:bg-gray-700 cursor-pointer">
            New Password
          </p>
          <p onClick={()=>navigate('/sucessfulpassword')} className="block py-2 px-4 rounded hover:bg-gray-700 cursor-pointer">
          Sucessfully Password
          </p>

        </nav>
      </div>

      {/* Mobile Sidebar (toggleable with a menu button) */}
      <div className="md:hidden bg-gray-800 text-white w-full fixed top-0 left-0">
        <div className="flex items-center justify-between p-4">
          <div className="text-xl font-bold">Logo</div>
          <button
            className="text-white focus:outline-none"
            onClick={() => {
              const menu = document.getElementById("mobile-menu");
              menu.classList.toggle("hidden");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        <div id="mobile-menu" className="hidden flex-col px-4 py-2">
          <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
            Dashboard
          </a>
          <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
            Profile
          </a>
          <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
            Settings
          </a>
          <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
            Logout
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        <Navbar/>
        <h1 className="text-2xl font-bold mb-4">Main Content</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          lacinia odio vitae vestibulum vestibulum.
        </p>
      </div>
    </div>
  );
};

export default Layout;
