import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {  FaUserCircle } from "react-icons/fa";

import CartSidebar from "./CartSidebar";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const profileRef = useRef();

  const user = JSON.parse(localStorage.getItem("user")) || null;
  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setProfileOpen(false);
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="w-full bg-[#fff6af] shadow-sm border-b border-[#eee] z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Left: Logo & Brand */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/images/logo1.png"
              alt="Net Spices Logo"
              className="w-16 h-full  object-cover"
            />
          
          </Link>

          {/* Center: Navigation Links */}
          <nav className="hidden md:flex space-x-8 text-[#4A2F1D] font-bold text-lg">
            <NavLink to="/" className="hover:text-yellow-600">Home</NavLink>
            <NavLink to="/about" className="hover:text-yellow-600">About us</NavLink>
            <NavLink to="/products" className="hover:text-yellow-600">Products</NavLink>
            <NavLink to="/categories" className="hover:text-yellow-600">Categories</NavLink>
            <NavLink to="/contact" className="hover:text-yellow-600">Contact Us</NavLink>
          </nav>

          {/* Right: Cart, Profile, Search */}
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🚚</span>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Enter.."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 rounded bg-[#BDA895] text-[#4A2F1D] placeholder-[#4A2F1D] outline-none w-32 md:w-48"
            />
            <button
              onClick={handleSearch}
              className="bg-[#E6C152] text-white font-bold px-4 py-2 rounded"
            >
              Search
            </button>

         

            {/* Profile Icon */}
            {user && (
              <div className="relative" ref={profileRef}>
                <FaUserCircle
                  size={28}
                  className="text-[#514944] cursor-pointer"
                  onClick={() => setProfileOpen(!profileOpen)}
                />

                {/* Profile Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border z-50">
                    <div className="px-4 py-3 border-b">
                      <p className="font-semibold truncate">{user.name}</p>
                      <p className="text-sm text-gray-600 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        navigate("/order-confirmation");
                        setProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      My Orders
                    </button>
                    {isAdmin && (
                      <button
                        onClick={() => {
                          navigate("/admin");
                          setProfileOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                      >
                        Dashboard
                      </button>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-red-50 text-sm text-red-600 font-semibold"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              className="md:hidden flex flex-col justify-between w-6 h-5 ml-3"
              onClick={() => setOpen(!open)}
            >
              <span className="h-0.5 w-6 bg-[#4A2F1D]"></span>
              <span className="h-0.5 w-6 bg-[#4A2F1D]"></span>
              <span className="h-0.5 w-6 bg-[#4A2F1D]"></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden px-4 pb-4 space-y-2 text-[#4A2F1D] font-semibold text-base">
            <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
            <NavLink to="/about" onClick={() => setOpen(false)}>About us</NavLink>
            <NavLink to="/products" onClick={() => setOpen(false)}>Products</NavLink>
            <NavLink to="/categories" onClick={() => setOpen(false)}>Categories</NavLink>
            <NavLink to="/contact" onClick={() => setOpen(false)}>Contact Us</NavLink>

            {user && (
              <>
                <div className="border-t pt-2">
                  <p>{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <button onClick={() => { navigate("/order-confirmation"); setOpen(false); }}>My Orders</button>
                {isAdmin && (
                  <button onClick={() => { navigate("/admin"); setOpen(false); }}>Dashboard</button>
                )}
                <button onClick={handleLogout} className="text-red-600">Logout</button>
              </>
            )}
          </div>
        )}
      </header>

      {/* Cart Sidebar */}
      <CartSidebar open={cartOpen} setOpen={setCartOpen} />
    </>
  );
}
