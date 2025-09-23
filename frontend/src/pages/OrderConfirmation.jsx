import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { SiVisa, SiMastercard, SiPaypal } from "react-icons/si";
import { FaMoneyBillWave } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CheckoutPage() {
  const { cartItems, clearCart, totalPrice, removeFromCart, updateQuantity } =
    useCart();
  const [confirmed, setConfirmed] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const [animateBadge, setAnimateBadge] = useState({});

  const formatCardNumber = (value) =>
    value
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();

  const handleCardChange = (field, value) => {
    if (field === "cardNumber") value = formatCardNumber(value);
    setCardDetails({ ...cardDetails, [field]: value });
  };

  const handleConfirmOrder = () => {
    const newErrors = {};
    if (paymentMethod === "creditCard") {
      const cleanNumber = cardDetails.cardNumber.replace(/\s+/g, "");
      if (!/^\d{16}$/.test(cleanNumber))
        newErrors.cardNumber = "Card number must be 16 digits";
      if (!cardDetails.cardName) newErrors.cardName = "Cardholder name required";
      if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiry))
        newErrors.expiry = "Expiry must be MM/YY";
      if (!/^\d{3,4}$/.test(cardDetails.cvv))
        newErrors.cvv = "CVV must be 3 or 4 digits";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const id = "ORD-" + Math.floor(Math.random() * 1000000);
    setOrderId(id);
    setConfirmed(true);
    clearCart();
  };

  const handleQuantityChange = (itemId, newQty) => {
    updateQuantity(itemId, newQty);
    setAnimateBadge((prev) => ({ ...prev, [itemId]: true }));
    setTimeout(() => {
      setAnimateBadge((prev) => ({ ...prev, [itemId]: false }));
    }, 300);
  };

  const paymentLogos = {
    visa: <SiVisa className="h-8 w-8 text-blue-600" />,
    mastercard: <SiMastercard className="h-8 w-8 text-red-600" />,
    paypal: <SiPaypal className="h-8 w-8 text-blue-800" />,
    cod: <FaMoneyBillWave className="h-8 w-8 text-green-600" />,
  };

  // Hero Section
  const heroBg = "/images/chc.jpg";

  if (cartItems.length === 0 && !confirmed) {
    return (
      <div className="container mx-auto py-16 text-center">
        <h2 className="text-3xl font-bold text-[#5C4033] mb-4">Your cart is empty</h2>
        <p className="text-[#3D2B1F] mb-4">Add more products in cart to proceed an order!</p>
        <Link to="/products">
          <button className="text-[#A65B05] font-bold px-4 py-2 bg-transparent rounded-lg border-2 border-[#A65B05] hover:bg-[#A65B05] hover:text-white transition">
            View Products
          </button>
        </Link>
      </div>
    );
  }

  if (confirmed) {
    return (
      <div className="container mx-auto py-16 text-center">
        <h2 className="text-3xl font-bold text-green-800 mb-4">Order Confirmed!</h2>
        <p className="text-[#5C4033] mb-2">
          Your order ID: <strong>{orderId}</strong>
        </p>
        <p className="text-[#3D2B1F] mb-6">Total Paid: LKR {totalPrice}</p>
        <button
          onClick={() => setConfirmed(false)}
          className="px-6 py-2 bg-[#5C4033] text-white rounded hover:bg-[#3D2B1F] transition"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section
        className="w-full h-[300px] sm:h-[400px] md:h-[500px] bg-center bg-cover bg-no-repeat flex flex-col justify-center items-center"
        style={{ backgroundImage: `url('${heroBg}')` }}
      >
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold">
          Checkout
        </h1>
        <p className="text-white mt-2 sm:mt-4 text-sm sm:text-base md:text-lg font-light">
          Complete your order and payment securely
        </p>
      </section>

      {/* Checkout Form */}
      <div className="container mx-auto py-16 px-4 md:px-0">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="relative flex flex-col sm:flex-row items-center sm:justify-between gap-4 p-4 border rounded-lg shadow-sm bg-yellow-50 mb-4 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded hover:scale-105 transition-transform duration-300"
                  />
                  {item.quantity > 0 && (
                    <span
                      className={`absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg transition-transform ${
                        animateBadge[item.id] ? "scale-125 animate-bounce" : "scale-100"
                      }`}
                    >
                      {item.quantity}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-[#5C4033]">{item.name}</h3>
                  <p className="text-[#3D2B1F]">
                    Price: LKR {parseInt(item.price.replace(/[^\d]/g, ""))}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() =>
                        handleQuantityChange(item.id, Math.max(item.quantity - 1, 1))
                      }
                    >
                      -
                    </button>
                    <span className="px-2 py-1 border rounded">{item.quantity}</span>
                    <button
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span className="font-bold text-[#5C4033]">
                    LKR {parseInt(item.price.replace(/[^\d]/g, "")) * item.quantity}
                  </span>
                  <button
                    className="text-red-600 font-semibold hover:text-red-800"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3 p-6 border rounded-lg shadow bg-yellow-50 sticky top-20 h-fit flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-[#5C4033] mb-2">Order Summary</h3>
            <div className="flex justify-between font-semibold mb-2">
              <span>Items:</span>
              <span>{cartItems.length}</span>
            </div>
            <div className="flex justify-between font-bold text-[#5C4033] text-lg mb-4 border-t pt-2">
              <span>Total:</span>
              <span>LKR {totalPrice}</span>
            </div>

            {/* Payment Methods */}
            <h3 className="text-lg font-semibold text-[#5C4033] mb-3">Payment Method</h3>
            <div className="flex flex-col gap-3 mb-4">
              <label className="flex items-center gap-2 bg-yellow-100 p-3 rounded-lg border hover:border-[#5C4033] cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="creditCard"
                  checked={paymentMethod === "creditCard"}
                  onChange={() => setPaymentMethod("creditCard")}
                />
                Credit / Debit Card
              </label>
              <label className="flex items-center gap-2 bg-yellow-100 p-3 rounded-lg border hover:border-[#5C4033] cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={() => setPaymentMethod("paypal")}
                />
                PayPal
              </label>
              <label className="flex items-center gap-2 bg-yellow-100 p-3 rounded-lg border hover:border-[#5C4033] cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                Cash on Delivery
              </label>
            </div>

            {/* Credit Card Form */}
            {paymentMethod === "creditCard" && (
              <div className="flex flex-col gap-3 mb-4">
                <input
                  type="text"
                  placeholder="Card Number"
                  value={cardDetails.cardNumber}
                  onChange={(e) => handleCardChange("cardNumber", e.target.value)}
                  maxLength={19}
                  className="p-2 border rounded"
                />
                {errors.cardNumber && (
                  <p className="text-red-600 text-sm">{errors.cardNumber}</p>
                )}

                <input
                  type="text"
                  placeholder="Cardholder Name"
                  value={cardDetails.cardName}
                  onChange={(e) => handleCardChange("cardName", e.target.value)}
                  className="p-2 border rounded"
                />
                {errors.cardName && <p className="text-red-600 text-sm">{errors.cardName}</p>}

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) => handleCardChange("expiry", e.target.value)}
                    className="p-2 border rounded flex-1"
                    maxLength={5}
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    value={cardDetails.cvv}
                    onChange={(e) => handleCardChange("cvv", e.target.value)}
                    className="p-2 border rounded w-24"
                    maxLength={4}
                  />
                </div>
                {(errors.expiry || errors.cvv) && (
                  <div className="text-red-600 text-sm">{errors.expiry || errors.cvv}</div>
                )}
              </div>
            )}

            {/* Payment Logos */}
            <div className="flex gap-4 justify-center mb-4 flex-wrap">
              {paymentLogos.visa}
              {paymentLogos.mastercard}
              {paymentLogos.paypal}
              {paymentLogos.cod}
            </div>

            <button
              onClick={handleConfirmOrder}
              className="w-full px-6 py-3 bg-[#5C4033] text-white rounded-lg shadow hover:bg-[#3D2B1F] transition transform hover:scale-105"
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
