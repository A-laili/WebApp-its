// Navbar.jsx
import React from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-semibold">
        <Link to="/dashboard">Dashboard</Link>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative">
          <FaBell size={20} />
          <span className="absolute top-0 right-0 bg-red-600 text-xs text-white rounded-full px-2">3</span>
        </button>
        <Link to="/profile">
          <FaUserCircle size={30} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
