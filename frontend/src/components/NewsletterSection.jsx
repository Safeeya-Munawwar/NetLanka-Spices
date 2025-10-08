import React from "react";

export default function NewsletterSection() {
  return (
    <div className="bg-[#f9f2f2] py-12 px-4 md:px-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Left Image */}
        <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
          <img
            src="/news2 .png" // change this to your image path
            alt="Spices"
            className="max-w-lg w-full object-contain rounded-md"
          />
        </div>

        {/* Right Text Section */}
        <div className="w-full md:w-1/2 text-left">
          <p className="text-gray-500 mb-2">Don’t Miss Out..!</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#4B1E0C] mb-6">
            Sign Up for Our Newsletter
          </h2>

          <form className="space-y-4">
            <input
              type="email"
              placeholder="Your Email Address"
              className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-[#4B1E0C]"
            />
            <button
              type="submit"
              className="w-full bg-[#4B1E0C] text-white font-semibold py-3 rounded hover:bg-[#3a1709] transition"
            >
              SIGN UP
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-4">
            Will be used in accordance with our{" "}
            <span className="font-semibold text-[#4B1E0C] cursor-pointer hover:underline">
              Privacy Policy
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
