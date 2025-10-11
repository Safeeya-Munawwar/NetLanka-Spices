import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./UserContext";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useUser();
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart from backend on user login
  useEffect(() => {
    if (!user?.id) {
      setCartItems([]);
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/carts/${user.id}`);
        const items = res.data.items?.map(i => ({
          id: i.productId + "-" + (i.weight || "1"), // unique id per weight
          productId: i.productId,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          weight: i.weight || 1,
          image: i.image,
        })) || [];
        setCartItems(items);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    };

    fetchCart();
  }, [user?.id]);

  // Sync cart to backend whenever it changes
  useEffect(() => {
    if (!user?.id) return;
    const saveCart = async () => {
      try {
        await axios.post(`http://localhost:5000/api/carts/${user.id}`, {
          items: cartItems.map(({ productId, name, price, quantity, weight, image }) => ({
            productId, name, price, quantity, weight, image,
          })),
        });
      } catch (err) {
        console.error("Failed to update cart:", err);
      }
    };
    saveCart();
  }, [cartItems, user?.id]);

  // Add product to cart
  const addToCart = (product) => {
    setCartItems(prev => {
      const weightKg = product.weightUnit === "g" ? product.weight / 1000 : product.weight;
      const id = product.id + "-" + weightKg; // unique per weight
  
      const exist = prev.find(item => item.id === id);
  
      if (exist) {
        return prev.map(item =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [
          ...prev,
          {
            id,
            productId: product.id,
            name: product.title,
            price: product.price,
            quantity: 1, // ✅ Always start with 1
            weight: weightKg,
            image: product.image,
          }
        ];
      }
    });
  };
  

  // Remove item by unique id
  const removeFromCart = (id) =>
    setCartItems(prev => prev.filter(item => item.id !== id));

  // Update quantity for a product by unique id
  const updateQuantity = (id, quantity) =>
    setCartItems(prev =>
      prev.map(item => item.id === id ? { ...item, quantity } : item)
    );

  // Clear cart
  const clearCart = () => setCartItems([]);

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity * (item.weight || 1),
    0
  );

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
