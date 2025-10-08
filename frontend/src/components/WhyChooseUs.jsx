import React from "react";
import { FaSyncAlt, FaSuitcase, FaClock } from "react-icons/fa";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function WhyChooseUs() {
  return (
    <div className="bg-white w-full">
      <div className="max-w-7xl mx-auto px-6 py-16 md:px-20">
        {/* WHY CHOOSE US SECTION */}
        <section className="mb-16">
          <h1 className="font-serif text-[#B59D56] text-xl italic mb-2 text-left">
            Net Spice's
          </h1>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#3A1F04] mb-14 text-left tracking-wide">
            WHY CHOOSE US
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-center py-10">
            {/* Feature 1 */}
            <div className="relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-[#8A3A00] text-white p-4 rounded-full shadow-md">
                <FaSyncAlt size={24} />
              </div>
              <div className="bg-white border p-8 rounded-xl shadow-sm hover:shadow-md transition-all mt-6">
                <h3 className="text-lg font-bold text-[#4b2e05] mb-3">
                  Money Back Guarantee
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Consectetur adipiscing elit sed do eiusmod tempor incididunt ut
                  labore et dolore dolor sit amet.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-[#8A3A00] text-white p-4 rounded-full shadow-md">
                <FaSuitcase size={24} />
              </div>
              <div className="bg-white border p-8 rounded-xl shadow-sm hover:shadow-md transition-all mt-6">
                <h3 className="text-lg font-bold text-[#4b2e05] mb-3">
                  Free Shipping
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Sit amet dolor consectetur adipiscing elit sed do eiusmod tempor
                  incididunt ut labore et dolore.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-[#8A3A00] text-white p-4 rounded-full shadow-md">
                <FaClock size={24} />
              </div>
              <div className="bg-white border p-8 rounded-xl shadow-sm hover:shadow-md transition-all mt-6">
                <h3 className="text-lg font-bold text-[#4b2e05] mb-3">
                  24/7 Customer Service
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Dolor sit amet consectetur adipiscing elit sed do eiusmod tempor
                  incididunt ut labore et dolore.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* CUSTOMER TESTIMONIALS SECTION */}
      <section className="mt-2">
        {/* Headings in main container */}
        <div className="max-w-7xl mx-auto px-6 md:px-20 bg-white ">
          <h1 className="font-serif text-[#B59D56] text-xl italic mb-2 text-left">
            Net Spice's
          </h1>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#3A1F04] mb-14 text-left tracking-wide">
            CUSTOMER TESTIMONIALS
          </h2>
        </div>

        {/* Full-width bluish background for testimonial cards */}
        <div className="bg-[#f7f7f7] py-12 mb-14">
          <div className="max-w-7xl mx-auto px-6 md:px-20 grid md:grid-cols-3 gap-8 text-center">
            {/* Testimonial 1 */}
            <div className="flex flex-col items-center">
              <p className="text-gray-700 mb-4 text-sm leading-relaxed max-w-xs">
                Fringilla est ullamcorper eget nulla facilisi etiam dignissim
                diam. Ac felis donec et odio pellentesque diam volutpat. Justo
                nec ultrices dui sapien eget mi proin sed libero.
              </p>
              <div className="flex justify-center text-[#d4af37] mb-4">
                <FaStar /><FaStar /><FaStar /><FaRegStar /><FaRegStar />
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="/p1.jpeg"
                  alt="Johanna"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-left">
                  <h4 className="font-bold text-[#3A1F04]">Johanna</h4>
                  <p className="text-xs text-gray-500">Designer</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="flex flex-col items-center">
              <p className="text-gray-700 mb-4 text-sm leading-relaxed max-w-xs">
                Fringilla est ullamcorper eget nulla facilisi etiam dignissim
                diam. Ac felis donec et odio pellentesque diam volutpat. Justo
                nec ultrices dui sapien eget mi proin sed libero.
              </p>
              <div className="flex justify-center text-[#d4af37] mb-4">
                <FaStar /><FaStar /><FaStar /><FaStarHalfAlt /><FaRegStar />
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="/p2.jpeg"
                  alt="Charlotte"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-left">
                  <h4 className="font-bold text-[#3A1F04]">Charlotte</h4>
                  <p className="text-xs text-gray-500">Professor</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="flex flex-col items-center">
              <p className="text-gray-700 mb-4 text-sm leading-relaxed max-w-xs">
                Fringilla est ullamcorper eget nulla facilisi etiam dignissim
                diam. Ac felis donec et odio pellentesque diam volutpat. Justo
                nec ultrices dui sapien eget mi proin sed libero.
              </p>
              <div className="flex justify-center text-[#d4af37] mb-4">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaRegStar />
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="/p3.jpeg"
                  alt="Maximilian"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-left">
                  <h4 className="font-bold text-[#3A1F04]">Maximilian</h4>
                  <p className="text-xs text-gray-500">Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
