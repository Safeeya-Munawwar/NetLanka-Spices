import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./UserContext";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useUser();
  const [cartItems, setCartItems] = useState([]);

  const parseWeightToKg = (weight) => {
    if (!weight) return 1;
    if (typeof weight === "number") return weight;
    const w = weight.toString().toLowerCase().trim().replace(/\s/g, "");
    if (w.endsWith("g")) return parseFloat(w) / 1000;
    if (w.endsWith("kg")) return parseFloat(w);
    return parseFloat(w) || 1;
  };

  // Fetch cart from backend
  useEffect(() => {
    if (!user?.id) return setCartItems([]);
    const fetchCart = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/carts/${user.id}`);
        const items = res.data.items?.map(i => ({
          id: i.productId + "-" + (i.weight || 1),
          productId: i.productId,
          name: i.name,
          priceLKR: i.priceLKR || 0,
          priceUSD: i.priceUSD || 0,
          quantity: i.quantity || 1,
          weight: parseWeightToKg(i.weight),
          image: i.image,
        })) || [];
        setCartItems(items);
      } catch (err) {
        console.error("Failed to fetch cart:", err.response?.data || err.message);
      }
    };
    fetchCart();
  }, [user?.id]);

  // Sync cart to backend
  useEffect(() => {
    if (!user?.id) return;
    const saveCart = async () => {
      try {
        await axios.post(`http://localhost:5000/api/carts/${user.id}`, { items: cartItems });
      } catch (err) {
        console.error("Failed to save cart:", err.response?.data || err.message);
      }
    };
    saveCart();
  }, [cartItems, user?.id]);

  const addToCart = (product) => {
    const weightKg = parseWeightToKg(product.weight);
    const id = product.id + "-" + weightKg;
    const existing = cartItems.find(i => i.id === id);
    if (existing) {
      setCartItems(cartItems.map(i => i.id === id ? { ...i, quantity: i.quantity + (product.quantity || 1) } : i));
    } else {
      setCartItems([...cartItems, { ...product, id, weight: weightKg, quantity: product.quantity || 1 }]);
    }
  };

  const updateQuantity = (id, quantity) => {
    setCartItems(cartItems.map(i => i.id === id ? { ...i, quantity } : i));
  };

  const removeFromCart = (id) => setCartItems(cartItems.filter(i => i.id !== id));
  const clearCart = () => setCartItems([]);

  const totalPriceLKR = cartItems.reduce((acc, i) => acc + (i.priceLKR || 0) * i.weight * i.quantity, 0);
  const totalPriceUSD = cartItems.reduce((acc, i) => acc + (i.priceUSD || 0) * i.weight * i.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart, totalPriceLKR, totalPriceUSD }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
