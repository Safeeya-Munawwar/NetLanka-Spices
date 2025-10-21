import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaLeaf, FaSeedling, FaAppleAlt, FaCarrot, FaCoffee } from "react-icons/fa";
import { FiHeart, FiShoppingCart, FiSearch, FiX, FiMenu } from "react-icons/fi";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import CartSidebar from "./CartSidebar";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function Nav() {
  const [cartOpen, setCartOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Spices");
  const [activeTab, setActiveTab] = useState("menu");
  const [categories, setCategories] = useState([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const sliderRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0);
  const wishlistCount = wishlistItems.length || 0;

  const user = JSON.parse(localStorage.getItem("user")) || null;
  const isAdmin = user?.role === "admin";

  const leftLinks = [
    { to: "/", label: "Home" },
    { to: "/sale", label: "Sale" },
    { to: "/contact", label: "Contact Us" },
  ];
  const rightLinks = [
    { to: "/about", label: "About Us" },
    { to: "/orders", label: "Order Status" },
    { to: "/blog", label: "Blog" },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/categories");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((cat, idx) => ({
            name: cat.title,
            slug: cat.slug || cat.title.toLowerCase().replace(/\s+/g, "-"),
            icon: cat.icon || [FaLeaf, FaSeedling, FaAppleAlt, FaCarrot, FaCoffee][idx % 5],
          }));
          setCategories(mapped);
        } else {
          setCategories([
            "Top rated", "Spices", "Organic Flavors", "Insecticide", "Home Page",
            "Home and garden", "Herbs", "Herbal tea", "Herbal", "Flowers",
            "Dry Fruits & Vegetables", "Dried Seeds", "Dried Leaves",
          ]);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setCategories([
          "Top rated", "Spices", "Organic Flavors", "Insecticide", "Home Page",
          "Home and garden", "Herbs", "Herbal tea", "Herbal", "Flowers",
          "Dry Fruits & Vegetables", "Dried Seeds", "Dried Leaves",
        ]);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollBy = (distance) => sliderRef.current?.scrollBy({ left: distance, behavior: "smooth" });
  const handleScrollLeft = () => scrollBy(-240);
  const handleScrollRight = () => scrollBy(240);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    const check = () => {
      setCanScrollLeft(el.scrollLeft > 5);
      setCanScrollRight(el.scrollWidth - el.clientWidth - el.scrollLeft > 5);
    };
    check();
    el.addEventListener("scroll", check);
    window.addEventListener("resize", check);
    return () => {
      el.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  const handleSearch = async () => {
    const term = searchTerm.trim();
    if (!term) return;
    try {
      const res = await fetch(`http://localhost:5000/api/search?query=${encodeURIComponent(term)}`);
      const { products = [], categories: catRes = [] } = await res.json();
      if (catRes.length > 0) navigate(`/categories/${catRes[0].slug}`);
      else if (products.length > 0) navigate(`/products/${products[0].id}`);
      else navigate(`/search?query=${encodeURIComponent(term)}`);
    } catch (err) {
      console.error("Search failed:", err);
    }
    setSearchTerm("");
    setSearchOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setProfileOpen(false);
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const desktopCategories = [
    "Top rated", "Spices", "Organic Flavors", "Insecticide", "Home Page",
    "Home and garden", "Herbs", "Herbal tea", "Herbal", "Flowers",
    "Dry Fruits & Vegetables", "Dried Seeds", "Dried Leaves",
  ];

  return (
    <>
      {/* Header */}
      <header className="w-full bg-white border-b border-gray-200 relative z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative flex items-center justify-between py-4">
            {/* Left Icons */}
            <div className="flex items-center space-x-6">
              <button onClick={() => setSearchOpen(s => !s)} className="text-2xl text-gray-700 hover:text-[#5b2d0d] transition"><FiSearch /></button>
              {user ? (
                <div className="relative" ref={profileRef}>
                  <button onClick={() => setProfileOpen(s => !s)} className="text-2xl text-gray-700 hover:text-[#5b2d0d] transition"><FaUserCircle /></button>
                  {profileOpen && (
                    <div className="absolute left-0 mt-3 w-60 bg-white rounded-md shadow-lg border border-gray-100 z-50">
                      <div className="px-4 py-3 border-b">
                        <p className="font-semibold truncate">{user.name}</p>
                        <p className="text-sm text-gray-500 truncate">{user.email}</p>
                      </div>
                      <button onClick={() => { navigate("/order-confirmation"); setProfileOpen(false); }} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">My Orders</button>
                      {isAdmin && <button onClick={() => { navigate("/admin"); setProfileOpen(false); }} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Dashboard</button>}
                      <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 font-semibold hover:bg-red-50">Logout</button>
                    </div>
                  )}
                </div>
              ) : <Link to="/login" className="text-2xl text-gray-700 hover:text-[#5b2d0d]"><FaUserCircle /></Link>}
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex flex-1 items-center justify-center">
              <nav className="flex items-center space-x-6">
                <div className="flex items-center space-x-6 text-gray-700 text-sm">
                  {leftLinks.map(l => <NavLink key={l.to} to={l.to} className={({ isActive }) => `hover:text-red-600 font-semibold ${l.className || ""} ${isActive ? "text-red-600" : ""}`}>{l.label}</NavLink>)}
                </div>
                <div className="mx-6 flex flex-col items-center"><img src="/images/logo1.png" alt="Logo" className="w-10 h-auto object-contain" /></div>
                <div className="flex items-center space-x-6 text-gray-700 text-sm">
                  {rightLinks.map(l => <NavLink key={l.to} to={l.to} className={({ isActive }) => `hover:text-red-600 font-semibold ${isActive ? "text-red-600" : ""}`}>{l.label}</NavLink>)}
                </div>
              </nav>
            </div>

            {/* Right Icons + Mobile Menu */}
            <div className="flex items-center space-x-6">
              <Link to="/wishlist" className="relative text-gray-700 hover:text-[#5b2d0d]"><FiHeart size={20} />{wishlistCount>0 && <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{wishlistCount}</span>}</Link>
              <button onClick={() => setCartOpen(true)} className="relative text-gray-700 hover:text-[#5b2d0d]"><FiShoppingCart size={20} />{cartCount>0 && <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>}</button>
              <button className="md:hidden text-2xl text-gray-700 hover:text-[#5b2d0d]" onClick={() => setMobileMenuOpen(true)}><FiMenu /></button>
            </div>
          </div>

          {/* Search */}
          {searchOpen && (
            <div className="w-full bg-white border-t border-gray-100 py-3">
              <div className="max-w-3xl mx-auto px-4 flex items-center gap-3">
                <input type="text" placeholder="Search..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleSearch()} className="w-full px-4 py-3 border rounded-md outline-none shadow-sm focus:ring-2 focus:ring-[#5b2d0d]" />
                <button onClick={handleSearch} className="px-5 py-2 bg-[#5b2d0d] text-white rounded-md font-semibold hover:bg-[#174d3b] transition">Go</button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Desktop Categories Slider */}
      <div className="hidden md:block w-full bg-white border-t border-gray-200 relative z-30 border-b">
        <div className="max-w-7xl mx-auto px-2">
          <div className="relative flex items-center py-3">
            <button onClick={handleScrollLeft} className={`p-2 rounded-full hover:bg-gray-100 transition mr-2 ${canScrollLeft?"opacity-100":"opacity-40 pointer-events-none"}`}><IoChevronBack size={20} /></button>
            <div ref={sliderRef} className="flex gap-8 overflow-x-auto no-scrollbar whitespace-nowrap px-2 py-1 flex-1">
              {desktopCategories.map((name,i)=>(
                <button key={i} onClick={()=>{setActiveCategory(name); navigate(`/categories/${encodeURIComponent(name.toLowerCase().replace(/\s+/g,"-"))}`);}} className={`text-sm font-medium ${name===activeCategory?"text-[#2db1c0] font-semibold":"text-gray-700 hover:text-[#5b2d0d]"}`}>{name}</button>
              ))}
            </div>
            <button onClick={handleScrollRight} className={`p-2 rounded-full hover:bg-gray-100 transition ml-2 ${canScrollRight?"opacity-100":"opacity-40 pointer-events-none"}`}><IoChevronForward size={20} /></button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden" onClick={()=>setMobileMenuOpen(false)}></div>
          <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 md:hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <img src="/images/logo1.png" alt="Logo" className="w-10 h-auto"/>
              <button onClick={()=>setMobileMenuOpen(false)} className="text-gray-700 text-2xl"><FiX /></button>
            </div>

            {/* Tabs */}
            <div className="flex border-b">
              <button onClick={()=>setActiveTab("menu")} className={`flex-1 py-3 text-center font-semibold ${activeTab==="menu"?"border-b-2 border-[#5b2d0d] text-[#5b2d0d]":"text-gray-500"}`}>MENU</button>
              <button onClick={()=>setActiveTab("categories")} className={`flex-1 py-3 text-center font-semibold ${activeTab==="categories"?"border-b-2 border-[#5b2d0d] text-[#5b2d0d]":"text-gray-500"}`}>CATEGORIES</button>
            </div>

            <div className="p-5 overflow-y-auto h-[calc(100%-120px)] flex flex-col justify-between">
              {/* Links / Categories */}
              <div>
                {activeTab==="menu" ? (
                  <ul className="space-y-4 text-gray-700 text-base">
                    {[...leftLinks,...rightLinks,{to:"/wishlist",label:"Wishlist"}].map((item,i)=>
                      <li key={i}><Link to={item.to} onClick={()=>setMobileMenuOpen(false)} className="block py-2 hover:text-red-600">{item.label}</Link></li>
                    )}
                  </ul>
                ) : (
                  <ul className="space-y-4 text-gray-700 text-base">
                    {categories.map((cat,i)=>{
                      const name = typeof cat==="string"?cat:cat.name;
                      const slug = typeof cat==="string"?encodeURIComponent(cat.toLowerCase().replace(/\s+/g,"-")):cat.slug;
                      return (
                        <li key={i}><button onClick={()=>{navigate(`/categories/${slug}`); setMobileMenuOpen(false);}} className="w-full text-left hover:text-red-600">{name}</button></li>
                      )
                    })}
                  </ul>
                )}
              </div>

              {/* Profile + Logout */}
              {user ? (
                <div className="mt-6 border-t pt-4">
                  <div className="mb-3">
                    <p className="font-semibold truncate">{user.name}</p>
                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                  </div>
                  <button onClick={handleLogout} className="block w-full text-left text-red-600 font-semibold py-2 hover:bg-red-50 rounded">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="mt-6 border-t pt-4">
                  <Link to="/login" onClick={()=>setMobileMenuOpen(false)} className="block w-full text-left text-red-600 font-semibold py-2 hover:bg-red-50 rounded">
                    Login / Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <CartSidebar open={cartOpen} setOpen={setCartOpen}/>
    </>
  );
}
