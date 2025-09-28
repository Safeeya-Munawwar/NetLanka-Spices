import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch all products from backend
        const res = await axios.get("http://localhost:5000/api/products");
        const allProducts = res.data;

        // Shuffle array randomly
        const shuffled = allProducts.sort(() => 0.5 - Math.random());

        // Take only first 4
        const featured = shuffled.slice(0, 4);

        setProducts(featured);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div>
          <h1 className="font-serif text-yellow-800 mt-10 mb-3 text-left text-xl">
            Net Spice's
          </h1>
          <h1 className="text-2xl md:text-3xl font-bold text-green-800 mt-3 mb-2 text-left">
            FEATURED PRODUCTS
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7">
          {products.map((p) => (
            <article key={p.id} className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-sm overflow-hidden">
              <div className="relative bg-gray-100 h-72 flex items-center justify-center">
                <img
                  src={p.image || "/images/default.jpg"}
                  alt={p.title}
                  className="object-contain max-h-56 p-8"
                />
                <div className="absolute top-6 right-6 flex flex-col gap-3">
                  {/* Quick view / Add to cart buttons can go here */}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                  <span className="w-6 h-px bg-gray-300 block"></span>
                  <span>{p.category?.title}</span>
                </div>

                <h3 className="text-lg font-medium text-gray-800 mb-3">{p.title}</h3>
                <p className="text-xl font-extrabold text-gray-800">Rs.{p.price}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
