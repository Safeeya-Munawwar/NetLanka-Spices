import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Categories from "./pages/Categories";
import SpicesPage from "./pages/Spices";
import HerbsPage from "./pages/Herbs";
import TeasPage from "./pages/Teas";
import CoffeePage from "./pages/Coffee";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";
import OrderConfirmation from "./pages/OrderConfirmation";
import CategoryProducts from "./components/CategoryProducts";

function App() {
  return (
    <Router>
      <Routes>
        {/* Pages without Navbar/Footer */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />

        {/* Pages with Navbar/Footer/Layout */}
        <Route
          path="/"
          element={<Layout><Home /></Layout>}
        />
        <Route
          path="/products"
          element={<Layout><Products /></Layout>}
        />
        <Route
          path="/products/:id"
          element={<Layout><ProductDetail /></Layout>}
        />
        <Route
          path="/categories"
          element={<Layout><Categories /></Layout>}
        />
        <Route
          path="/categories/:category"
          element={<Layout><CategoryProducts /></Layout>}
        />
        <Route
          path="/spices"
          element={<Layout><SpicesPage /></Layout>}
        />
        <Route
          path="/herbs"
          element={<Layout><HerbsPage /></Layout>}
        />
        <Route
          path="/teas"
          element={<Layout><TeasPage /></Layout>}
        />
        <Route
          path="/coffee"
          element={<Layout><CoffeePage /></Layout>}
        />
        <Route
          path="/about"
          element={<Layout><About /></Layout>}
        />
        <Route
          path="/contact"
          element={<Layout><Contact /></Layout>}
        />
        <Route
          path="/order-confirmation"
          element={<Layout><OrderConfirmation /></Layout>}
        />
      </Routes>
    </Router>
  );
}

export default App;
