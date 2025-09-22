import React from "react";

function ProductCard({ product }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
      <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{product.name}</h3>
        <p className="text-gray-600">{product.price}</p>
      </div>
    </div>
  );
}

export default ProductCard;
