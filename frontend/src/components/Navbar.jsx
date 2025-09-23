import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import CartSidebar from "./CartSidebar"; // import your CartSidebar

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false); // new state for cart sidebar
  const { cartItems } = useCart();

  const linkClass = ({ isActive }) =>
    `block px-2 py-2 text-[12pt] rounded hover:text-blue-300 transition ${
      isActive ? "text-blue-400 font-semibold" : "text-gray-200 font-bold"
    }`;

  return (
    <>
      <header className="w-full bg-[#302019] top-0 z-50 md:h-32 border-b border-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-4 md:py-7">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/images/logo.png" alt="Logo" className="h-20 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/about" className={linkClass}>About us</NavLink>
            <NavLink to="/products" className={linkClass}>Products</NavLink>
            <NavLink to="/categories" className={linkClass}>Categories</NavLink>
            <NavLink to="/contact" className={linkClass}>Contact us</NavLink>

            {/* Cart Icon */}
            <div
              className="relative flex items-center ml-4 cursor-pointer"
              onClick={() => setCartOpen(true)} // open cart sidebar
            >
              <FaShoppingCart size={24} className="text-white" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItems.length}
                </span>
              )}
            </div>
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
          className={`md:hidden bg-[#152310] border-t overflow-hidden transition-all duration-300 ${
            open ? "max-h-96" : "max-h-0"
          }`}
        >
          <ul className="flex flex-col space-y-2 px-4 py-4">
            <li>
              <NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={linkClass} onClick={() => setOpen(false)}>
                About us
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" className={linkClass} onClick={() => setOpen(false)}>
                Products
              </NavLink>
            </li>
            <li>
              <NavLink to="/categories" className={linkClass} onClick={() => setOpen(false)}>
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={linkClass} onClick={() => setOpen(false)}>
                Contact us
              </NavLink>
            </li>
            <li className="flex items-center gap-2 mt-2 cursor-pointer" onClick={() => setCartOpen(true)}>
              <FaShoppingCart size={20} className="text-white" />
              <span className="text-white">{cartItems.length} items</span>
            </li>
          </ul>
        </div>
      </header>

      {/* Cart Sidebar */}
      <CartSidebar open={cartOpen} setOpen={setCartOpen} />
    </>
  );
}
