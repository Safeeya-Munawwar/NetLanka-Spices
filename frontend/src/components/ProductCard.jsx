import React from "react";
import { FaCartPlus, FaHeart, FaRegHeart, FaInfoCircle } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { wishlistItems, toggleWishlist } = useWishlist();

  const isInWishlist = wishlistItems.some(
    (item) => item.product.id === product.id
  );
  

  return (
    <div className="relative bg-yellow-100 rounded-xl shadow-md overflow-hidden transition-transform duration-300 transform hover:-translate-y-1 hover:scale-105 cursor-pointer flex flex-col h-full border-2 border-[#5C4033]">
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
          <button
            onClick={() => toggleWishlist(product)}
            title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            className={`w-10 h-10 flex items-center justify-center rounded-full shadow transition transform hover:scale-110 ${
              isInWishlist
                ? "bg-red-600 text-white hover:bg-red-500"
                : "bg-gray-200 text-red-600 hover:bg-gray-300"
            }`}
          >
            {isInWishlist ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-grow text-center z-10">
        <h3 className="text-lg font-bold text-yellow-900">{product.title}</h3>
        <p className="text-yellow-800 mt-2 font-semibold">
          Rs. {product.priceLKR?.toLocaleString()} / ${product.priceUSD?.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
