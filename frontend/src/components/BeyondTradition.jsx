import React from "react";

export default function BeyondTradition() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Titles */}
        <h1 className="font-serif text-[#B59D56] text-xl italic mb-1">
          Net Spice's
        </h1>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#3A1F04] mb-16 tracking-wide">
          BEYOND TRADITION
        </h2>

       <div className="bg-slate-100 max-w-6xl mx-auto px-5 py-5 rounded-md">
         {/* First Two Main Halves */}
        <div className="flex flex-col md:flex-row gap-2 mb-2">
          {/* Left Half with Overlay */}
          <div className="w-full md:w-1/2 relative">
            <div className="rounded-md overflow-hidden h-[420px]">
              <img
                src="/9.webp"
                alt="Processing continuation"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overlay Content Box */}
            <div className="absolute bottom-0 left-0 p-8 bg-white/70 backdrop-blur-[2px] w-[90%] m-8 rounded-md">
              <h3 className="text-lg font-bold text-[#1F4D3E] mb-3 uppercase">
                SEE HOW IT PROCESSED
              </h3>
              <p className="text-base leading-relaxed text-gray-800">
                Handpicked at dawn, only the finest Cinnamon are carefully plucked
                by skilled hands in Sri Lanka’s lush highlands. These tender leaves
                are quickly transported to the factory, where they undergo expert
                withering, rolling, oxidation, and drying processes to preserve
                their rich flavor and aroma. Once perfected, the tea is
                meticulously sorted, graded, and packaged with care, to deliver
                the pure taste of Ceylon to the world.
              </p>
            </div>
          </div>

          {/* Right Half */}
          <div className="w-full md:w-1/2 flex flex-col gap-2">
            <div className="rounded-md overflow-hidden h-[210px]">
              <img
                src="/8.webp"
                alt="Processing continuation"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-md overflow-hidden h-[210px]">
              <img
                src="/5.webp"
                alt="Processing continuation"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Third Row of 3 Images */}
        <div className="flex flex-col md:flex-row gap-2">
          <div className="w-full md:w-1/3 rounded-md overflow-hidden h-[300px]">
            <img
              src="/7.webp"
              alt="Processing continuation"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-1/3 rounded-md overflow-hidden h-[300px]">
            <img
              src="/3.webp"
              alt="Processing continuation"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-1/3 rounded-md overflow-hidden h-[300px]">
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
