import React from "react";
import Header from "../components/Header";

import Hero from "../components/Hero";
import ProductsSection from "../components/ProductsSection";
import WhyChooseUs from "../components/WhyChooseUs";
import All from "../components/All";
import BeyondTradition from "../components/BeyondTradition";
import NewsletterSection from "../components/NewsletterSection";

export default function Home() {
 // const user = JSON.parse(localStorage.getItem("user"));

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
  //   window.location.href = "/login";
  // };

  return (
    <div>
      <Header />
      <All/>
      <ProductsSection />
      <BeyondTradition/>
      <Hero />
      <WhyChooseUs />
      <NewsletterSection/>
    </div>
  );
}
