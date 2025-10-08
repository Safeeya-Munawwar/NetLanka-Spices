import React from "react";
import Header from "../components/Header";

import Hero from "../components/Hero";
import ProductsSection from "../components/ProductsSection";
import WhyChooseUs from "../components/WhyChooseUs";
import All from "../components/All";
import BeyondTradition from "../components/BeyondTradition";
import NewsletterSection from "../components/NewsletterSection";

export default function Home() {
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
