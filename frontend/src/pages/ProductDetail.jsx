import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import axios from "axios";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [weight, setWeight] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);

        const allRes = await axios.get("http://localhost:5000/api/products");
        const related = allRes.data.filter(
          (p) =>
            p.category?.id === res.data.category?.id && p.id !== res.data.id
        );
        setRelatedProducts(related.slice(0, 3));
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const itemToAdd = {
      ...product,
      quantity: Number(quantity),
      weight: weight || "1kg",
    };
    addToCart(itemToAdd);
  };

  const handleBulkOrder = () => {
    navigate(`/bulk-order/${product.id}`, { state: { product } });
  };

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
              {product.description ||
                "A premium product carefully selected for quality and freshness."}
            </p>

            {/* Quantity & Weight Selection */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div>
                <label className="block text-yellow-900 font-semibold mb-1">
                  Quantity:
                </label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="border border-yellow-300 rounded-lg px-3 py-2 w-24 focus:outline-none focus:ring-2 focus:ring-yellow-700"
                />
              </div>

              <div>
                <label className="block text-yellow-900 font-semibold mb-1">
                  Weight (kg):
                </label>
                <input
                  type="text"
                  placeholder="e.g. 1kg, 500g"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="border border-yellow-300 rounded-lg px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-yellow-700"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleAddToCart}
                className="px-5 py-2 md:px-6 md:py-3 bg-yellow-900 text-white rounded-lg md:rounded-xl shadow-md 
            hover:bg-yellow-800 hover:shadow-lg transition transform hover:scale-105"
              >
                Add to Cart
              </button>

              <button
                onClick={handleBulkOrder}
                className="px-5 py-2 md:px-6 md:py-3 bg-yellow-700 text-white rounded-lg md:rounded-xl shadow-md 
            hover:bg-yellow-600 hover:shadow-lg transition transform hover:scale-105"
              >
                Bulk Order Inquiry
              </button>

              <Link
                to={`/categories/${product.category?.slug}`}
                className="px-5 py-2 md:px-6 md:py-3 bg-yellow-600 text-white rounded-lg md:rounded-xl shadow-md 
            hover:bg-yellow-500 hover:shadow-lg transition transform hover:scale-105"
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
