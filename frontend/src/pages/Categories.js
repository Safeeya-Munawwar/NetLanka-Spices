// src/pages/Categories.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaLeaf, FaSeedling, FaSpa, FaCoffee } from "react-icons/fa";

const categories = [
  { id: 1, name: "Herbs", icon: <FaLeaf size={40} />, link: "/herbs" },
  { id: 2, name: "Spices", icon: <FaSeedling size={40} />, link: "/spices" },
  { id: 3, name: "Teas", icon: <FaSpa size={40} />, link: "/teas" },
  { id: 4, name: "Coffee", icon: <FaCoffee size={40} />, link: "/coffee" },
];

export default function CategoriesPage() {
  const [visibleItems, setVisibleItems] = useState({});
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => ({
              ...prev,
              [entry.target.dataset.id]: true,
            }));
          }
        });
      },
      { threshold: 0.3 }
    );

    refs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      refs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section className="bg-gradient-to-b from-amber-50 via-yellow-50 to-stone-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center text-amber-900 drop-shadow-md">
          Shop by Category
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {categories.map((cat, index) => (
            <Link
              key={cat.id}
              to={cat.link}
              ref={(el) => (refs.current[index] = el)}
              data-id={cat.id}
              className={`flex flex-col items-center justify-center p-8 rounded-2xl shadow-md transition duration-700 transform bg-white hover:scale-105 hover:shadow-2xl hover:ring-4 hover:ring-amber-400 hover:ring-opacity-50
                ${
                  visibleItems[cat.id]
                    ? `${
                        index % 2 === 0
                          ? "opacity-100 translate-x-0"
                          : "opacity-100 -translate-x-0"
                      } animate-bounceIn`
                    : index % 2 === 0
                    ? "opacity-0 -translate-x-10"
                    : "opacity-0 translate-x-10"
                }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="mb-4 text-amber-800 group-hover:rotate-6 transition-transform duration-500">
                {cat.icon}
              </div>
              <h3 className="text-2xl font-bold text-amber-900 transition-colors duration-300">
                {cat.name}
              </h3>
              <p className="text-amber-700 mt-2 text-center transition-colors duration-300">
                Explore our finest {cat.name.toLowerCase()}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
