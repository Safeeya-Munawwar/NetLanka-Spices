import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import axios from "axios";
import { SiVisa, SiMastercard, SiPaypal } from "react-icons/si";
import { FaMoneyBillWave } from "react-icons/fa";

export default function OrderConfirmation() {
  const { cartItems, clearCart, updateQuantity, removeFromCart, addToCart } = useCart();
  const { user } = useUser();
  const [orders, setOrders] = useState([]);
  const [confirmed, setConfirmed] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [cardDetails, setCardDetails] = useState({ cardNumber: "", cardName: "", expiry: "", cvv: "" });
  const [errors, setErrors] = useState({});
  const [animateBadge, setAnimateBadge] = useState({});
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [selectedWeights, setSelectedWeights] = useState({});

  const paymentLogos = {
    visa: <SiVisa className="h-8 w-8 text-blue-600" />,
    mastercard: <SiMastercard className="h-8 w-8 text-red-600" />,
    paypal: <SiPaypal className="h-8 w-8 text-blue-800" />,
    cod: <FaMoneyBillWave className="h-8 w-8 text-green-600" />,
  };

  const parseWeight = (weight) => {
    if (!weight) return 1;
    if (typeof weight === "number") return weight;
    const w = weight.toString().toLowerCase().trim();
    if (w.endsWith("kg")) return parseFloat(w);
    if (w.endsWith("g")) return parseFloat(w) / 1000;
    const num = parseFloat(w);
    return isNaN(num) ? 1 : num;
  };

  const calculateTotalPriceLKR = () =>
    cartItems.reduce((sum, item) => sum + (item.priceLKR || 0) * parseWeight(item.weight) * item.quantity, 0);

  const calculateTotalPriceUSD = () =>
    cartItems.reduce((sum, item) => sum + (item.priceUSD || 0) * parseWeight(item.weight) * item.quantity, 0);

  // Fetch recommended products
  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setRecommendedProducts(res.data);
        const defaultWeights = {};
        res.data.forEach(p => defaultWeights[p.id] = 1);
        setSelectedWeights(defaultWeights);
      } catch (err) {
        console.error("Failed to fetch recommended products:", err);
      }
    };
    fetchRecommended();
  }, []);

  // Fetch user orders
  useEffect(() => {
    if (!user?.id) return;
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/orders/${user.id}`);
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err.response?.data || err.message);
      }
    };
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, [user?.id]);

  const handleCardChange = (field, value) => {
    if (field === "cardNumber")
      value = value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
    setCardDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleQuantityChange = (productId, newQty) => {
    updateQuantity(productId, newQty);
    setAnimateBadge(prev => ({ ...prev, [productId]: true }));
    setTimeout(() => setAnimateBadge(prev => ({ ...prev, [productId]: false })), 300);
  };

  const handlePlaceOrder = async () => {
    if (!user?.id) return alert("Please log in to place an order");

    const newErrors = {};
    if (paymentMethod === "creditCard") {
      const cleanNumber = cardDetails.cardNumber.replace(/\s+/g, "");
      if (!/^\d{16}$/.test(cleanNumber)) newErrors.cardNumber = "Card number must be 16 digits";
      if (!cardDetails.cardName) newErrors.cardName = "Cardholder name required";
      if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiry)) newErrors.expiry = "Expiry must be MM/YY";
      if (!/^\d{3,4}$/.test(cardDetails.cvv)) newErrors.cvv = "CVV must be 3 or 4 digits";
    }
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    try {
      const itemsForOrder = cartItems.map(item => {
        const weight = parseWeight(item.weight);
        return {
          productId: item.id || item.productId,
          name: item.name || "Unknown Product",
          quantity: Number(item.quantity || 1),
          priceLKR: Number(item.priceLKR || 0) * weight,
          priceUSD: Number(item.priceUSD || 0) * weight,
          weightKg: weight,
          image: item.image || "",
        };
      });
      

      const totalPriceLKR = calculateTotalPriceLKR();
      const totalPriceUSD = calculateTotalPriceUSD();
      
      const response = await axios.post("http://localhost:5000/api/orders", {
        userId: user.id,
        items: itemsForOrder,
        totalPrice: totalPriceLKR, // map to single field if backend expects `totalPrice`
        totalPriceLKR,
        totalPriceUSD,
        paymentMethod,
      });
      

      setOrderId(response.data.id);
      setConfirmed(true);
      clearCart();
    } catch (err) {
      console.error("Order placement error:", err.response?.data || err.message);
      alert("Failed to place order: " + (err.response?.data?.message || err.message));
    }
  };

  if (confirmed) {
    return (
      <div className="container mx-auto py-16 text-center">
        <h2 className="text-3xl font-bold text-green-800 mb-4">Order Confirmed!</h2>
        <p className="text-[#5C4033] mb-2">Your order ID: <strong>{orderId}</strong></p>
        <p className="text-[#3D2B1F] mb-6">Total Paid: LKR {calculateTotalPriceLKR().toLocaleString()}</p>
        <a href="/products" className="px-6 py-2 bg-[#5C4033] text-white rounded hover:bg-[#3D2B1F] transition">Back to Shop</a>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16 px-4 md:px-0">
      {!cartItems.length ? (
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#5C4033] mb-4">Your cart is empty</h2>
          <p className="text-[#3D2B1F] mb-4">Add products to proceed!</p>
          <a href="/products" className="text-[#A65B05] font-bold px-4 py-2 border-2 border-[#A65B05] rounded-lg hover:bg-[#A65B05] hover:text-white transition">View Products</a>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Cart Items */}
          <div className="flex-1">
            {cartItems.map(item => (
              <div key={item.id || item.productId} className="relative flex flex-col sm:flex-row items-center sm:justify-between gap-4 p-4 border rounded-lg shadow-sm bg-yellow-50 mb-4 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] transition-transform duration-300">
                <div className="relative">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded hover:scale-105 transition-transform duration-300" />
                  {item.quantity > 0 && (
                    <span className={`absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg transition-transform ${animateBadge[item.productId]? "scale-125 animate-bounce" : "scale-100"}`}>
                      {item.quantity}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-[#5C4033]">{item.name}</h3>
                  <p className="text-[#3D2B1F]">Weight: {parseWeight(item.weight)} kg</p>
                  <p className="text-[#3D2B1F]">Price: LKR {(item.priceLKR * parseWeight(item.weight)).toLocaleString()} / ${ (item.priceUSD * parseWeight(item.weight)).toFixed(2) }</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300" onClick={() => handleQuantityChange(item.productId, Math.max(item.quantity - 1, 1))}>-</button>
                    <span className="px-2 py-1 border rounded">{item.quantity}</span>
                    <button className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300" onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="font-bold text-[#5C4033]">LKR {(item.priceLKR * parseWeight(item.weight) * item.quantity).toLocaleString()} / ${ (item.priceUSD * parseWeight(item.weight) * item.quantity).toFixed(2) }</span>
                  <button className="text-red-600 font-semibold hover:text-red-800" onClick={() => removeFromCart(item.productId)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3 p-6 border rounded-lg shadow bg-yellow-50 sticky top-20 h-fit flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-[#5C4033] mb-2">Order Summary</h3>
            <div className="flex justify-between font-semibold mb-2"><span>Items:</span><span>{cartItems.length}</span></div>
            <div className="flex justify-between font-bold text-[#5C4033] text-lg mb-4 border-t pt-2">
              <span>Total:</span>
              <span>LKR {calculateTotalPriceLKR().toLocaleString()} / ${calculateTotalPriceUSD().toFixed(2)}</span>
            </div>

            <h3 className="text-lg font-semibold text-[#5C4033] mb-3">Payment Method</h3>
            <div className="flex flex-col gap-3 mb-4">
              {["cod", "creditCard", "paypal"].map(method => (
                <label key={method} className="flex items-center gap-2 bg-yellow-100 p-3 rounded-lg border hover:border-[#5C4033] cursor-pointer">
                  <input type="radio" name="payment" value={method} checked={paymentMethod === method} onChange={() => setPaymentMethod(method)} />
                  {method === "cod" ? "Cash on Delivery" : method === "creditCard" ? "Credit / Debit Card" : "PayPal"}
                </label>
              ))}
            </div>

            {paymentMethod === "creditCard" && (
              <div className="flex flex-col gap-3 mb-4">
                <input type="text" placeholder="Card Number" value={cardDetails.cardNumber} onChange={e => handleCardChange("cardNumber", e.target.value)} maxLength={19} className="p-2 border rounded" />
                {errors.cardNumber && <p className="text-red-600 text-sm">{errors.cardNumber}</p>}
                <input type="text" placeholder="Cardholder Name" value={cardDetails.cardName} onChange={e => handleCardChange("cardName", e.target.value)} className="p-2 border rounded" />
                {errors.cardName && <p className="text-red-600 text-sm">{errors.cardName}</p>}
                <div className="flex gap-2">
                  <input type="text" placeholder="MM/YY" value={cardDetails.expiry} onChange={e => handleCardChange("expiry", e.target.value)} className="p-2 border rounded flex-1" maxLength={5} />
                  <input type="text" placeholder="CVV" value={cardDetails.cvv} onChange={e => handleCardChange("cvv", e.target.value)} className="p-2 border rounded w-24" maxLength={4} />
                </div>
                {(errors.expiry || errors.cvv) && <div className="text-red-600 text-sm">{errors.expiry || errors.cvv}</div>}
              </div>
            )}

<div className="flex gap-4 justify-center mb-4 flex-wrap">
  {Object.entries(paymentLogos).map(([method, logo]) => (
    <div key={method}>{logo}</div>
  ))}
</div>

            <button onClick={handlePlaceOrder} className="w-full px-6 py-3 bg-[#5C4033] text-white rounded-lg shadow hover:bg-[#3D2B1F] transition transform hover:scale-105">Confirm Order</button>
          </div>
        </div>
      )}

      {/* Previous Orders */}
{/* Previous Orders */}
<div className="mt-16">
  <h2 className="text-2xl font-bold text-[#5C4033] mb-6">Your Previous Orders</h2>
  {orders.length === 0 ? (
    <p className="text-[#3D2B1F]">You have no previous orders.</p>
  ) : (
    orders.map(order => (
      <div key={order.id} className="border rounded-lg p-4 mb-4 shadow-sm bg-white hover:shadow-lg transition">
        <div className="flex justify-between mb-2">
          <span className="font-semibold text-[#5C4033]">Order ID: {order.id}</span>
          <span className={`text-sm font-semibold ${order.status === "Pending" ? "text-orange-600" : "text-green-700"}`}>{order.status}</span>
        </div>
        <div className="mb-2">
          {order.items.map(item => (
            <div key={item.productId + item.weightKg} className="flex justify-between text-sm py-1 border-b last:border-b-0">
              <span>{item.name} ({item.weightKg ?? 1} kg)</span>
              <span>
                LKR {(item.priceLKR ?? 0).toLocaleString()} / ${(item.priceUSD ?? 0).toFixed(2)} × {item.quantity} = 
                LKR {((item.priceLKR ?? 0) * item.quantity).toLocaleString()} / ${( (item.priceUSD ?? 0) * item.quantity ).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div className="text-right font-bold text-[#5C4033]">
          Total: LKR {(order.totalPriceLKR ?? 0).toLocaleString()} / ${(order.totalPriceUSD ?? 0).toFixed(2)}
        </div>
      </div>
    ))
  )}
</div>


      {/* Recommended Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-[#5C4033] mb-6">Recommended for you</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {recommendedProducts.map(product => (
            <div key={product.id} className="border rounded-lg p-4 bg-white shadow hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] transition-transform">
              <img src={product.image} alt={product.title} className="w-full h-36 object-cover mb-2 rounded" />
              <p className="text-sm font-semibold text-[#5C4033] mb-1">{product.title}</p>
              <p className="text-sm text-[#3D2B1F] mb-2">LKR {product.priceLKR.toLocaleString()} / ${product.priceUSD.toFixed(2)}</p>

              <select className="mb-2 p-1 border rounded w-full" value={selectedWeights[product.id]} onChange={(e) => setSelectedWeights(prev => ({ ...prev, [product.id]: Number(e.target.value) }))}>
                <option value={0.5}>500g</option>
                <option value={1}>1kg</option>
                <option value={2}>2kg</option>
                <option value={3}>3kg</option>
              </select>

              <button className="w-full py-1 bg-yellow-900 text-white rounded hover:bg-yellow-800 transition" onClick={() => addToCart({ ...product, weight: selectedWeights[product.id], quantity: 1 })}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
