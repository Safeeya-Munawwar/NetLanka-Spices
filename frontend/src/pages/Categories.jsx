import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section
        className="w-full h-[400px] sm:h-[500px] md:h-[600px] bg-center bg-cover bg-no-repeat bg-fixed flex flex-col justify-center items-center"
        style={{ backgroundImage: "url('/images/9.PNG')" }}
      >
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold">
          SHOP BY CATEGORY
        </h1>
        <p className="text-white mt-2 sm:mt-4 text-sm sm:text-base md:text-lg font-extralight">
          Explore our finest herbs, spices, teas, and coffee
        </p>
      </section>

      {/* Categories Grid */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <p className="text-center text-brown-700">Loading categories...</p>
          ) : categories.length === 0 ? (
            <p className="text-center text-brown-700">No categories found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex flex-col items-center justify-between p-8 rounded-2xl border-2 border-amber-900 shadow-md bg-white hover:-translate-y-1 hover:scale-105 hover:shadow-2xl transition-transform duration-500"
                >
                  <div className="flex flex-col items-center">
                    <div className="mb-4 text-brown-800">
                      <img
                        src={cat.image}
                        alt={cat.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-brown-900 mb-2">
                      {cat.title}
                    </h3>
                    <p className="text-brown-700 text-center mb-4">
                      {cat.description}
                    </p>
                  </div>

                  {/* View Products Button */}
                  <Link
                    to={`/categories/${cat.slug}`}
                    className="px-6 py-3 bg-yellow-900 text-white rounded-lg shadow-md hover:bg-yellow-800 hover:shadow-lg transition transform hover:scale-105"
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
