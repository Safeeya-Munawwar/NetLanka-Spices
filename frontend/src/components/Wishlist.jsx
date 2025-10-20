import React, { useEffect } from "react";
import Layout from "../components/Layout"; // adjust path if needed
import ProductCard from "../components/ProductCard";
import { useWishlist } from "../context/WishlistContext";

export default function Wishlist() {
  const { wishlistItems, toggleWishlist } = useWishlist();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-yellow-900 mb-6 text-center">
          My Wishlist
        </h1>

        {wishlistItems.length === 0 ? (
          <p className="text-center text-yellow-800 text-lg">
            Your wishlist is empty 😔
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItems.map((item) => {
              if (!item.product) return null;

              return (
                <ProductCard
                  key={item.product.id}
                  product={item.product}
                  toggleWishlist={toggleWishlist} // heart toggle
                />
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}
