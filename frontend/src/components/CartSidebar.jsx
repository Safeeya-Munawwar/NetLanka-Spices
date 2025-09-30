import React, { useState } from "react";
import { FaTimes, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartSidebar({ open: parentOpen, setOpen: parentSetOpen }) {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [localOpen, setLocalOpen] = useState(false);
  const open = parentOpen !== undefined ? parentOpen : localOpen;
  const setOpen = parentSetOpen !== undefined ? parentSetOpen : setLocalOpen;

  const handleQuantityChange = (productId, delta) => {
    const item = cartItems.find(i => i.productId === productId);
    if (!item) return;
    const newQuantity = item.quantity + delta;
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  return (
    <>
      {/* Cart Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-yellow-900 text-white p-4 rounded-full shadow-lg z-50 hover:bg-yellow-800 flex items-center justify-center"
      >
        <FaShoppingCart className="w-6 h-6" />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {cartItems.length}
          </span>
        )}
      </button>

      {/* Overlay */}
      {open && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setOpen(false)}></div>}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 w-80 bg-yellow-50 h-full z-50 transform ${
          open ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 shadow-lg p-6 flex flex-col`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-yellow-900">Your Cart</h2>
          <button onClick={() => setOpen(false)}>
            <FaTimes size={20} className="text-yellow-900" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto">
          {cartItems.length === 0 && <p className="text-yellow-800">Cart is empty.</p>}
          {cartItems.map(item => (
            <div key={item.productId} className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {item.image && (
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-contain rounded border" />
                )}
                <div>
                  <h3 className="text-yellow-900 font-semibold">{item.name}</h3>
                  <p className="text-yellow-800">LKR {item.price} x {item.quantity}</p>
                  <div className="flex gap-2 mt-1">
                    <button
                      className="px-2 py-1 bg-yellow-900 text-white rounded"
                      onClick={() => handleQuantityChange(item.productId, -1)}
                    >
                      -
                    </button>
                    <button
                      className="px-2 py-1 bg-yellow-900 text-white rounded"
                      onClick={() => handleQuantityChange(item.productId, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button className="text-red-600 font-bold" onClick={() => removeFromCart(item.productId)}>X</button>
            </div>
          ))}
        </div>

        {cartItems.length > 0 && (
          <>
            <p className="text-yellow-900 font-bold mb-4">Total: LKR {totalPrice}</p>
            <button
              className="bg-yellow-900 text-white px-4 py-2 rounded hover:bg-yellow-800 transition mb-2"
              onClick={() => navigate("/order-confirmation")}
            >
              Checkout
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </>
        )}
      </div>
    </>
  );
}
