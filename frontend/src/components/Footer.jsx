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
          backgroundImage: "url('/40944.jpg')",
        }}
      ></div>

      {/* Transparent Overlay */}
      <div className="absolute inset-0 bg-white/60"></div>

      {/* Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
        {/* Left Section - Logo & Mission */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3 sm:space-y-4">
          <img
            src="/images/logo1.png"
            alt="Net Spices Logo"
            className="w-24 sm:w-28 md:w-32 h-auto object-contain"
          />
          <h2 className="text-xl sm:text-2xl font-bold text-[#7b5941]">Net Spices</h2>
          <p className="text-sm sm:text-base md:text-lg font-semibold text-black leading-relaxed">
            Our mission is to deliver purity, <br />
            freshness and quality in every shipment.
          </p>
        </div>

        {/* Middle Section - Quick Links */}
        <div className="flex flex-col items-center md:items-start space-y-2 sm:space-y-3">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#4b3a2b] mb-1 sm:mb-2">
            Quick Links
          </h3>
          {["Home", "About Us", "Products", "Categories", "Contact Us"].map((link) => (
            <a
              key={link}
              href={`/${link.toLowerCase().replace(" ", "")}`}
              className="text-sm sm:text-base md:text-lg font-semibold hover:text-[#8d6a4a] transition"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right Section - Contact Info */}
        <div className="flex flex-col items-center md:items-start space-y-3 sm:space-y-4">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#4b3a2b] mb-1 sm:mb-2">
            Contact Us
          </h3>

          <p className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg font-semibold">
            <MdEmail className="text-[#8d6a4a] text-lg sm:text-xl md:text-2xl" />
            info@netspices.com
          </p>
          <p className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg font-semibold">
            <MdPhone className="text-[#8d6a4a] text-lg sm:text-xl md:text-2xl" />
            +94 77 448 9793
          </p>
          <p className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg font-semibold leading-snug text-center md:text-left">
            <MdLocationOn className="text-[#8d6a4a] text-lg sm:text-xl md:text-2xl" />
            13/2, Yatimeeya, <br /> Kotadeniyawa.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4 sm:space-x-6 pt-3 text-2xl sm:text-3xl text-[#3c2a1a]">
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

      {/* Bottom Bar */}
      <div className="relative bg-[#4b2f22] text-white py-3 sm:py-4 text-xs sm:text-sm md:text-base text-center font-medium">
        Copyright © {new Date().getFullYear()} Net Spices | Powered By{" "}
        <span className="text-[#f7d9b3]">NetIT Technology</span>
      </div>
    </footer>
  );
}
