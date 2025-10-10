import React from "react";

export default function BeyondTradition() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Titles */}
        <h1 className="font-serif text-[#B59D56] text-lg sm:text-xl italic mb-1">
          Net Spice's
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#3A1F04] mb-10 sm:mb-16 tracking-wide">
          BEYOND TRADITION
        </h2>

        <div className="bg-slate-100 max-w-6xl mx-auto px-4 sm:px-5 py-5 rounded-md">
          {/* First Two Main Halves */}
          <div className="flex flex-col md:flex-row gap-3 mb-3">
            {/* Left Half with Overlay */}
            <div className="w-full md:w-1/2 relative">
              <div className="rounded-md overflow-hidden h-[280px] sm:h-[350px] md:h-[420px]">
                <img
                  src="/9.webp"
                  alt="Processing continuation"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlay Content Box */}
              <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-0 md:m-8 p-4 sm:p-6 bg-white/80 backdrop-blur-[3px] w-[90%] sm:w-[85%] rounded-md">
                <h3 className="text-base sm:text-lg font-bold text-[#1F4D3E] mb-2 sm:mb-3 uppercase">
                  SEE HOW IT PROCESSED
                </h3>
                <p className="text-xs sm:text-sm md:text-base leading-relaxed text-gray-800">
                  Handpicked at dawn, only the finest Cinnamon are carefully plucked
                  by skilled hands in Sri Lanka’s lush highlands. These tender leaves
                  are quickly transported to the factory, where they undergo expert
                  withering, rolling, oxidation, and drying processes to preserve
                  their rich flavor and aroma. Once perfected, the tea is meticulously
                  sorted, graded, and packaged with care, to deliver the pure taste of
                  Ceylon to the world.
                </p>
              </div>
            </div>

            {/* Right Half */}
            <div className="w-full md:w-1/2 flex flex-col gap-3">
              <div className="rounded-md overflow-hidden h-[180px] sm:h-[200px] md:h-[210px]">
                <img
                  src="/8.webp"
                  alt="Processing continuation"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-md overflow-hidden h-[180px] sm:h-[200px] md:h-[210px]">
                <img
                  src="/5.webp"
                  alt="Processing continuation"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Third Row of 3 Images */}
          <div className="flex flex-col sm:flex-row flex-wrap md:flex-nowrap gap-3">
            <div className="w-full sm:w-1/2 md:w-1/3 rounded-md overflow-hidden h-[200px] sm:h-[250px] md:h-[300px]">
              <img
                src="/7.webp"
                alt="Processing continuation"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 rounded-md overflow-hidden h-[200px] sm:h-[250px] md:h-[300px]">
              <img
                src="/3.webp"
                alt="Processing continuation"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 rounded-md overflow-hidden h-[200px] sm:h-[250px] md:h-[300px]">
              <img
                src="/4.webp"
                alt="Processing continuation"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
