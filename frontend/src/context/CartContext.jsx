import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./UserContext";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useUser();
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart when user logs in
  useEffect(() => {
    if (user?.id) {
      axios.get(`http://localhost:5000/api/carts/${user.id}`)
        .then(res => {
          // Map items to have productId, name, price, quantity, image
          const items = res.data.items?.map(i => ({
            productId: i.productId,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
            image: i.image
          })) || [];
          setCartItems(items);
        })
        .catch(err => console.error("Failed to fetch cart:", err));
    } else {
      setCartItems([]);
    }
  }, [user?.id]);

  // Sync cart to backend whenever cartItems change
  useEffect(() => {
    if (user?.id) {
      axios.post(`http://localhost:5000/api/carts/${user.id}`, { items: cartItems })
        .catch(err => console.error("Failed to update cart:", err));
    }
  }, [cartItems, user?.id]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const exist = prev.find(item => item.productId === product.id);
      if (exist) {
        return prev.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, {
          productId: product.id,
          name: product.title,
          price: product.price,
          quantity: 1,
          image: product.image
        }];
      }
    });
  };

  const removeFromCart = (productId) =>
    setCartItems(prev => prev.filter(item => item.productId !== productId));

  const updateQuantity = (productId, quantity) =>
    setCartItems(prev => prev.map(item =>
      item.productId === productId ? { ...item, quantity } : item
    ));

  const clearCart = () => setCartItems([]);

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
