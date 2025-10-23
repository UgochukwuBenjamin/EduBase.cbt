import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Brand */}
        <Link to="/" className="text-2xl font-bold text-sky-700">
          EduBase<span className="text-yellow-400">.CBT</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link
            to="/login"
            className="text-sky-700 font-medium hover:text-sky-900 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-sky-700 text-white px-5 py-2 rounded-lg font-medium hover:bg-sky-800 transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-sky-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <Link
            to="/login"
            className="block px-6 py-3 text-sky-700 hover:bg-gray-100 transition"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block px-6 py-3 text-white bg-sky-700 hover:bg-sky-800 transition"
            onClick={() => setIsOpen(false)}
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
