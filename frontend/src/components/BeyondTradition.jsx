import React, { useEffect, useState } from "react";
import axiosInstance from "../../src/axiosConfig";

export default function BeyondTradition() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = async () => {
    try {
      const res = await axiosInstance.get("/beyondTradition");
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

  // Flatten all images with their corresponding titles/subtitles/descriptions
  const allCards = entries.flatMap((entry) =>
    entry.images.map((img, index) => ({
      title: entry.title || "",
      subtitle: entry.subtitle || "",
      description: entry.description || "",
      image: img,
      isFirst: index === 0,
    }))
  );

  // Sort so first image of first entry is main
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
                src={`${process.env.REACT_APP_API_URL.replace("/api", "")}${leftMain.image}`}
                  alt={leftMain.title}
                  className="w-full h-64 sm:h-80 md:h-[410px] object-cover"
                />
                <div className="absolute top-4 sm:top-6 md:top-8 left-4 sm:left-6 md:left-8 bg-black/60 p-4 sm:p-6 rounded-md max-w-[90%]">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-200 leading-snug">
                    {leftMain.title}
                  </h2>
                  {leftMain.subtitle && (
                    <h3 className="text-sm sm:text-base text-yellow-100 mt-1 leading-snug">
                      {leftMain.subtitle}
                    </h3>
                  )}
                  {leftMain.description && (
                    <h4 className="text-xs sm:text-sm text-white mt-1 leading-relaxed">
                      {leftMain.description}
                    </h4>
                  )}
                </div>
              </div>
            )}

            {/* Right Two Stacked Images */}
            <div className="grid grid-rows-2 gap-2">
              {[topRight, midRight].map((card, idx) =>
                card ? (
                  <div key={idx} className="relative rounded-md overflow-hidden">
                    <img
                     src={`${process.env.REACT_APP_API_URL.replace("/api", "")}${card.image}`}
                      alt={card.title}
                      className="w-full h-32 sm:h-40 md:h-48 object-cover"
                    />
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-black/60 p-2 rounded-md max-w-[90%]">
                      <h2 className="text-sm sm:text-base font-bold text-yellow-200 leading-snug">
                        {card.title}
                      </h2>
                      {card.subtitle && (
                        <h3 className="text-xs sm:text-sm text-yellow-100 leading-snug">
                          {card.subtitle}
                        </h3>
                      )}
                      {card.description && (
                        <h4 className="text-xs sm:text-xs text-white leading-relaxed">
                          {card.description}
                        </h4>
                      )}
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </div>

          {/* Bottom Row (3 Images) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 sm:mt-4">
            {bottomRow.map((card, idx) => (
              <div key={idx} className="relative rounded-md overflow-hidden">
                <img
               src={`${process.env.REACT_APP_API_URL.replace("/api", "")}${card.image}`}
                  alt={card.title || "Beyond Tradition"}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover"
                />
                <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-black/60 p-2 rounded-md max-w-[90%]">
                  <h2 className="text-sm sm:text-base font-bold text-yellow-200 leading-snug">
                    {card.title}
                  </h2>
                  {card.subtitle && (
                    <h3 className="text-xs sm:text-sm text-yellow-100 leading-snug">
                      {card.subtitle}
                    </h3>
                  )}
                  {card.description && (
                    <h4 className="text-xs sm:text-xs text-white leading-relaxed">
                      {card.description}
                    </h4>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
