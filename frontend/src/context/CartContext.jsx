import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./UserContext";
import axiosInstance from "../../src/axiosConfig";

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

  // 1️⃣ Load cart from localStorage on init
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  // 2️⃣ Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // 3️⃣ Fetch cart from backend and merge with localStorage
  useEffect(() => {
    if (!user?.id) return; // skip if no user

    const fetchCart = async () => {
      try {
        const res = await axiosInstance.get(
          `/carts/${user.id}`
        );
        const backendItems =
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

        // Merge with localStorage items without overwriting duplicates
        const savedCart = JSON.parse(localStorage.getItem("cartItems") || "[]");
        const merged = [...backendItems];

        savedCart.forEach((item) => {
          if (!merged.find((i) => i.id === item.id)) {
            merged.push(item);
          }
        });

        setCartItems(merged);
        localStorage.setItem("cartItems", JSON.stringify(merged)); // update localStorage
      } catch (err) {
        console.error(
          "Failed to fetch cart:",
          err.response?.data || err.message
        );
      }
    };

    fetchCart();
  }, [user?.id]);

  // 4️⃣ Sync cart changes to backend
  useEffect(() => {
    if (!user?.id) return;

    const saveCart = async () => {
      try {
        await axiosInstance.post(`/carts/${user.id}`, {
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
        console.error(
          "Failed to save cart:",
          err.response?.data || err.message
        );
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
