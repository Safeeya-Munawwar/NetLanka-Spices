import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaInfoCircle, FaCartPlus } from "react-icons/fa";

const products = [
  { id: 1, name: "Cinnamon", price: "LKR 1200/kg", image: "/images/cinnamon.PNG" },
  { id: 2, name: "Cloves", price: "LKR 3800/kg", image: "/images/cloves.PNG" },
  { id: 3, name: "Betel Nuts", price: "LKR 800/kg", image: "/images/betel-nuts.PNG" },
  { id: 4, name: "Pepper", price: "LKR 900/kg", image: "/images/pepper.PNG" },
  { id: 5, name: "Green Pepper", price: "LKR 1000/kg", image: "/images/green-pepper.PNG" },
  { id: 6, name: "Nutmeg", price: "LKR 1500/kg", image: "/images/nutmeg.PNG" },
  { id: 7, name: "Mace", price: "LKR 1800/kg", image: "/images/mace.PNG" },
  { id: 8, name: "Belimal Tea", price: "LKR 2500/kg", image: "/images/belimal.jpg" },
  { id: 9, name: "Moringa Tea", price: "LKR 3000/kg", image: "/images/moringa.jpg" },
  { id: 10, name: "Green Tea", price: "LKR 2000/kg", image: "/images/moringa.jpg" },
  { id: 11, name: "Coffee Beans", price: "LKR 1500/kg", image: "/images/green-pepper.PNG" },
];

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div
      className="relative bg-yellow-100 rounded-xl shadow-md overflow-hidden 
      group hover:shadow-2xl transition-transform duration-300 transform 
      hover:-translate-y-2 hover:scale-105 cursor-pointer"
    >
      {/* Image with zoom effect */}
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

      {/* Hover overlay actions */}
      <div
        className="absolute inset-0 bg-black bg-opacity-0 
        group-hover:bg-opacity-50 flex flex-col items-center justify-center 
        gap-3 opacity-0 group-hover:opacity-100 transition duration-500"
      >
        <Link
          to={`/products/${product.id}`}
          className="flex items-center gap-2 px-5 py-2 bg-yellow-900 text-white 
          rounded-full shadow-md hover:bg-yellow-700 transition-transform transform hover:scale-105"
        >
          <FaInfoCircle /> View Details
        </Link>
        <button
          className="flex items-center gap-2 px-5 py-2 bg-yellow-700 text-white 
          rounded-full shadow-md hover:bg-yellow-600 transition-transform transform hover:scale-105"
          onClick={() => addToCart(product)}
        >
          <FaCartPlus /> Add to Cart
        </button>
      </div>
    </div>
  );
}

export default function Products() {
  return (
    <section className="bg-yellow-50 py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-10 text-center text-yellow-900">
          Our Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
