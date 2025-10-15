import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Skeleton card
  const SkeletonCard = () => (
    <div className="animate-pulse flex flex-col items-center justify-center p-6 rounded-xl border border-gray-200 shadow-sm bg-gray-50">
      <div className="w-40 h-40 bg-gray-200 rounded-lg mb-6"></div>
      <div className="w-32 h-5 bg-gray-200 rounded mb-3"></div>
      <div className="w-40 h-3 bg-gray-200 rounded"></div>
    </div>
  );

  return (
    <div>
      {/* Hero Section */}
      <section
        className="w-full h-[400px] sm:h-[500px] md:h-[600px] bg-center bg-cover bg-no-repeat bg-fixed flex flex-col justify-center items-center"
        style={{ backgroundImage: "url('/images/9.PNG')" }}
      >
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold drop-shadow-lg">
          SHOP BY CATEGORY
        </h1>
        <p className="text-white mt-3 sm:mt-5 text-base sm:text-lg md:text-xl font-light drop-shadow-md">
          Explore our finest herbs, spices, teas, and coffee
        </p>
      </section>

      {/* Categories Grid */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
              {Array(8)
                .fill()
                .map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
            </div>
          ) : categories.length === 0 ? (
            <p className="text-center text-gray-700">No categories found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="group bg-white border border-yellow-900 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center p-6"
                >
                  {/* Category Image */}
                  <div className="relative mb-6">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      loading="lazy"
                      className="w-40 h-40 object-cover rounded-xl mx-auto group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                    {cat.description}
                  </p>

                  {/* View Products Button */}
                  <Link
                    to={`/categories/${cat.slug}`}
                    className="w-full py-2.5 bg-yellow-900 text-white font-medium rounded-lg hover:bg-yellow-800 transition-colors duration-300"
                  >
                    View Products
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
