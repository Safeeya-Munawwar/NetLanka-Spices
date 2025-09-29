import React from "react";
import Header from "../components/Header";
import Category from "../components/Category";
import Hero from "../components/Hero";
import ProductsSection from "../components/ProductsSection";
import WhyChooseUs from "../components/WhyChooseUs";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div>
      <Header />
      <Category />
      <Hero />
      <ProductsSection />
      <WhyChooseUs />
    </div>
  );
}
