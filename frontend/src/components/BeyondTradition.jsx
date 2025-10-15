import React, { useEffect, useState } from "react";
import axios from "axios";

export default function BeyondTradition() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/beyondTradition");
      setEntries(res.data);
    } catch (err) {
      console.error("Failed to fetch Beyond Tradition entries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  if (loading) {
    return (
      <section className="py-12 text-center text-gray-500">
        Loading Beyond Tradition entries...
      </section>
    );
  }

  if (entries.length === 0) {
    return (
      <section className="py-12 text-center text-gray-500">
        No Beyond Tradition entries available.
      </section>
    );
  }

  const allCards = entries.flatMap((entry) =>
    entry.images.map((img, index) => ({
      title: entry.title || "",
      subtitle: entry.subtitle || "",
      description: entry.description || "",
      image: img,
      isFirst: index === 0,
    }))
  );

  allCards.sort((a, b) => (a.isFirst === b.isFirst ? 0 : a.isFirst ? -1 : 1));

  const leftMain = allCards[0];
  const topRight = allCards[1];
  const midRight = allCards[2];
  const bottomRow = allCards.slice(3, 6);

  return (
    <section className="py-12 md:py-16 max-w-7xl mx-auto bg-white px-4 sm:px-6 lg:px-8">
      {/* Headings */}
      <div className="text-left mb-8 md:mb-12">
        <h1 className="font-serif text-[#B59D56] text-base sm:text-lg italic mb-1">
          Net Spice's
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#3A1F04] tracking-wide">
          BEYOND TRADITION
        </h2>
      </div>

      <div className="px-14 sm:px-16">
        <div className="max-w-7xl bg-slate-200 mx-auto rounded-md py-4 sm:py-6 px-4 sm:px-6">
        {/* Top Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Large Image with Text */}
          {leftMain && (
            <div className="relative rounded-md overflow-hidden">
              <img
                src={`http://localhost:5000${leftMain.image}`}
                alt={leftMain.title}
                className="w-full h-64 sm:h-80 md:h-[410px] object-cover"
              />
              <div className="absolute inset-0 flex items-start justify-start">
                <div className="relative p-4 sm:p-6 md:p-8 bg-white/70 backdrop-blur-[2px] w-[90%] sm:w-[85%] mt-4 sm:mt-6 md:mt-8 ml-4 sm:ml-6 md:ml-8 rounded-md">
                  <h3 className="text-base sm:text-lg font-bold text-[#1F4D3E] mb-2 sm:mb-3 uppercase">
                    {leftMain.title || "SEE HOW IT PROCESSED"}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-[#222]">
                    {leftMain.description ||
                      "Handpicked at dawn, only the finest Cinnamon are carefully plucked by skilled hands in Sri Lanka's lush highlands..."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Right Two Stacked Images */}
          <div className="grid grid-rows-2 gap-2">
            {topRight && (
              <img
                src={`http://localhost:5000${topRight.image}`}
                alt={topRight.title}
                className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-md"
              />
            )}
            {midRight && (
              <img
                src={`http://localhost:5000${midRight.image}`}
                alt={midRight.title}
                className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-md"
              />
            )}
          </div>
        </div>

        {/* Bottom Row (3 Images) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 sm:mt-4">
          {bottomRow.map((card, idx) => (
            <img
              key={idx}
              src={`http://localhost:5000${card.image}`}
              alt={card.title || "Beyond Tradition"}
              className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-md"
            />
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
