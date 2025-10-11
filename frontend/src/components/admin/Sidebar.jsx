import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaThList,
  FaClipboardList,
  FaUsers,
  FaSignOutAlt,
  FaBoxes, // ✅ Added for Bulk Orders
} from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <div className="w-64 bg-yellow-100 min-h-screen p-6 shadow-lg flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold text-[#5C4033] mb-8">Admin Panel</h2>

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

          {/* ✅ Bulk Orders with Icon */}
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
        </nav>
      </div>

      {/* ✅ Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 p-2 mt-4 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
}
