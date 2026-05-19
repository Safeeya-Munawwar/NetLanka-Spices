import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../../src/axiosConfig";
import { useUser } from "./UserContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useUser();
  const [wishlistItems, setWishlistItems] = useState([]);

  // Fetch wishlist for logged-in user
  const fetchWishlist = async () => {
    try {
      if (!user) return;
      const res = await axiosInstance.get(`/wishlist/${user.id}`);
      setWishlistItems(res.data);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    }
  };

  // Add or remove wishlist item
  const toggleWishlist = async (product) => {
    if (!user) return alert("Login required!");
  
    const existingItem = wishlistItems.find(
      (item) => item.product.id === product.id
    );
  
    try {
      if (existingItem) {
        // Remove from wishlist using the correct Wishlist.id
        await axiosInstance.delete(`/wishlist/${existingItem.id}`);
        setWishlistItems((prev) =>
          prev.filter((item) => item.product.id !== product.id)
        );
      } else {
        // Add to wishlist
        const res = await axiosInstance.post(`/wishlist/`, {
          userId: user.id,
          productId: product.id,
        });
  
        setWishlistItems((prev) => [...prev, { product, id: res.data.id }]);
      }
    } catch (err) {
      console.error("Error toggling wishlist:", err);
    }
  };  

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
