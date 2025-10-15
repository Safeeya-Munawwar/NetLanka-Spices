import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaThList,
  FaClipboardList,
  FaUsers,
  FaSignOutAlt,
  FaBoxes,
<<<<<<< HEAD
  FaChevronDown,
  FaChevronUp,
  FaFileAlt,
  FaPenNib,
  FaLandmark
=======
>>>>>>> 8b0c90a1a15859ebde0a84d0c95c9d51535a03b7
} from "react-icons/fa";
import { FiHome, FiMessageCircle } from "react-icons/fi";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [openContents, setOpenContents] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  const linkClass = (path) =>
    `flex items-center gap-2 p-2 rounded transition ${
      location.pathname === path
        ? "bg-yellow-300 font-semibold text-[#5C4033]"
        : "hover:bg-yellow-200 text-[#5C4033]"
    }`;

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

<<<<<<< HEAD
        <nav className="flex flex-col gap-2">
          <Link to="/admin" className={linkClass("/admin")}>
=======
        {/* ✅ Navigation */}
        <nav className="flex flex-col gap-4">
          <Link
            to="/admin"
            className="flex items-center gap-2 p-2 hover:bg-yellow-200 rounded"
          >
>>>>>>> 8b0c90a1a15859ebde0a84d0c95c9d51535a03b7
            <FaTachometerAlt /> Dashboard
          </Link>

          {/* --- CONTENTS MENU --- */}
          <div>
            <button
              onClick={() => setOpenContents(!openContents)}
              className={`flex items-center justify-between w-full p-2 rounded transition ${
                openContents ? "bg-yellow-300" : "hover:bg-yellow-200"
              } text-[#5C4033]`}
            >
              <span className="flex items-center gap-2">
                <FaFileAlt /> Contents
              </span>
              {openContents ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {openContents && (
              <div className="ml-6 mt-2 flex flex-col gap-2">
                <Link
  to="/admin/contents/services"
  className="flex items-center gap-2 p-2 hover:bg-yellow-200 rounded"
>
  <FaBoxOpen /> Services
</Link>

                <Link
                  to="/admin/contents/blogs"
                  className="flex items-center gap-2 p-2 hover:bg-yellow-200 rounded"
                >
                  <FaPenNib /> Blogs
                </Link>
                <Link
                  to="/admin/contents/beyond"
                  className="flex items-center gap-2 p-2 hover:bg-yellow-200 rounded"
                >
                  <FaLandmark /> Beyond Tradition
                </Link>
              </div>
            )}
          </div>

          {/* --- OTHER LINKS --- */}
          <Link
            to="/admin/products"
            className={linkClass("/admin/products")}
          >
            <FaBoxOpen /> Products
          </Link>

          <Link
            to="/admin/categories"
            className={linkClass("/admin/categories")}
          >
            <FaThList /> Categories
          </Link>

          <Link
            to="/admin/orders"
            className={linkClass("/admin/orders")}
          >
            <FaClipboardList /> Orders
          </Link>

          <Link
            to="/admin/bulk-orders"
            className={linkClass("/admin/bulk-orders")}
          >
            <FaBoxes /> Bulk Orders
          </Link>

          <Link
            to="/admin/users"
            className={linkClass("/admin/users")}
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

      {/* --- LOGOUT BUTTON --- */}
      <button
        onClick={handleLogout}
        className="flex items-center justify-center gap-2 p-2 mt-4 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
}
