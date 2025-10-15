import React, { useState } from "react";
import { FaTimes, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartSidebar({ open: parentOpen, setOpen: parentSetOpen }) {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPriceLKR, totalPriceUSD } = useCart();
  const navigate = useNavigate();
  const [localOpen, setLocalOpen] = useState(false);
  const open = parentOpen !== undefined ? parentOpen : localOpen;
  const setOpen = parentSetOpen !== undefined ? parentSetOpen : setLocalOpen;
  const [animateBadge, setAnimateBadge] = useState({});

  const displayWeight = (kg) => {
    if (!kg) return "1 kg";
    if (kg < 1) return `${(kg * 1000).toLocaleString()} g`;
    return `${kg.toLocaleString()} kg`;
  };

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
      {/* Cart Button */}
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

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Cart Sidebar */}
      <div className={`fixed top-0 right-0 h-full z-50 bg-yellow-50 transform transition-transform duration-300 shadow-2xl flex flex-col
  ${open ? "translate-x-0" : "translate-x-full"} w-[28rem] md:w-[35rem]`}>
<div className="flex justify-between items-center p-6 border-b border-yellow-200">
          <h2 className="text-2xl font-bold text-yellow-900">Your Cart</h2>
          <button onClick={() => setOpen(false)}>
            <FaTimes size={22} className="text-yellow-900 hover:text-yellow-700" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <p className="text-yellow-800 text-center mt-10">Your cart is empty.</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-yellow-300">
                  <th className="pb-2">Product</th>
                  <th className="pb-2">Weight</th>
                  <th className="pb-2">Qty</th>
                  <th className="pb-2">Price</th>
                  <th className="pb-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id} className="bg-white rounded-xl shadow mb-2">
                    <td className="py-2 flex items-center gap-2">
                      {item.image && <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />}
                      <span className="text-yellow-900 font-semibold">{item.name}</span>
                    </td>
                    <td>{displayWeight(item.weight)}</td>
                    <td className="flex items-center gap-1">
                      <button
                        className="px-2 py-1 bg-yellow-900 text-white rounded hover:bg-yellow-800"
                        onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                      <span className={`px-2 py-1 border rounded ${animateBadge[item.id] ? "scale-125 animate-bounce" : ""}`}>{item.quantity}</span>
                      <button
                        className="px-2 py-1 bg-yellow-900 text-white rounded hover:bg-yellow-800"
                        onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                    </td>
                    <td>
                      LKR {(item.priceLKR * item.weight * item.quantity).toLocaleString()} /<br/>
                      $ {(item.priceUSD * item.weight * item.quantity).toFixed(2)}
                    </td>
                    <td>
                      <button className="text-red-600 font-semibold hover:text-red-800" onClick={() => removeFromCart(item.id)}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 border-t border-yellow-200 flex flex-col gap-3">
            <p className="text-yellow-900 font-bold text-lg">
              Total: LKR {totalPriceLKR.toLocaleString()} / $ {totalPriceUSD.toFixed(2)}
            </p>
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
