import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLeaf, FaSeedling, FaSpa, FaCoffee } from "react-icons/fa";

const categories = [
  {
    name: "Herbs",
    icon: <FaLeaf size={40} />,
    color: "bg-green-100",
    hoverColor: "hover:bg-green-200",
  },
  {
    name: "Spices",
    icon: <FaSeedling size={40} />,
    color: "bg-yellow-100",
    hoverColor: "hover:bg-yellow-200",
  },
  {
    name: "Teas",
    icon: <FaSpa size={40} />,
    color: "bg-orange-100",
    hoverColor: "hover:bg-orange-200",
  },
  {
    name: "Coffee",
    icon: <FaCoffee size={40} />,
    color: "bg-red-100",
    hoverColor: "hover:bg-red-200",
  },
];

export default function Category() {
  const navigate = useNavigate();

  const handleCategoryClick = (catName) => {
    navigate(`/categories/${catName.toLowerCase()}`);
  };

  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h1 className="font-serif text-yellow-800 mb-2 text-left text-xl">
          Net Spice's
        </h1>
        <h1 className="text-2xl md:text-3xl font-bold text-green-800 mb-6 text-left">
          FEATURED CATEGORIES
        </h1>
        <div className="flex items-center justify-start mb-10 gap-4">
          <div className="w-20 h-px bg-gray-200"></div>
          <div className="w-10 h-8 flex items-center justify-center">
            <svg
              width="40"
              height="24"
              viewBox="0 0 40 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 12C8 6 14 6 20 12C26 18 32 18 38 12"
                stroke="#9FCB70"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="w-20 h-px bg-gray-200"></div>
        </div>
        {/* Categories grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => handleCategoryClick(cat.name)}
              className={`cursor-pointer group flex flex-col justify-between h-48 p-6 rounded-lg shadow transition duration-300 ${cat.color} ${cat.hoverColor} hover:shadow-lg`}
            >
              <div className="flex items-center gap-4">
                <div className="text-yellow-900">{cat.icon}</div>
                <div>
                  <h3 className="text-2xl font-bold text-yellow-900 group-hover:text-green-800 transition">
                    {cat.name}
                  </h3>
                  <p className="text-yellow-800 mt-1 text-sm group-hover:text-green-700 transition">
                    Explore our finest {cat.name.toLowerCase()}
                  </p>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-600 text-white hover:bg-green-700 transition">
                  ➔
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* See More button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate("/categories")}
            className="px-6 py-2 border-2 border-green-800 text-green-800 font-semibold rounded-md hover:bg-green-800 hover:text-white transition"
          >
            See More
          </button>
        </div>
      </div>
    </section>
  );
}
