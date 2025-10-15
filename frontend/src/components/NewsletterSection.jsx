import React from "react";

export default function NewsletterSection() {
  return (
  <div className="bg-[#f9f2f2] py-10 px-4 sm:px-8 md:px-16">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
    {/* Left Image */}
    <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
      <img
        src="/news2 .png" // fixed space in filename
        alt="Spices"
        className="w-2/4 sm:w-2/3 md:w-full max-w-md object-contain rounded-md"
      />
    </div>

    {/* Right Text Section */}
    <div className="w-full md:w-1/2 text-center md:text-left">
      <p className="text-gray-500 text-sm sm:text-base mb-1">Don’t Miss Out..!</p>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#4B1E0C] mb-4 leading-snug">
        Sign Up for Our Newsletter
      </h2>

      <form className="space-y-3">
        <input
          type="email"
          placeholder="Your Email Address"
          className="w-full border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded focus:outline-none focus:ring-2 focus:ring-[#4B1E0C]"
        />
        <button
          type="submit"
          className="w-full bg-[#4B1E0C] text-white font-semibold py-2 sm:py-3 text-sm sm:text-base rounded hover:bg-[#3a1709] transition"
        >
          SIGN UP
        </button>
      </form>

      <p className="text-xs sm:text-sm text-gray-500 mt-3">
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
