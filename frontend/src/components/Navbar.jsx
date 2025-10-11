import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
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

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setProfileOpen(false);
    navigate("/login");
  };

const handleSearch = async () => {
  const term = searchTerm.trim();
  if (!term) return;

  try {
    const res = await fetch(`http://localhost:5000/api/search?query=${term}`);
    const { products, categories } = await res.json();

    if (categories.length > 0) {
      navigate(`/categories/${categories[0].slug}`);
    } else if (products.length > 0) {
      navigate(`/products/${products[0].id}`);
    } else {
      navigate(`/search?query=${encodeURIComponent(term)}`);
    }
  } catch (error) {
    console.error("Search failed:", error);
  }

  // ✅ Close mobile menu
  setOpen(false);

  // ✅ Clear the search input after search
  setSearchTerm("");
};



  // ✅ Close profile dropdown when clicking outside
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
      <header className="w-full bg-[#fff6af] shadow-sm border-b border-[#eee] z-50 relative">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/images/logo1.png"
              alt="Net Spices Logo"
              className="w-14 h-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8 text-[#4A2F1D] font-semibold text-lg">
            <NavLink to="/" className="hover:text-yellow-600">Home</NavLink>
            <NavLink to="/about" className="hover:text-yellow-600">About Us</NavLink>
            <NavLink to="/products" className="hover:text-yellow-600">Products</NavLink>
            <NavLink to="/categories" className="hover:text-yellow-600">Categories</NavLink>
            <NavLink to="/contact" className="hover:text-yellow-600">Contact Us</NavLink>
          </nav>

          {/* Right: Cart, Search, Profile */}
          <div className="flex items-center space-x-3">
            {/* Cart Icon */}
            <span
              onClick={() => setCartOpen(true)}
              className="text-2xl cursor-pointer"
              title="View Cart"
            >
              🚚
            </span>

            {/* Search (Desktop) */}
            <div className="hidden sm:flex items-center space-x-2">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="px-3 py-2 rounded bg-[#BDA895] text-[#4A2F1D] placeholder-[#4A2F1D] outline-none w-32 md:w-48"
              />
              <button
                onClick={handleSearch}
                className="bg-[#E6C152] text-white font-semibold px-3 py-2 rounded hover:bg-[#d5b13a] transition"
              >
                Go
              </button>
            </div>

            {/* Profile Icon */}
            {user && (
              <div className="relative" ref={profileRef}>
                <FaUserCircle
                  size={28}
                  className="text-[#4A2F1D] cursor-pointer"
                  onClick={() => setProfileOpen(!profileOpen)}
                />
                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
                    <div className="px-4 py-3 border-b">
                      <p className="font-semibold truncate">{user.name}</p>
                      <p className="text-sm text-gray-600 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        navigate("/order-confirmation");
                        setProfileOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      My Orders
                    </button>
                    {isAdmin && (
                      <button
                        onClick={() => {
                          navigate("/admin");
                          setProfileOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Dashboard
                      </button>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-semibold"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden flex flex-col justify-between w-6 h-5 ml-2 focus:outline-none"
              onClick={() => setOpen(true)}
            >
              <span className="h-0.5 w-6 bg-[#4A2F1D]"></span>
              <span className="h-0.5 w-6 bg-[#4A2F1D]"></span>
              <span className="h-0.5 w-6 bg-[#4A2F1D]"></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <>
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setOpen(false)}
            ></div>

            <div className="absolute top-0 left-0 w-full bg-[#fff6af] shadow-lg z-50 animate-slideDown rounded-b-2xl">
              <div className="flex justify-between items-center px-6 py-4 border-b border-[#ddd]">
                <h2 className="text-lg font-bold text-[#4A2F1D]">Menu</h2>
                <button onClick={() => setOpen(false)}>
                  <IoClose className="text-3xl text-[#4A2F1D]" />
                </button>
              </div>

              <div className="flex flex-col items-start px-6 py-4 space-y-4 font-semibold text-[#4A2F1D]">
                <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
                <NavLink to="/about" onClick={() => setOpen(false)}>About Us</NavLink>
                <NavLink to="/products" onClick={() => setOpen(false)}>Products</NavLink>
                <NavLink to="/categories" onClick={() => setOpen(false)}>Categories</NavLink>
                <NavLink to="/contact" onClick={() => setOpen(false)}>Contact Us</NavLink>

                {/* Mobile Search */}
                <div className="flex items-center space-x-2 w-full pt-2 border-t border-[#ddd]">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="flex-1 px-3 py-2 rounded bg-[#BDA895] text-[#4A2F1D] placeholder-[#4A2F1D] outline-none"
                  />
                  <button
                    onClick={handleSearch}
                    className="bg-[#E6C152] text-white font-semibold px-3 py-2 rounded hover:bg-[#d5b13a] transition"
                  >
                    Go
                  </button>
                </div>

                {/* Profile Section */}
                {user && (
                  <>
                    <div className="border-t pt-2 w-full">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        navigate("/order-confirmation");
                        setOpen(false);
                      }}
                      className="text-left w-full text-sm"
                    >
                      My Orders
                    </button>
                    {isAdmin && (
                      <button
                        onClick={() => {
                          navigate("/admin");
                          setOpen(false);
                        }}
                        className="text-left w-full text-sm"
                      >
                        Dashboard
                      </button>
                    )}
                    <button
                      onClick={handleLogout}
                      className="text-red-600 text-left w-full font-semibold"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </header>

      <CartSidebar open={cartOpen} setOpen={setCartOpen} />
    </>
  );
}