import React from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    title: "Cinnamon",
    image: "/11.jpg",
  },
  {
    title: "Paprika",
    image: "/14.jpg",
  },
  {
    title: "Black Pepper",
    image: "/13.jpg",
  },
  {
    title: "Turmeric",
    image: "/12.jpg",
  },
];

export default function Category() {
  return (
    <section className="w-full h-[800px] py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h1 className="font-serif text-yellow-800 mt-10 mb-3 text-left text-xl">
          Net Spice's
        </h1>
        <h1 className="text-2xl md:text-3xl font-bold text-green-800 mt-3 mb-2 text-left">
          FEATURED CATEGORIES
        </h1>
          <div className="flex items-center justify-start mb-10 gap-4">
            <div className="w-20 h-px bg-gray-200"></div>
            <div className="w-10 h-8 flex items-center justify-center">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 12C8 6 14 6 20 12C26 18 32 18 38 12" stroke="#9FCB70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="w-20 h-px bg-gray-200"></div>
          </div>
          

        {/* Categories grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="relative overflow-hidden shadow-md rounded-sm transform transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Image */}
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-96 object-cover"
              />

              {/* Name box overlay */}
              <div className="absolute bottom-0 left-0 w-full bg-white bg-opacity-80 flex justify-between items-center px-4 py-7">
                <p className="text-gray-600 font-semibold text-lg">
                  {cat.title}
                </p>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-600 text-white hover:bg-green-700 transition">
                  ➔
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* See More button */}
        <div className="flex justify-center mt-10">
          <Link to="/">
            <button className="px-6 py-2 border-2 border-green-800 text-green-800 font-semibold rounded-md hover:bg-green-800 hover:text-white transition">
              See More
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}