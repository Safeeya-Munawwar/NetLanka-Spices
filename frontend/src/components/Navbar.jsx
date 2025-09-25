import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import CartSidebar from "./CartSidebar";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const profileRef = useRef();

  const user = JSON.parse(localStorage.getItem("user")) || null;
  const isAdmin = user?.role === "admin";

  const linkClass = ({ isActive }) =>
    `block px-2 py-2 rounded hover:text-blue-300 transition ${
      isActive ? "text-blue-400 font-semibold" : "text-gray-200 font-bold"
    }`;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    setProfileOpen(false);
    setOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="w-full bg-[#302019] top-0 z-50 border-b border-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-4 md:py-7">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/images/logo.png" alt="Logo" className="h-20 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/about" className={linkClass}>
              About us
            </NavLink>
            <NavLink to="/products" className={linkClass}>
              Products
            </NavLink>
            <NavLink to="/categories" className={linkClass}>
              Categories
            </NavLink>
            <NavLink to="/contact" className={linkClass}>
              Contact us
            </NavLink>

            {/* Cart Icon (desktop only) */}
            <div
              className="relative flex items-center ml-4 cursor-pointer"
              onClick={() => setCartOpen(true)}
            >
              <FaShoppingCart size={24} className="text-white" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItems.length}
                </span>
              )}
            </div>

            {/* Profile Icon */}
            {user && (
              <div className="relative ml-4" ref={profileRef}>
                <FaUserCircle
                  size={28}
                  className="text-white cursor-pointer"
                  onClick={() => setProfileOpen(!profileOpen)}
                />
              </div>
            )}
          </nav>

          {/* Hamburger (Mobile Only) */}
          <button
            className="md:hidden flex flex-col justify-between w-6 h-5 focus:outline-none"
            onClick={() => setOpen(!open)}
          >
            <span
              className={`h-0.5 w-6 bg-white transition-transform duration-300 ${
                open ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`h-0.5 w-6 bg-white transition-opacity duration-300 ${
                open ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`h-0.5 w-6 bg-white transition-transform duration-300 ${
                open ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Nav */}
        <div
          className={`md:hidden bg-[#302019] border-t overflow-hidden transition-all duration-300 ${
            open ? "max-h-screen" : "max-h-0"
          }`}
        >
          <ul className="flex flex-col space-y-2 px-4 py-4">
            <li>
              <NavLink
                to="/"
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                About us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/categories"
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                Contact us
              </NavLink>
            </li>

            {user && (
              <>
                <li className="px-2 py-2 border-t border-gray-600">
                  <p className="text-white font-semibold">{user.name}</p>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                </li>
                <li>
                  <button
                    onClick={() => {
                      navigate("/order-confirmation");
                      setOpen(false);
                    }}
                    className="w-full text-left px-2 py-2 text-white hover:bg-gray-700 rounded transition"
                  >
                    My Orders
                  </button>
                </li>
                {isAdmin && (
                  <li>
                    <button
                      onClick={() => {
                        navigate("/admin");
                        setOpen(false);
                      }}
                      className="w-full text-left px-2 py-2 text-white hover:bg-gray-700 rounded transition"
                    >
                      Dashboard
                    </button>
                  </li>
                )}
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-2 py-2 text-red-500 font-semibold hover:bg-gray-700 rounded transition"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </header>

      {/* Profile Dropdown on Page Right Side */}
      {user && profileOpen && (
        <div
          ref={profileRef}
          className="fixed top-20 right-5 w-56 bg-white rounded-2xl shadow-xl border border-gray-200 text-gray-700 py-2 z-50 transition-all duration-300 ease-out"
        >
          <div className="px-5 py-4 border-b border-gray-200">
            <p className="font-semibold truncate">{user.name}</p>
            <p className="text-sm text-gray-500 truncate">{user.email}</p>
          </div>
          <button
            onClick={() => {
              navigate("/order-confirmation");
              setProfileOpen(false);
            }}
            className="w-full text-left px-5 py-3 hover:bg-gray-100 transition text-gray-700 font-medium"
          >
            My Orders
          </button>
          {isAdmin && (
            <button
              onClick={() => {
                navigate("/admin");
                setProfileOpen(false);
              }}
              className="w-full text-left px-5 py-3 hover:bg-gray-100 transition text-gray-700 font-medium"
            >
              Dashboard
            </button>
          )}
          <button
            onClick={handleLogout}
            className="w-full text-left px-5 py-3 hover:bg-red-50 transition text-red-500 font-semibold"
          >
            Logout
          </button>
        </div>
      )}

      {/* Cart Sidebar */}
      <CartSidebar open={cartOpen} setOpen={setCartOpen} />
    </>
  );
}
