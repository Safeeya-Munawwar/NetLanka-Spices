import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
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
import WhatsAppButton from "./components/WhatsAppButton";
import CartSidebar from "./components/CartSidebar";
import CategoryProducts from "./components/CategoryProducts";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          {/* Pages without Navbar/Footer */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />

          {/* Pages with Navbar/Footer */}
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <main className="flex-grow bg-yellow-50">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/categories/:category" element={<CategoryProducts />} />
                    <Route path="/:category" element={<CategoryProducts />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/spices" element={<SpicesPage />} />
                    <Route path="/herbs" element={<HerbsPage />} />
                    <Route path="/teas" element={<TeasPage />} />
                    <Route path="/coffee" element={<CoffeePage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
                </main>
                <WhatsAppButton />
                <Footer />
                <CartSidebar />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
