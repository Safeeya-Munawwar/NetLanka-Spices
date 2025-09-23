import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import CartSidebar from "./CartSidebar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex-grow bg-yellow-50">{children}</main>
      <WhatsAppButton />
      <Footer />
      <CartSidebar />
    </>
  );
}
