import React from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-yellow-900 mb-6">
          Product Not Found
        </h2>
        <Link
          to="/categories"
          className="inline-block px-6 py-3 bg-yellow-900 text-white rounded-xl 
          hover:bg-yellow-800 shadow-md hover:shadow-lg 
          transition transform hover:scale-105"
        >
          Back to Categories
        </Link>
      </div>
    );
  }

  // Related products (same category, excluding current one)
  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <section className="bg-yellow-50 py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
          {/* Product Image */}
          <div className="md:w-1/2 w-full relative overflow-hidden rounded-2xl shadow-lg group">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-contain transform transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/40 via-transparent to-transparent 
            opacity-0 group-hover:opacity-100 transition duration-500"></div>
          </div>

          {/* Product Details */}
          <div className="md:w-1/2 w-full">
            <h1 className="text-4xl font-bold text-yellow-900 mb-4">
              {product.name}
            </h1>
            <p className="text-2xl font-semibold text-yellow-800 mb-4">
              {product.price}
            </p>
            <p className="text-yellow-700 leading-relaxed mb-6 text-justify">
              {product.description ||
                "This is a premium product carefully selected for quality and freshness."}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => addToCart(product)}
                className="px-6 py-3 bg-yellow-900 text-white rounded-xl shadow-md 
                hover:bg-yellow-800 hover:shadow-lg transition transform hover:scale-105"
              >
                Add to Cart
              </button>

              <Link
                to={`/${product.category}`}
                className="px-6 py-3 bg-yellow-700 text-white rounded-xl shadow-md 
                hover:bg-yellow-600 hover:shadow-lg transition transform hover:scale-105"
              >
                Back to{" "}
                {product.category?.charAt(0).toUpperCase() +
                  product.category?.slice(1)}
              </Link>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-yellow-900 mb-8 text-center">
              Related Products
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.slice(0, 3).map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
