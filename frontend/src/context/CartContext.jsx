import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./UserContext";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useUser();
  const [cartItems, setCartItems] = useState([]);

  // ✅ Helper: parse weight safely
  const parseWeightToKg = (weight) => {
    if (!weight) return 1;
    if (typeof weight === "number") return weight;
    const w = weight.toString().toLowerCase().trim().replace(/\s/g, "");
    if (w.endsWith("g")) return parseFloat(w) / 1000;
    if (w.endsWith("kg")) return parseFloat(w);
    const num = parseFloat(w);
    return isNaN(num) ? 1 : num;
  };

  // ✅ Fetch cart items for logged-in user
  useEffect(() => {
    if (!user?.id) return setCartItems([]);
    const fetchCart = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/carts/${user.id}`);
        const items =
          res.data.items?.map((i) => ({
            id: `${i.productId}-${i.weight || 1}`,
            productId: i.productId,
            name: i.name,
            priceLKR: i.priceLKR || 0,
            priceUSD: i.priceUSD || 0,
            quantity: i.quantity || 1,
            weight: parseWeightToKg(i.weight),
            image: i.image || "",
          })) || [];
        setCartItems(items);
      } catch (err) {
        console.error("Failed to fetch cart:", err.response?.data || err.message);
      }
    };
    fetchCart();
  }, [user?.id]);

  // ✅ Sync cart changes to backend
  useEffect(() => {
    if (!user?.id) return;
    const saveCart = async () => {
      try {
        await axios.post(`http://localhost:5000/api/carts/${user.id}`, {
          items: cartItems.map((i) => ({
            productId: i.productId,
            name: i.name,
            priceLKR: i.priceLKR,
            priceUSD: i.priceUSD,
            quantity: i.quantity,
            weight: i.weight,
            image: i.image || "",
          })),
        });
      } catch (err) {
        console.error("Failed to save cart:", err.response?.data || err.message);
      }
    };
    saveCart();
  }, [cartItems, user?.id]);

  // ✅ Add product to cart
  const addToCart = (product) => {
    const weightKg = parseWeightToKg(product.weight);
    const id = `${product.id}-${weightKg}`;
    const existing = cartItems.find((i) => i.id === id);

    if (existing) {
      // Increase quantity by 1 (not multiplied)
      setCartItems(
        cartItems.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          id,
          productId: product.id,
          name: product.title || product.name,
          priceLKR: Number(product.priceLKR) || 0,
          priceUSD: Number(product.priceUSD) || 0,
          quantity: 1,
          weight: weightKg,
          image: product.image || "",
        },
      ]);
    }
  };

  // ✅ Update quantity directly
  const updateQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  // ✅ Remove / clear cart
  const removeFromCart = (id) =>
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  const clearCart = () => setCartItems([]);

  // ✅ Totals (LKR + USD)
  const totalPriceLKR = cartItems.reduce(
    (acc, i) => acc + i.priceLKR * i.weight * i.quantity,
    0
  );
  const totalPriceUSD = cartItems.reduce(
    (acc, i) => acc + i.priceUSD * i.weight * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalPriceLKR,
        totalPriceUSD,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
