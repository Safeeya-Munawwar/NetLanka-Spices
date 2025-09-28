import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaInfoCircle, FaCartPlus, FaArrowLeft } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import axios from "axios";

// Product Card component
function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="relative bg-yellow-100 rounded-xl shadow-md overflow-hidden
      transition-transform duration-300 transform hover:-translate-y-1 hover:scale-105 cursor-pointer flex flex-col h-full border-2 border-[#5C4033]">
      <div className="relative overflow-hidden rounded-t-xl">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover transform hover:scale-110 transition duration-500"
        />
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <Link
            to={`/products/${product.id}`}
            title="View Details"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#5C4033] text-white shadow hover:bg-[#3D2B1F] transition transform hover:scale-110"
          >
            <FaInfoCircle />
          </Link>
          <button
            onClick={() => addToCart(product)}
            title="Add to Cart"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#3D2B1F] text-white shadow hover:bg-[#5C4033] transition transform hover:scale-110"
          >
            <FaCartPlus />
          </button>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-[#5C4033]">{product.title}</h3>
        <p className="text-[#3D2B1F] mt-2 font-semibold">{product.price}</p>
      </div>
    </div>
  );
}

// Hero images per category
const heroImages = {
  herbs: "/images/hrb.jpg",
  spices: "/images/spice.jpg",
  teas: "/images/teaaa.jpg",
  coffee: "/images/coffee.jpg",
};

export default function CategoryProducts() {
  const { category } = useParams(); // get category from URL
  const headingRef = useRef(null);
  const gridRef = useRef(null);
  const [headingVisible, setHeadingVisible] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // IntersectionObserver for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === headingRef.current) setHeadingVisible(entry.isIntersecting);
          if (entry.target === gridRef.current) setGridVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.3 }
    );

    const headingEl = headingRef.current;
    const gridEl = gridRef.current;

    if (headingEl) observer.observe(headingEl);
    if (gridEl) observer.observe(gridEl);

    return () => {
      if (headingEl) observer.unobserve(headingEl);
      if (gridEl) observer.unobserve(gridEl);
    };
  }, []);

  // Fetch filtered products using the new API
  useEffect(() => {
    if (!category) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/filtered-products", {
          params: { categoryId: categoryIdFromName(category) },
        });
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  // Map category names to their IDs (you can fetch this dynamically too)
  const categoryIdFromName = (name) => {
    const mapping = {
      herbs: 1,
      spices: 2,
      teas: 3,
      coffee: 4,
    };
    return mapping[name.toLowerCase()] || null;
  };

  const displayCategory = category?.charAt(0).toUpperCase() + category?.slice(1).toLowerCase();
  const heroImage = heroImages[category?.toLowerCase()] || "/images/cinbg.jpg";

  return (
    <div>
      {/* Hero Section */}
      <section
        className="w-full h-[400px] sm:h-[500px] md:h-[600px] bg-center bg-cover bg-no-repeat bg-fixed flex flex-col justify-center items-center"
        style={{ backgroundImage: `url('${heroImage}')` }}
      >
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold">
          {displayCategory?.toUpperCase()}
        </h1>
        <p className="text-white mt-2 sm:mt-4 text-sm sm:text-base md:text-lg font-extralight">
          Explore our finest {displayCategory?.toLowerCase()}
        </p>
      </section>

      {/* Breadcrumb and Products Grid */}
      <section className="bg-yellow-50 py-16">
        <div className="container mx-auto px-6">
          <div className="mb-8 flex items-center gap-2 text-[#5C4033]">
            <Link
              to="/categories"
              className="flex items-center gap-1 hover:text-[#3D2B1F] transition"
            >
              <FaArrowLeft /> Back to Categories
            </Link>
          </div>

          <div
            ref={headingRef}
            className={`text-center transition-opacity duration-700 ease-in-out ${
              headingVisible ? "opacity-100 animate-slide-in-top" : "opacity-0"
            }`}
          >
            <h2 className="text-yellow-800 font-semibold text-lg mb-2">
              Our Collection
            </h2>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#5C4033]">
              {displayCategory}
            </h1>
          </div>

          <div
            ref={gridRef}
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10 transition-opacity duration-700 ease-in-out ${
              gridVisible ? "opacity-100 animate-fade-in" : "opacity-0"
            }`}
          >
            {loading ? (
              <p className="text-center col-span-full text-[#3D2B1F]">Loading...</p>
            ) : products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <p className="text-[#3D2B1F] text-xl mb-6">
                  No products found in this category.
                </p>
                <Link
                  to="/categories"
                  className="inline-block px-6 py-3 bg-yellow-900 text-white rounded-xl 
                  hover:bg-yellow-800 shadow-md hover:shadow-lg transition transform hover:scale-105"
                >
                  Back to Categories
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
