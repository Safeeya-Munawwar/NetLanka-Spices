import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext"; 
import { WishlistProvider } from "./context/WishlistContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <CartProvider>
      <WishlistProvider>
        <App />
      </WishlistProvider>
      </CartProvider>
    </UserProvider>
  </React.StrictMode>
);
