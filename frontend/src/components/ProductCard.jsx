import React from "react";
import { Link } from "react-router-dom";
import { FaInfoCircle, FaCartPlus } from "react-icons/fa";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const conversionRate = 0.0045;

  const formatPrice = (priceLKR, priceUSD) => {
    const lkr = parseFloat(priceLKR);
    const usd = parseFloat(priceUSD);
    const lkrText = !isNaN(lkr) ? `Rs. ${lkr.toLocaleString()}` : "Rs. —";
    const usdText = !isNaN(usd)
      ? `$${usd.toFixed(2)}`
      : !isNaN(lkr)
      ? `$${(lkr * conversionRate).toFixed(2)}`
      : "$—";
    return `${lkrText} / ${usdText}`;
  };

  return (
    <div
      className="relative bg-yellow-100 rounded-xl shadow-md overflow-hidden
      transition-transform duration-300 transform hover:-translate-y-1 hover:scale-105 cursor-pointer flex flex-col h-full border-2 border-[#5C4033]"
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-t-xl">
        <img
          src={product.image || "/images/placeholder.png"}
          alt={product.title}
          className="w-full h-48 object-cover transform hover:scale-110 transition duration-500"
        />
        {/* Icons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <Link
            to={`/products/${product.id}`}
            title="View Details"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-900 text-white shadow hover:bg-yellow-700 transition transform hover:scale-110"
          >
            <FaInfoCircle />
          </Link>
          <button
            onClick={() => addToCart(product)}
            title="Add to Cart"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-700 text-white shadow hover:bg-yellow-600 transition transform hover:scale-110"
          >
            <FaCartPlus />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-grow text-center z-10">
        <h3 className="text-lg font-bold text-yellow-900">{product.title}</h3>
        <p className="text-yellow-800 mt-2 font-semibold">
          {formatPrice(product.priceLKR, product.priceUSD)} per Kg
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
