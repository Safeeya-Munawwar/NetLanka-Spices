import React from "react";
import { Link } from "react-router-dom";
import { FaCoffee, FaGlobe, FaSeedling, FaEye } from "react-icons/fa";

export default function Header() {
  return (
    <div className="w-full bg-white font-sans mt-9 mb-0">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto bg-white flex flex-col-reverse md:flex-row items-center justify-between py-10 px-4 sm:px-6 md:px-8 gap-10 md:gap-16">
        {/* Left Text */}
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#5b2d0d] leading-snug">
            Taste the Essence Of Nature
          </h1>
          <p className="text-gray-700 text-[15px] sm:text-[16px] leading-7">
            At Net Spice's, we bring you the vibrant flavors and natural
            goodness of Sri Lanka to the global stage. Specializing in premium
            foods, aromatic herbs, exotic spices, and the world-renowned Ceylon
            tea, our mission is to deliver purity, freshness, and quality in
            every shipment. With deep roots in traditional agriculture and a
            passion for sustainable sourcing, Zest Ceylon ensures every product
            is handpicked and processed to retain its authentic essence.
            Whether you're a gourmet brand, a tea merchant, or a wellness
            company, our export solutions are tailored to meet your exact
            needs—with consistency, care, and a zest for excellence.
          </p>

          {/* Centered Button */}
          <div className="flex justify-center md:justify-start">
            <Link to="/products">
              <button className="bg-[#d9b55a] hover:bg-[#c5a24f] text-white font-semibold text-[15px] border border-yellow-400 px-10 py-3 rounded-xl shadow-sm transition-all w-full sm:w-auto">
                View Products
              </button>
            </Link>
          </div>
        </div>

        {/* Right Image (appears first on mobile) */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <img
            src="/head.png"
            alt="Spices Mix"
            className="max-w-[85%] sm:max-w-sm md:max-w-md lg:max-w-lg w-full h-auto bg-transparent"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full bg-white py-10">
        <div className="flex justify-center">
          <div className="bg-[#faf7f4] max-w-5xl w-full mx-4 sm:mx-6 md:mx-8 lg:mx-auto rounded-xl py-10 px-6 sm:px-8 md:px-12 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {/* Feature 1 */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                <div className="bg-[#f3b41b] p-3 rounded-md flex items-center justify-center min-w-[45px] min-h-[45px] mx-auto sm:mx-0">
                  <FaCoffee className="text-[#2d2d2d] w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#2d2d2d] text-lg mb-1">Flavors</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
                    provident omnis esse illo consequatur eveniet distinctio nulla molestias.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                <div className="bg-[#f3b41b] p-3 rounded-md flex items-center justify-center min-w-[45px] min-h-[45px] mx-auto sm:mx-0">
                  <FaGlobe className="text-[#2d2d2d] w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#2d2d2d] text-lg mb-1">Export</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, maxime, minima ipsum inventore enim cum sit.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                <div className="bg-[#f3b41b] p-3 rounded-md flex items-center justify-center min-w-[45px] min-h-[45px] mx-auto sm:mx-0">
                  <FaSeedling className="text-[#2d2d2d] w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#2d2d2d] text-lg mb-1">Cultivation</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
                    temporibus corporis esse rem non fugit tenetur modi saepe.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                <div className="bg-[#f3b41b] p-3 rounded-md flex items-center justify-center min-w-[45px] min-h-[45px] mx-auto sm:mx-0">
                  <FaEye className="text-[#2d2d2d] w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#2d2d2d] text-lg mb-1">Testing</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Laudantium quia quod fugit facilis labore nesciunt iste
                    necessitatibus, quas recusandae deleniti.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}