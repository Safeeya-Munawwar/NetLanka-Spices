import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FiHeart, FiShoppingCart, FiHome } from "react-icons/fi";
import CartSidebar from "./CartSidebar";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext"; // <-- import wishlist context

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const profileRef = useRef();
  const navigate = useNavigate();

  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const { wishlistItems } = useWishlist(); // get wishlist items from context
  const wishlistCount = wishlistItems.length;

  const user = JSON.parse(localStorage.getItem("user")) || null;
  const isAdmin = user?.role === "admin";

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
    setOpen(false);
    setSearchTerm("");
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
      <header className="w-full bg-[#fff6af] shadow-md border-b border-[#eee] z-50 relative">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/images/logo1.png"
              alt="Logo"
              className="w-16 md:w-20 h-auto object-contain"
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-8 text-[#4A2F1D] font-semibold text-lg">
            <NavLink to="/" className="hover:text-yellow-600 transition">Home</NavLink>
            <NavLink to="/about" className="hover:text-yellow-600 transition">About</NavLink>
            <NavLink to="/products" className="hover:text-yellow-600 transition">Products</NavLink>
            <NavLink to="/categories" className="hover:text-yellow-600 transition">Categories</NavLink>
            <NavLink to="/contact" className="hover:text-yellow-600 transition">Contact</NavLink>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="px-3 py-2 rounded bg-[#BDA895] text-[#4A2F1D] placeholder-[#4A2F1D] outline-none w-36 md:w-48"
              />
              <button
                onClick={handleSearch}
                className="bg-[#E6C152] text-white font-semibold px-3 py-2 rounded hover:bg-[#d5b13a] transition"
              >
                Go
              </button>
            </div>

            {/* Wishlist Desktop */}
            <div className="relative">
              <Link to="/wishlist" title="Wishlist" className="hidden md:flex text-2xl hover:text-yellow-600 transition relative">
                <FiHeart />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Cart Desktop */}
            <div className="relative">
              <span
                onClick={() => setCartOpen(true)}
                title="Cart"
                className="hidden md:flex text-2xl cursor-pointer hover:text-yellow-600 transition relative"
              >
                <FiShoppingCart />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                    {cartCount}
                  </span>
                )}
              </span>
            </div>

            {user && (
              <div className="relative" ref={profileRef}>
                <FaUserCircle
                  size={28}
                  className="text-[#4A2F1D] cursor-pointer hover:text-yellow-600 transition"
                  onClick={() => setProfileOpen(!profileOpen)}
                />
                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
                    <div className="px-4 py-3 border-b">
                      <p className="font-semibold truncate">{user.name}</p>
                      <p className="text-sm text-gray-600 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => { navigate("/order-confirmation"); setProfileOpen(false); }}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      My Orders
                    </button>
                    {isAdmin && (
                      <button
                        onClick={() => { navigate("/admin"); setProfileOpen(false); }}
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

        {/* Mobile Bottom Nav */}
        <div className="fixed bottom-0 left-0 w-full bg-[#fff6af] border-t border-[#eee] md:hidden flex justify-around items-center py-2 text-[#4A2F1D] font-semibold">
          <Link to="/" className="flex flex-col items-center text-sm">
            <FiHome size={20} /> Home
          </Link>
          <Link to="/wishlist" className="flex flex-col items-center text-sm relative">
            <FiHeart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center animate-bounce">
                {wishlistCount}
              </span>
            )}
            Wishlist
          </Link>
          <button onClick={() => setCartOpen(true)} className="flex flex-col items-center text-sm relative">
            <FiShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
            Cart
          </button>
          <Link to="/account" className="flex flex-col items-center text-sm">
            <FaUserCircle size={20} /> Account
          </Link>
        </div>
      </header>

      <CartSidebar open={cartOpen} setOpen={setCartOpen} />
    </>
  );
}
