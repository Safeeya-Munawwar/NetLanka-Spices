import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

export default function CartSidebar() {
  const { cartItems, removeFromCart, totalPrice, clearCart } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Cart Button with Pulse Animation */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-yellow-900 text-white p-4 rounded-full shadow-lg z-50 hover:bg-yellow-800 transition flex items-center justify-center cart-pulse"
      >
        <FaShoppingCart className="w-6 h-6" />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {cartItems.length}
          </span>
        )}
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 w-80 bg-yellow-50 h-full z-50 transform ${
          open ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 shadow-lg p-6 flex flex-col`}
      >
        <h2 className="text-2xl font-bold text-yellow-900 mb-4">Your Cart</h2>
        <div className="flex-grow overflow-y-auto">
          {cartItems.length === 0 ? (
            <p className="text-yellow-800">Cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-yellow-900 font-semibold">{item.name}</h3>
                  <p className="text-yellow-800">
                    {item.price} x {item.quantity}
                  </p>
                </div>
                <button
                  className="text-red-600 font-bold"
                  onClick={() => removeFromCart(item.id)}
                >
                  X
                </button>
              </div>
            ))
          )}
        </div>
        {cartItems.length > 0 && (
          <>
            <p className="text-yellow-900 font-bold mb-4">Total: LKR {totalPrice}</p>
            <button
              className="bg-yellow-900 text-white px-4 py-2 rounded hover:bg-yellow-800 transition mb-2"
              onClick={() => alert("Proceed to checkout")}
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
