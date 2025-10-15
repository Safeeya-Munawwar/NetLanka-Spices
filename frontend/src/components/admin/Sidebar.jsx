import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaThList,
  FaClipboardList,
  FaUsers,
  FaSignOutAlt,
  FaBoxes,
  FaChevronDown,
  FaChevronUp,
  FaFileAlt,
  FaPenNib,
  FaLandmark
} from "react-icons/fa";
import { FiHome, FiMessageCircle } from "react-icons/fi";
import axios from "axios";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [openContents, setOpenContents] = useState(false);

  const [stats, setStats] = useState({
    newOrders: 0,
    newBulkOrders: 0,
    newMessages: 0,
  });

  // Fetch stats from backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token"); // your admin token
        const res = await axios.get("http://localhost:5000/api/stats", { // 👈 backend URL
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats({
          newOrders: res.data.newOrders,
          newBulkOrders: res.data.newBulkOrders,
          newMessages: res.data.newMessages,
        });
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };
    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linkClass = (path) =>
    `flex items-center gap-2 p-2 rounded transition ${
      location.pathname === path
        ? "bg-yellow-300 font-semibold text-[#5C4033]"
        : "hover:bg-yellow-200 text-[#5C4033]"
    }`;

  const badge = (count) =>
    count > 0 ? (
      <span className="ml-auto bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
        {count}
      </span>
    ) : null;

  return (
    <div
      className="w-64 bg-yellow-100 h-screen fixed left-0 top-0 flex flex-col justify-between p-6 shadow-lg overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-700 scrollbar-track-yellow-200"
      style={{ scrollbarColor: "#a16207 #fef9c3", scrollbarWidth: "thin" }}
    >
      <div>
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex justify-center">
            <img
              src="/images/logo1.png"
              alt="Net Spices Logo"
              className="w-20 h-auto object-contain"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          <Link to="/admin" className={linkClass("/admin")}>
            <FaTachometerAlt /> Dashboard
          </Link>

          {/* Contents Menu */}
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
                  className={linkClass("/admin/contents/services")}
                >
                  <FaBoxOpen /> Services
                </Link>
                <Link
                  to="/admin/contents/blogs"
                  className={linkClass("/admin/contents/blogs")}
                >
                  <FaPenNib /> Blogs
                </Link>
                <Link
                  to="/admin/contents/beyond"
                  className={linkClass("/admin/contents/beyond")}
                >
                  <FaLandmark /> Beyond Tradition
                </Link>
              </div>
            )}
          </div>

          {/* Other Links with notification badges */}
          <Link to="/admin/products" className={linkClass("/admin/products")}>
            <FaBoxOpen /> Products
          </Link>
          <Link
            to="/admin/categories"
            className={linkClass("/admin/categories")}
          >
            <FaThList /> Categories
          </Link>
          <Link to="/admin/orders" className={linkClass("/admin/orders")}>
            <FaClipboardList /> Orders {badge(stats.newOrders)}
          </Link>
          <Link to="/admin/bulk-orders" className={linkClass("/admin/bulk-orders")}>
            <FaBoxes /> Bulk Orders {badge(stats.newBulkOrders)}
          </Link>
          <Link to="/admin/users" className={linkClass("/admin/users")}>
            <FaUsers /> Users
          </Link>
          <Link
            to="/admin/contact-messages"
            className={linkClass("/admin/contact-messages")}
          >
            <FiMessageCircle /> Messages {badge(stats.newMessages)}
          </Link>
          <Link to="/" className={linkClass("/")}>
            <FiHome /> Home
          </Link>
        </nav>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center justify-center gap-2 p-2 mt-4 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
}
