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
<section className="bg-yellow-50 py-12">
  <div className="container mx-auto px-6">
    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
      {/* Product Image */}
      <div className="md:w-1/2 w-full rounded-2xl shadow-lg overflow-hidden">
        <img
          src={product.image || "/images/default.jpg"}
          alt={product.title}
          className="w-full h-auto object-contain transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Product Details */}
      <div className="md:w-1/2 w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-yellow-900 mb-3">
          {product.title}
        </h1>
        <p className="text-2xl md:text-3xl font-semibold text-yellow-800 mb-4">
          ${product.price}
        </p>
        <p className="text-yellow-700 mb-6 leading-relaxed text-justify">
          {product.description || "A premium product carefully selected for quality and freshness."}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => addToCart(product)}
            className="px-5 py-2 md:px-6 md:py-3 bg-yellow-900 text-white rounded-lg md:rounded-xl shadow-md 
            hover:bg-yellow-800 hover:shadow-lg transition transform hover:scale-105"
          >
            Add to Cart
          </button>

          <Link
            to={`/categories/${product.category?.slug}`}
            className="px-5 py-2 md:px-6 md:py-3 bg-yellow-700 text-white rounded-lg md:rounded-xl shadow-md 
            hover:bg-yellow-600 hover:shadow-lg transition transform hover:scale-105"
          >
            Back to {product.category?.title}
          </Link>
        </div>
      </div>
    </div>

    {/* Related Products */}
    {relatedProducts.length > 0 && (
      <div className="mt-16">
        <h2 className="text-2xl md:text-3xl font-bold text-yellow-900 mb-6 text-center">
          Related Products
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
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