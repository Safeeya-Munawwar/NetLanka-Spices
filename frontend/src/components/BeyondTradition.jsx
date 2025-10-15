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

  // Flatten all images into individual cards, ensuring first image is first
  const allCards = entries.flatMap(entry =>
    entry.images.map((img, index) => ({
      title: entry.title || "",
      subtitle: entry.subtitle || "",
      description: entry.description || "",
      image: img,
      isFirst: index === 0,
    }))
  );

  // Optional: sort so that first images appear first (just in case)
  allCards.sort((a, b) => (a.isFirst === b.isFirst ? 0 : a.isFirst ? -1 : 1));

  return (
    <section className="bg-[#F9F5EE] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h1 className="font-serif text-[#B59D56] text-lg sm:text-xl italic mb-1">
          Net Spice's
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#3A1F04] mb-10 sm:mb-16 tracking-wide">
          BEYOND TRADITION
        </h2>

        {/* Single Grid for all image cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {allCards.map((card, idx) => (
            <div
              key={idx}
              className="relative h-64 rounded-xl overflow-hidden shadow-lg border border-[#D9C8A2] hover:scale-105 transition-transform duration-300"
            >
              {/* Image */}
              <img
                src={`http://localhost:5000${card.image}`}
                alt={card.title || "Beyond Tradition"}
                className="w-full h-full object-cover"
              />

              {/* Elegant Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
                {card.title && (
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-white mb-1 uppercase">
                    {card.title}
                  </h3>
                )}
                {card.subtitle && (
                  <p className="text-sm sm:text-base italic text-[#FFD580] mb-1">
                    {card.subtitle}
                  </p>
                )}
                {card.description && (
                  <p className="text-xs sm:text-sm md:text-base text-white line-clamp-3">
                    {card.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
