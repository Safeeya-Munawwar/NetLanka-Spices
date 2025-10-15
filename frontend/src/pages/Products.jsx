import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import axios from "axios";

export default function Products() {
  const headingRef = useRef(null);
  const [headingVisible, setHeadingVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let res;
        if (query) {
          res = await axios.get(`http://localhost:5000/api/search?query=${query}`);
          setProducts(res.data.products || []);
        } else {
          res = await axios.get("http://localhost:5000/api/products");
          setProducts(res.data || []);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [query]);

  useEffect(() => {
    const observerOptions = { threshold: 0.3 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === headingRef.current) setHeadingVisible(entry.isIntersecting);
      });
    }, observerOptions);

    if (headingRef.current) observer.observe(headingRef.current);
    return () => observer.disconnect();
  }, []);

  const SkeletonCard = () => (
    <div className="animate-pulse bg-gray-100 h-64 rounded-lg shadow-sm"></div>
  );

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

      {/* Products Section */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div
            ref={headingRef}
            className={`text-center transition-opacity duration-700 ease-in-out ${
              headingVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <h2 className="text-yellow-800 font-semibold text-lg mb-2">
              Pure & Authentic
            </h2>
            <h1 className="text-3xl sm:text-4xl font-bold mb-12">
              OUR COLLECTION
            </h1>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {loading
  ? Array(8)
      .fill()
      .map((_, i) => <SkeletonCard key={i} />)
  : products.length > 0
  ? products.map((product) => (
      <ProductCard
        key={product.id}
        product={product} // pass raw product object
      />
    ))
  : (
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
