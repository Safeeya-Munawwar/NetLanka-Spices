import React, { useEffect, useRef, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";

export default function Products() {
  const headingRef = useRef(null);
  const gridRef = useRef(null);

  const [headingVisible, setHeadingVisible] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from backend
    axios
      .get("http://localhost:5000/api/products") // ✅ change if your backend is deployed
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  useEffect(() => {
    const observerOptions = { threshold: 0.3 };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === headingRef.current) {
          setHeadingVisible(entry.isIntersecting);
        }
        if (entry.target === gridRef.current) {
          setGridVisible(entry.isIntersecting);
        }
      });
    }, observerOptions);

    const headingEl = headingRef.current;
    const gridEl = gridRef.current;

    if (headingEl) observer.observe(headingEl);
    if (gridEl) observer.observe(gridEl);

    return () => {
      if (headingEl) observer.unobserve(headingEl);
      if (gridEl) observer.unobserve(gridEl);
    };
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section
        className="w-full h-[400px] sm:h-[500px] md:h-[600px] bg-center bg-cover bg-no-repeat bg-fixed flex flex-col justify-center items-center"
        style={{ backgroundImage: "url('/images/all1.jpg')" }}
      >
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold">
          OUR PRODUCTS
        </h1>
        <p className="text-white mt-2 sm:mt-4 text-sm sm:text-base md:text-lg font-extralight">
          Discover the finest spices & teas from Sri Lanka
        </p>
      </section>

      {/* Products Grid Section */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div
            ref={headingRef}
            className={`text-center transition-opacity duration-700 ease-in-out ${
              headingVisible ? "animate-slide-in-top" : "opacity-0"
            }`}
          >
            <h2 className="text-yellow-800 font-semibold text-lg mb-2">
              Pure & Authentic
            </h2>
            <h1 className="text-3xl sm:text-4xl font-bold mb-12">
              OUR COLLECTION
            </h1>
          </div>

          {/* Grid */}
          <div
            ref={gridRef}
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 transition-opacity duration-700 ease-in-out ${
              gridVisible ? "animate-fade-in" : "opacity-0"
            }`}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}

            {products.length === 0 && (
              <p className="text-center col-span-full text-gray-600">
                No products found.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
