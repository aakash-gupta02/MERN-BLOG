import React from "react";
import { FaBookOpen, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
const navigate = useNavigate()

  return (
    <nav className="bg-white shadow-sm py-4 px-6 md:px-12 lg:px-24">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <FaBookOpen className="text-indigo-600 text-2xl mr-2" />
          <span className="text-xl font-bold text-gray-800">Readify</span>
        </div>

        {/* Navigation Links - Hidden on mobile */}
        <div className="hidden md:flex space-x-8">
          <a href="#" className="text-indigo-600 font-medium">
            Home
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-indigo-600 transition-all duration-300"
          >
            Articles
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-indigo-600 transition-all duration-300"
          >
            Pages
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-indigo-600 transition-all duration-300"
          >
            Pricing
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-indigo-600 transition-all duration-300"
          >
            FAQ
          </a>
        </div>

        <div className="flex gap-2">
          {/* Login Button (Border Only) */}
          <button
          onClick={()=>{
            navigate("/login")
          }}
          className="hidden md:block border border-indigo-500 text-sm font-semibold text-indigo-500 px-4 py-1.5 rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-300">
            Login
          </button>

          {/* Sign In Button (Filled) */}
          <button
          onClick={()=>[
            navigate("/register")
          ]}
          className="hidden md:block bg-indigo-500 text-sm font-semibold text-white px-4 py-1.5 rounded-lg hover:bg-indigo-600 transition-all duration-300">
            Sign In
          </button>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-gray-600">
          <FaBars className="text-2xl" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
