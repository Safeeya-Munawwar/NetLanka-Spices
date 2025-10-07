import React from "react";
import { Link } from "react-router-dom";
import { FaInfoCircle, FaCartPlus } from "react-icons/fa";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div
      className="relative bg-white border-2 border-yellow-900 rounded-2xl shadow-md 
      transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl 
      cursor-pointer flex flex-col h-full overflow-hidden"
    >
      {/* Product Image with Gradient Overlay */}
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src={product.image || "/images/placeholder.png"}
          alt={product.title}
          className="w-full h-48 object-contain bg-white transform transition duration-500"
        />
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-yellow-900/60 via-transparent to-transparent 
          opacity-0 hover:opacity-100 transition-opacity duration-500"
        />
        {/* Circular Icon Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <Link
            to={`/products/${product.id}`}
            title="View Details"
            className="w-10 h-10 flex items-center justify-center rounded-full 
            bg-yellow-900 text-white shadow hover:bg-yellow-700 
            transition transform hover:scale-110"
          >
            <FaInfoCircle />
          </Link>
          <button
            onClick={() => addToCart(product)}
            title="Add to Cart"
            className="w-10 h-10 flex items-center justify-center rounded-full 
            bg-yellow-700 text-white shadow hover:bg-yellow-600 
            transition transform hover:scale-110"
          >
            <FaCartPlus />
          </button>
        </div>
      </div>
      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow text-center z-10">
        <h3 className="text-lg font-bold text-yellow-900">{product.title}</h3>
        <p className="text-yellow-800 mt-2 font-semibold">
          LKR {product.price.toLocaleString()}/kg
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
