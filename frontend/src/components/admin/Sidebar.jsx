import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaThList,
  FaClipboardList,
  FaUsers,
  FaSignOutAlt,
  FaBoxes,
} from "react-icons/fa";
import { FiHome, FiMessageCircle } from "react-icons/fi";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <div
      className="
        w-64 
        bg-yellow-100 
        h-screen 
        fixed 
        left-0 
        top-0 
        flex 
        flex-col 
        justify-between 
        p-6 
        shadow-lg 
        overflow-y-auto 
        scrollbar-thin 
        scrollbar-thumb-yellow-700 
        scrollbar-track-yellow-200
      "
      style={{
        scrollbarColor: "#a16207 #fef9c3",
        scrollbarWidth: "thin",
      }}
    >
      <div>
        {/* ✅ Centered Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex justify-center">
            <img
              src="/images/logo1.png"
              alt="Net Spices Logo"
              className="w-20 h-auto object-contain"
            />
          </Link>
        </div>

        {/* ✅ Navigation */}
        <nav className="flex flex-col gap-4">
          <Link
            to="/admin"
            className="flex items-center gap-2 p-2 hover:bg-yellow-200 rounded"
          >
            <FaTachometerAlt /> Dashboard
          </Link>

          <Link
            to="/admin/products"
            className="flex items-center gap-2 p-2 hover:bg-yellow-200 rounded"
          >
            <FaBoxOpen /> Products
          </Link>

          <Link
            to="/admin/categories"
            className="flex items-center gap-2 p-2 hover:bg-yellow-200 rounded"
          >
            <FaThList /> Categories
          </Link>

          <Link
            to="/admin/orders"
            className="flex items-center gap-2 p-2 hover:bg-yellow-200 rounded"
          >
            <FaClipboardList /> Orders
          </Link>

          <Link
            to="/admin/bulk-orders"
            className="flex items-center gap-2 p-2 hover:bg-yellow-200 rounded"
          >
            <FaBoxes /> Bulk Orders
          </Link>

          <Link
            to="/admin/users"
            className="flex items-center gap-2 p-2 hover:bg-yellow-200 rounded"
          >
            <FaUsers /> Users
          </Link>

          <Link
            to="/admin/contact-messages"
            className="flex items-center gap-2 p-2 hover:bg-yellow-200 rounded"
          >
            <FiMessageCircle /> Messages
          </Link>

          <Link
            to="/"
            className="flex items-center gap-2 p-2 hover:bg-yellow-200 rounded"
          >
            <FiHome /> Home
          </Link>
        </nav>
      </div>

      {/* ✅ Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center justify-center gap-2 p-2 mt-4 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
}
