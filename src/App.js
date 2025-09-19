import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AboutUS from "./pages/AboutUS";
import ContactUs from "./pages/ContactUs";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<AboutUS/>} />
        <Route path="/contact" element={<ContactUs/>} />

      </Routes>
    </div>
  );
}

export default App;
