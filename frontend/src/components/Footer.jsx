import React from "react";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative w-full text-[#3c2a1a] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-95"
        style={{
          backgroundImage: "url('/40944.jpg')", // replace with your spice pattern image
        }}
      ></div>

      {/* Transparent Overlay for smooth readability */}
      <div className="absolute inset-0 bg-white/60"></div>

      {/* Footer Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left Section - Logo & Mission */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          <img
            src="/images/logo1.png"
            alt="Net Spices Logo"
            className="w-32 h-32 object-contain"
          />
          <h2 className="text-2xl font-bold text-[#7b5941]">Net Spices</h2>
          <p className="text-lg font-semibold text-black leading-relaxed">
            Our mission is to deliver purity, <br />
            freshness and quality in every shipment.
          </p>
        </div>

        {/* Middle Section - Quick Links */}
        <div className="flex flex-col items-center md:items-start space-y-3">
          <h3 className="text-2xl font-bold text-[#4b3a2b] mb-2">
            Quick Links
          </h3>
          <a href="/" className="text-lg font-semibold hover:text-[#8d6a4a] transition">
            Home
          </a>
          <a href="/about" className="text-lg font-semibold hover:text-[#8d6a4a] transition">
            About Us
          </a>
          <a href="/products" className="text-lg font-semibold hover:text-[#8d6a4a] transition">
            Products
          </a>
          <a href="/categories" className="text-lg font-semibold hover:text-[#8d6a4a] transition">
            Categories
          </a>
          <a href="/contact" className="text-lg font-semibold hover:text-[#8d6a4a] transition">
            Contact Us
          </a>
        </div>

        {/* Right Section - Contact Info */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <h3 className="text-2xl font-bold text-[#4b3a2b] mb-2">Contact Us</h3>

          <p className="flex items-center gap-3 text-lg font-semibold">
            <MdEmail className="text-[#8d6a4a] text-2xl" />
            info@netspices.com
          </p>
          <p className="flex items-center gap-3 text-lg font-semibold">
            <MdPhone className="text-[#8d6a4a] text-2xl" />
            +94 77 448 9793
          </p>
          <p className="flex items-center gap-3 text-lg font-semibold leading-snug text-center md:text-left">
            <MdLocationOn className="text-[#8d6a4a] text-2xl" />
            13/2, Yatimeeya, <br /> Kotadeniyawa.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-6 pt-3 text-3xl text-[#3c2a1a]">
            <Link href="#" className="hover:text-[#8d6a4a] transition">
              <FaFacebookF />
            </Link>
            <Link href="#" className="hover:text-[#8d6a4a] transition">
              <FaInstagram />
            </Link>
            <Link href="#" className="hover:text-[#8d6a4a] transition">
              <FaYoutube />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="relative bg-[#4b2f22] text-white py-4 text-center text-sm font-medium">
        Copyright © {new Date().getFullYear()} Net Spices | Powered By{" "}
        <span className="text-[#f7d9b3]">NetIT Technology</span>
      </div>
    </footer>
  );
}
