import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import axios from "axios";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetch product by ID
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);

        // Fetch all products to find related ones
        const allRes = await axios.get("http://localhost:5000/api/products");
        const related = allRes.data.filter(
          (p) => p.category?.id === res.data.category?.id && p.id !== res.data.id
        );
        setRelatedProducts(related.slice(0, 3)); // max 3 related products
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-20 text-yellow-800 font-bold">
        Loading product...
      </div>
    );
  }

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

  return (
    <section className="bg-yellow-50 py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12 px-80">
          {/* Product Image */}
          <div className="md:w-1/2 w-full relative overflow-hidden rounded-2xl shadow-lg group">
            <img
              src={product.image || "/images/default.jpg"}
              alt={product.title}
              className="w-full h-auto object-contain transform transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/40 via-transparent to-transparent 
            opacity-0 group-hover:opacity-100 transition duration-500"></div>
          </div>

          {/* Product Details */}
          <div className="md:w-1/2 w-full">
            <h1 className="text-4xl font-bold text-yellow-900 mb-4">
              {product.title}
            </h1>
            <p className="text-2xl font-semibold text-yellow-800 mb-4">
              ${product.price}
            </p>
            <p className="text-yellow-700 leading-relaxed mb-6 text-justify">
              {product.description || "This is a premium product carefully selected for quality and freshness."}
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
                to={`/categories/${product.category?.title}`}
                className="px-6 py-3 bg-yellow-700 text-white rounded-xl shadow-md 
                hover:bg-yellow-600 hover:shadow-lg transition transform hover:scale-105"
              >
                Back to {product.category?.title}
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
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
