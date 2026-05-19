import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axiosInstance from "../axiosConfig";

export default function SearchResults() {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("query") || "";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) return;

    const fetchResults = async () => {
      try {
        setLoading(true);

        const res = await axiosInstance.get(
          `/search?query=${encodeURIComponent(query)}`
        );

        setProducts(res.data.products || []);
        setCategories(res.data.categories || []);
      } catch (err) {
        console.error("Search fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto p-6 text-[#4A2F1D]">
      <h1 className="text-2xl font-bold mb-6">
        Search results for “{query}”
      </h1>

      {/* Loading */}
      {loading && (
        <div className="text-center text-lg text-gray-600">
          Loading...
        </div>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Categories</h2>

          <div className="flex flex-wrap gap-3">
            {categories.map((c) => (
              <Link
                key={c.id || c.name}
                to={`/categories/${encodeURIComponent(c.slug || c.name)}`}
                className="px-4 py-2 bg-yellow-100 hover:bg-yellow-200 rounded-md shadow-sm font-medium transition"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Products */}
      {products.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-3">Products</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((p) => (
              <Link
                key={p.id}
                to={`/products/${p.id}`}
                className="border rounded-xl overflow-hidden bg-white shadow hover:shadow-lg transition-transform hover:-translate-y-1"
              >
                <img
                  src={p.image || "/placeholder.jpg"}
                  alt={p.name}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">
                  <div className="font-semibold text-lg mb-1">
                    {p.name}
                  </div>

                  {p.category?.name && (
                    <div className="text-sm text-gray-600">
                      {p.category.name}
                    </div>
                  )}

                  {p.price && (
                    <div className="text-yellow-700 font-semibold mt-1">
                      Rs. {p.price}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {!loading &&
        categories.length === 0 &&
        products.length === 0 && (
          <p className="mt-8 text-gray-500 text-center">
            No results found for “{query}”.
          </p>
        )}
    </div>
  );
}