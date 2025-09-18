import React from "react";
import ImageSlider from "./ImageSlider";
import {Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="">
        <section className="w-full h-[600px] bg-gray-50  flex items-center justify-center">
      <div className="flex justify-between items-center max-w-7xl mx-auto space-x-3 gap-5">
        <div className="w-1/2">
       <h1 className="text-3xl font-bold text-[rgb(166,91,5)]">Taste the Essence of Nature</h1>
       <br />
       <p className="text-justify">At Net Spice's, we bring you the vibrant flavors and natural goodness of Sri Lanka to the global stage. Specializing in premium foods, aromatic herbs, exotic spices, and the world-renowned Ceylon tea, our mission is to deliver purity, freshness, and quality in every shipment. With deep roots in traditional agriculture and a passion for sustainable sourcing, Zest Ceylon ensures every product is handpicked and processed to retain its authentic essence. Whether you’re a gourmet brand, a tea merchant, or a wellness company, our export solutions are tailored to meet your exact needs—with consistency, care, and a zest for excellence.</p>
       <br />
       <br />
       <Link to='/Products'>
          <button className=" text-[rgb(166,91,5)] font-bold px-4 py-2 bg-transparent rounded-lg  border-2 border-[rgb(166,91,5)] ">View Products</button>
     </Link>
    
      </div>
      <div className="w-1/2">
      <ImageSlider/>
      </div>
      </div>
    </section>
   <section className="w-full h-[200px] bg-[rgb(61,76,43)] flex items-center justify-center">

  <div className="flex justify-between max-w-7xl mx-auto gap-28 text-white font-semibold text-lg">

    <div className="flex flex-col items-center text-center">
      <img src="/shipped.png" alt="" className="w-16 h-14" />
      <p className="mt-3">Doorstep Delivery</p>
    </div>

    <div className="flex flex-col items-center text-center">
      <img src="/quality.png" alt="" className="w-16 h-14" />
      <p className="mt-3">Quality Guaranteed</p>
    </div>

    <div className="flex flex-col items-center text-center">
      <img src="/srilanka.png" alt="" className="w-16 h-14" />
      <p className="mt-3">Largest Marketer</p>
    </div>

    <div className="flex flex-col items-center text-center">
      <img src="/banking.png" alt="" className="w-16 h-14" />
      <p className="mt-3">Pay Online</p>
    </div>
  </div>
</section>
    </div>
  );
}