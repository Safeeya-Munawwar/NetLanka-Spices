import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  FaEnvelope,
  FaUser,
  FaPhone,
  FaBuilding,
  FaBoxOpen,
  FaSortAmountUp,
  FaWeight,
  FaCommentAlt,
} from "react-icons/fa";

export default function BulkOrderForm() {
  const location = useLocation();
  const product = location.state?.product; // Product passed from previous page

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    productList: "",
    quantity: "",
    weight: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // 💱 Conversion rate if USD missing
  const conversionRate = 0.0045;

  // Format price safely
  const formatDualPrice = (priceLKR, priceUSD) => {
    const lkr = parseFloat(priceLKR);
    const usd = parseFloat(priceUSD);
    const lkrText = !isNaN(lkr) ? `Rs. ${lkr.toLocaleString()}` : "Rs. —";
    const usdText =
      !isNaN(usd)
        ? `$${usd.toFixed(2)}`
        : !isNaN(lkr)
        ? `$${(lkr * conversionRate).toFixed(2)}`
        : "$—";
    return `${lkrText} / ${usdText}`;
  };

  // Prefill product info when available
  useEffect(() => {
    if (product) {
      const priceText = formatDualPrice(product.priceLKR, product.priceUSD);
      setFormData((prev) => ({
        ...prev,
        productList: `${product.title} - ${priceText}`,
      }));
    }
  }, [product]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const payload = {
        ...formData,
        quantity: formData.quantity ? Number(formData.quantity) : undefined,
      };

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/bulk-orders`,
        payload
      );

      if (res.status === 201) {
        setStatus("✅ Your bulk order request has been submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          productList: product
            ? `${product.title} - ${formatDualPrice(
                product.priceLKR,
                product.priceUSD
              )}`
            : "",
          quantity: "",
          weight: "",
          message: "",
        });
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-yellow-50 min-h-screen py-10">
      <div className="max-w-3xl mx-auto bg-yellow-100 rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-yellow-900 mb-4">
          Bulk Order Request Form
        </h1>
        <p className="text-center text-yellow-800 mb-8">
          Please fill in your details and product requirements below. We’ll get
          in touch soon!
        </p>

        {/* Product info display */}
        {product && (
          <div className="bg-yellow-200 p-4 rounded-xl mb-6 shadow-inner">
            <h2 className="text-lg font-semibold text-yellow-900">
              Product: {product.title}
            </h2>
            <p className="text-yellow-800 font-medium">
              Price: {formatDualPrice(product.priceLKR, product.priceUSD)} per kg
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block font-semibold text-yellow-900 mb-2">
              <FaUser className="inline mr-2 text-yellow-600" /> Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 rounded-xl border border-yellow-300 bg-yellow-50 focus:ring-2 focus:ring-yellow-500 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold text-yellow-900 mb-2">
              <FaEnvelope className="inline mr-2 text-yellow-600" /> Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-xl border border-yellow-300 bg-yellow-50 focus:ring-2 focus:ring-yellow-500 outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block font-semibold text-yellow-900 mb-2">
              <FaPhone className="inline mr-2 text-yellow-600" /> Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your contact number"
              className="w-full px-4 py-2 rounded-xl border border-yellow-300 bg-yellow-50 focus:ring-2 focus:ring-yellow-500 outline-none"
            />
          </div>

          {/* Company */}
          <div>
            <label className="block font-semibold text-yellow-900 mb-2">
              <FaBuilding className="inline mr-2 text-yellow-600" /> Company Name
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Enter your company name (optional)"
              className="w-full px-4 py-2 rounded-xl border border-yellow-300 bg-yellow-50 focus:ring-2 focus:ring-yellow-500 outline-none"
            />
          </div>

          {/* Product List */}
          <div>
            <label className="block font-semibold text-yellow-900 mb-2">
              <FaBoxOpen className="inline mr-2 text-yellow-600" /> Products Required
            </label>
            <textarea
              name="productList"
              required
              value={formData.productList}
              onChange={handleChange}
              placeholder="List the products and quantities you are interested in..."
              className="w-full px-4 py-2 rounded-xl border border-yellow-300 bg-yellow-50 focus:ring-2 focus:ring-yellow-500 outline-none"
              rows="3"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block font-semibold text-yellow-900 mb-2">
              <FaSortAmountUp className="inline mr-2 text-yellow-600" /> Quantity
            </label>
            <input
              type="number"
              min="1"
              name="quantity"
              value={formData.quantity || ""}
              onChange={handleChange}
              placeholder="Enter bulk quantity"
              className="w-full px-4 py-2 rounded-xl border border-yellow-300 bg-yellow-50 focus:ring-2 focus:ring-yellow-500 outline-none"
            />
          </div>

          {/* Weight */}
          <div>
            <label className="block font-semibold text-yellow-900 mb-2">
              <FaWeight className="inline mr-2 text-yellow-600" /> Weight
            </label>
            <input
              type="text"
              name="weight"
              value={formData.weight || ""}
              onChange={handleChange}
              placeholder="e.g., 5kg, 10kg"
              className="w-full px-4 py-2 rounded-xl border border-yellow-300 bg-yellow-50 focus:ring-2 focus:ring-yellow-500 outline-none"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block font-semibold text-yellow-900 mb-2">
              <FaCommentAlt className="inline mr-2 text-yellow-600" /> Additional Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter any additional details or requirements"
              className="w-full px-4 py-2 rounded-xl border border-yellow-300 bg-yellow-50 focus:ring-2 focus:ring-yellow-500 outline-none"
              rows="4"
            />
          </div>

          {/* Status */}
          {status && (
            <p
              className={`text-center font-medium ${
                status.includes("✅") ? "text-green-700" : "text-red-600"
              }`}
            >
              {status}
            </p>
          )}

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-yellow-500 text-yellow-900 font-semibold rounded-xl shadow-md hover:bg-yellow-600 transition disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
