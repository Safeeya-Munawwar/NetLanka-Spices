import React, { useState } from "react";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // 👁️ from react-icons

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* ✅ Full-screen blurred background image */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-md"
        style={{ backgroundImage: "url('/all1.jpg')" }}
      ></div>

      {/* ✅ Semi-transparent overlay */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>

      {/* ✅ Login card */}
      <div
        className="relative shadow-2xl rounded-3xl w-full max-w-md p-8 sm:p-10 border border-yellow-800 bg-cover bg-center"
        style={{ backgroundImage: "url('/all1.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/80 rounded-3xl"></div>

        <div className="relative">
          {/* Logo */}
          <div className="flex justify-center mb-5">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-20 h-20 object-contain"
            />
          </div>

          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@gmail.com"
                className="w-full px-4 py-3 border border-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition bg-gray-50 placeholder-gray-400"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pr-12 border border-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition bg-gray-50 placeholder-gray-400"
                />
                {/* 👁️ Eye icon */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-yellow-700 hover:text-yellow-600"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={22} />
                  ) : (
                    <AiOutlineEye size={22} />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-300"
            >
              Login
            </button>
          </form>

          <p className="mt-5 text-center text-gray-700">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-yellow-600 font-semibold hover:underline"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
