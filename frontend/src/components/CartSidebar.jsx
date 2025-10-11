import React, { useState } from "react";
import { FaTimes, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartSidebar({ open: parentOpen, setOpen: parentSetOpen }) {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const [localOpen, setLocalOpen] = useState(false);
  const open = parentOpen !== undefined ? parentOpen : localOpen;
  const setOpen = parentSetOpen !== undefined ? parentSetOpen : setLocalOpen;
  const [animateBadge, setAnimateBadge] = useState({});

  const parseWeight = (weight) => {
    if (!weight) return 1;
    if (typeof weight === "number") return weight;
    const w = weight.toString().toLowerCase();
    if (w.endsWith("kg")) return parseFloat(w);
    if (w.endsWith("g")) return parseFloat(w) / 1000;
    return 1;
  };

  const calculateTotal = () =>
    cartItems.reduce(
      (sum, item) => sum + item.price * parseWeight(item.weight) * item.quantity,
      0
    );

  const handleQuantityChange = (id, delta) => {
    const item = cartItems.find(i => i.id === id);
    if (!item) return;
    const newQuantity = item.quantity + delta;
    if (newQuantity <= 0) removeFromCart(id);
    else {
      updateQuantity(id, newQuantity);
      setAnimateBadge(prev => ({ ...prev, [id]: true }));
      setTimeout(() => setAnimateBadge(prev => ({ ...prev, [id]: false })), 300);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-yellow-900 text-white p-4 rounded-full shadow-lg z-50 hover:bg-yellow-800 flex items-center justify-center"
      >
        <FaShoppingCart className="w-6 h-6" />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
            {cartItems.length}
          </span>
        )}
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity"
          onClick={() => setOpen(false)}
        ></div>
      )}

      <div className={`fixed top-0 right-0 w-96 bg-yellow-50 h-full z-50 transform ${open ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 shadow-2xl flex flex-col`}>
        <div className="flex justify-between items-center p-6 border-b border-yellow-200">
          <h2 className="text-2xl font-bold text-yellow-900">Your Cart</h2>
          <button onClick={() => setOpen(false)}>
            <FaTimes size={22} className="text-yellow-900 hover:text-yellow-700" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 && <p className="text-yellow-800 text-center mt-10">Your cart is empty.</p>}

          {cartItems.map(item => (
            <div key={item.id} className="flex gap-4 items-center p-3 bg-white rounded-xl shadow hover:shadow-lg transition-transform hover:-translate-y-1">
              {item.image && <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />}
              <div className="flex-1">
                <h3 className="text-yellow-900 font-semibold">{item.name}</h3>
                <p className="text-yellow-800 text-sm">
                  {item.quantity} × LKR {(item.price * parseWeight(item.weight)).toLocaleString()} ({parseWeight(item.weight)} kg)
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <button className="px-2 py-1 bg-yellow-900 text-white rounded hover:bg-yellow-800 transition"
                    onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                  <span className={`px-3 py-1 border rounded ${animateBadge[item.id] ? "scale-125 animate-bounce" : ""}`}>{item.quantity}</span>
                  <button className="px-2 py-1 bg-yellow-900 text-white rounded hover:bg-yellow-800 transition"
                    onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-yellow-900 font-bold">LKR {(item.price * parseWeight(item.weight) * item.quantity).toLocaleString()}</span>
                <button className="text-red-600 font-semibold hover:text-red-800" onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 border-t border-yellow-200 flex flex-col gap-3">
            <p className="text-yellow-900 font-bold text-lg">Total: LKR {calculateTotal().toLocaleString()}</p>
            <button className="w-full bg-yellow-900 text-white p-3 rounded font-semibold hover:bg-yellow-800 transition" onClick={() => navigate("/order-confirmation")}>
              Checkout
            </button>
            <button className="w-full text-red-600 font-semibold hover:text-red-800 mt-2" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
