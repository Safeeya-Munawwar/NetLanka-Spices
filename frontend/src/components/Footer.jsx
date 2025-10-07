import React from "react";
import { FaFacebookF, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <div className="w-full">
      {/* Top decorative background */}
      <div
        className="w-full h-[180px] bg-cover bg-center"
        style={{ backgroundImage: "url('/foot.png')" }}
      ></div>
      {/* Footer Content */}
      <section className="w-full bg-[#302019]">
        <div className="max-w-7xl mx-auto px-6 py-12 text-white grid md:grid-cols-3 gap-10 border-b border-[#4a3322]">
          {/* Left - Logo & Mission */}
          <div className="flex flex-col items-center md:items-start space-y-4 text-center md:text-left">
            <h2 className="text-lg font-semibold text-[#b9843c]">
              Net Spice's
            </h2>
            <img
              src="/images/logo.png"
              alt="Zest Logo"
              className="w-auto h-20 mx-auto md:mx-0"
            />
            <p className="text-sm text-gray-200 max-w-xs text-justify">
              Our mission is to deliver purity, freshness, and quality in every
              shipment.
            </p>
          </div>
          {/* Middle - Quick Links */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <h2 className="text-lg font-semibold text-[#b9843c]">
              Quick Links
            </h2>
            <a href="/" className="hover:text-gray-300 text-sm">
              Home
            </a>
            <a href="/" className="hover:text-gray-300 text-sm">
              Products
            </a>
            <a href="/" className="hover:text-gray-300 text-sm">
              Categories
            </a>
            <a href="/" className="hover:text-gray-300 text-sm">
              About Us
            </a>
            <a href="/" className="hover:text-gray-300 text-sm">
              Contact Us
            </a>
          </div>
          {/* Right - Newsletter & Contact */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h2 className="text-lg font-semibold text-[#b9843c]">
              SIGNUP FOR NEWSLETTER
            </h2>
            <div className="flex w-full max-w-xs">
              <input
                type="email"
                placeholder="enter your e-mail"
                className="w-full px-4 py-2 rounded-l-full text-black outline-none"
              />
              <button className="px-5 py-2 bg-[#fff1d0] text-black rounded-r-full font-medium hover:bg-yellow-200">
                Send
              </button>
            </div>
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-200">
              <p className="flex items-center gap-2">
                <MdLocationOn className="text-[#b9843c]" />
                13/2 , Yatimeeya, Kotadeniyawa.
              </p>
              <p className="flex items-center gap-2">
                <MdPhone className="text-[#b9843c]" />
                +94 77 448 9793
              </p>
              <p className="flex items-center gap-2">
                <MdEmail className="text-[#b9843c]" />
                info@netspices.com
              </p>
            </div>
          </div>
        </div>
        {/* Social Media & Bottom Copyright */}
        <div className="w-full bg-[#27170f] py-6">
          <div className="flex justify-center space-x-6 text-xl text-[#b9843c] mb-4">
            <a href="/" className="hover:text-gray-300">
              <FaFacebookF />
            </a>
            <a href="/" className="hover:text-gray-300">
              <FaWhatsapp />
            </a>
            <a href="/" className="hover:text-gray-300">
              <FaInstagram />
            </a>
          </div>
          <div className="text-center text-sm text-gray-300">
            Copyright © 2025 Net Spices | Powered by NetIT Technology (Pvt) Ltd
          </div>
        </div>
      </section>
    </div>
  );
}
