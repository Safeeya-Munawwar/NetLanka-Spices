import React from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-yellow-900 mb-4">
          Product Not Found
        </h2>
        <Link
          to="/categories"
          className="inline-block px-6 py-3 bg-yellow-900 text-white rounded-lg hover:bg-yellow-800 transition transform hover:scale-105"
        >
          Back to Categories
        </Link>
      </div>
    );
  }

  return (
    <section className="bg-yellow-50 py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
          {/* Product Image */}
          <div className="md:w-1/2 w-full overflow-hidden rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="md:w-1/2 w-full">
            <h1 className="text-4xl font-bold text-yellow-900 mb-4">
              {product.name}
            </h1>
            <p className="text-yellow-800 text-2xl font-semibold mb-4">
              {product.price}
            </p>
            <p className="text-yellow-700 mb-6 text-justify leading-relaxed">
              {product.description ||
                "This is a premium product carefully selected for quality and freshness."}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                className="px-6 py-3 bg-yellow-900 text-white rounded-lg shadow-md hover:bg-yellow-800 hover:shadow-lg transition transform hover:scale-105"
                onClick={() => alert(`${product.name} added to cart!`)}
              >
                Add to Cart
              </button>

              <Link
                to={`/${product.category}`}
                className="px-6 py-3 bg-yellow-700 text-white rounded-lg shadow-md hover:bg-yellow-600 hover:shadow-lg transition transform hover:scale-105"
              >
                Back to {product.category?.charAt(0).toUpperCase() + product.category?.slice(1)}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
