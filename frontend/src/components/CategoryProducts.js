// src/components/CategoryProducts.js
import React from "react";
import { Link } from "react-router-dom";
import { FaInfoCircle, FaCartPlus, FaArrowLeft } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div
      className="relative bg-yellow-100 rounded-xl shadow-md overflow-hidden 
      group hover:shadow-2xl transition-transform duration-300 transform 
      hover:-translate-y-2 hover:scale-105 cursor-pointer"
    >
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover transform group-hover:scale-110 transition duration-500"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-yellow-900 group-hover:text-yellow-700 transition">
          {product.name}
        </h3>
        <p className="text-yellow-800 mt-2 font-semibold">{product.price}</p>
      </div>

      {/* Hover Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 
        flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 
        transition duration-500"
      >
        <Link
          to={`/products/${product.id}`}
          className="flex items-center gap-2 px-5 py-2 bg-yellow-900 text-white rounded-full shadow-md hover:bg-yellow-700 transition transform hover:scale-105"
        >
          <FaInfoCircle /> View Details
        </Link>
        <button
          className="flex items-center gap-2 px-5 py-2 bg-yellow-700 text-white rounded-full shadow-md hover:bg-yellow-600 transition transform hover:scale-105"
          onClick={() => addToCart(product)}
        >
          <FaCartPlus /> Add to Cart
        </button>
      </div>
    </div>
  );
}

export default function CategoryProducts({ category }) {
  if (!category) return null;

  const filteredProducts = products.filter(
    (p) => p.category?.toLowerCase() === category.toLowerCase()
  );

  const displayCategory =
    category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

  return (
    <section className="bg-yellow-50 py-16">
      <div className="container mx-auto px-6">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center gap-2 text-yellow-900">
          <Link
            to="/categories"
            className="flex items-center gap-1 hover:text-green-800 transition"
          >
            <FaArrowLeft /> Back to Categories
          </Link>
        </div>

        <h2 className="text-4xl font-bold mb-10 text-center text-yellow-900">
          {displayCategory}
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-center col-span-full text-yellow-800">
              No products found in this category.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
