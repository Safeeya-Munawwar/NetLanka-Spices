import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function All() {
  const navigate = useNavigate();

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/all2.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 flex items-center py-10 px-4 sm:px-6 md:px-40">
        <div className="max-w-7xl w-full text-white space-y-8">
          {/* Heading Section */}
          <div>
            <h1 className="font-serif text-[#B59D56] text-lg sm:text-xl italic mb-2 text-left">
              Net Spice's
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#3A1F04] mb-6 sm:mb-10 text-left tracking-wide leading-tight">
              ALL SPICE'S AT ONE PLACE
            </h2>
          </div>

          {/* Paragraph Section */}
          <div className="py-2 sm:py-4">
            <p className="text-[#faf1c3] text-sm sm:text-base md:text-[18px] leading-relaxed font-medium text-justify">
              <span className="font-bold">Sri Lanka</span>, renowned as the island of spices, is home to Zest Ceylon—your ultimate online destination for premium Sri Lankan spices. Whether you're seeking bold, aromatic flavors or stocking up in bulk, Zest Ceylon brings you a rich selection of both organic and conventional spices, all in one place. As one of the country's leading wholesale spice suppliers, we're proud to offer top-quality herbs, spices, and culinary ingredients at the best prices. Taste the essence of Sri Lanka—pure, fresh, and full of zest.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad sint blanditiis nisi accusamus, suscipit ipsum eum maiores repudiandae iste eius eligendi beatae illum quaerat accusantium quibusdam consectetur a esse quia.
            </p>
          </div>

          {/* Button Section */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-24 mt-8 sm:mt-14">
            <button
              onClick={() => navigate('/about')}
              className="bg-white/30 hover:bg-white/40 text-yellow-300 px-4 py-2 sm:px-6 sm:py-3 rounded-md text-sm sm:text-lg font-semibold border border-slate-300 transition w-[70%] sm:w-auto mx-auto sm:mx-0"
            >
              Learn More
            </button>

            <button
              onClick={() => navigate('/products')}
              className="bg-[#E6C152] hover:bg-[#D4AD3D] text-white px-5 py-2 sm:px-8 sm:py-3 rounded-md text-sm sm:text-lg font-bold transition border w-[70%] sm:w-auto mx-auto sm:mx-0"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
