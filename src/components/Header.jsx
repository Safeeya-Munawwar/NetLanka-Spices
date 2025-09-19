import React, { useEffect, useRef, useState } from "react";
import ImageSlider from "./ImageSlider";
import { Link } from "react-router-dom";

export default function Header() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );

    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div>
      {/* First Section */}
      <section className="w-full min-h-[500px] md:h-[600px] bg-white flex items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="flex flex-col-reverse md:flex-row justify-between items-center max-w-7xl mx-auto gap-8">
          {/* Text */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[rgb(166,91,5)]">
              Taste the Essence of Nature
            </h1>
            <p className="text-justify text-sm sm:text-base mt-4">
              At Net Spice's, we bring you the vibrant flavors and natural
              goodness of Sri Lanka to the global stage. Specializing in premium
              foods, aromatic herbs, exotic spices, and the world-renowned
              Ceylon tea, our mission is to deliver purity, freshness, and
              quality in every shipment. With deep roots in traditional
              agriculture and a passion for sustainable sourcing, Zest Ceylon
              ensures every product is handpicked and processed to retain its
              authentic essence. Whether you’re a gourmet brand, a tea merchant,
              or a wellness company, our export solutions are tailored to meet
              your exact needs—with consistency, care, and a zest for
              excellence.
            </p>
           <Link to="/Products">
  <button className="mt-6 mb-8 sm:mb-0 text-[rgb(166,91,5)] font-bold px-5 py-2 bg-transparent rounded-lg border-2 border-[rgb(166,91,5)] hover:bg-[rgb(166,91,5)] hover:text-white transition">
    View Products
  </button>
</Link>

          </div>

          {/* Image Slider */}
          <div className="w-full md:w-1/2">
            <ImageSlider />
          </div>
        </div>
      </section>

      {/* Second Section */}
      <section
        ref={sectionRef}
        className={`w-full py-10 bg-[rgb(61,76,43)] flex items-center justify-center transition-all duration-700 ${
          isVisible ? "slide-up opacity-100" : "opacity-0 translate-y-20"
        }`}
        aria-label="feature-strip"
      >
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-20 max-w-7xl mx-auto text-white font-semibold text-center text-sm sm:text-base">
          <div className="flex flex-col items-center">
            <img src="/shipped.png" alt="" className="w-12 h-12 sm:w-16 sm:h-14" />
            <p className="mt-3">Doorstep Delivery</p>
          </div>

          <div className="flex flex-col items-center">
            <img src="/quality.png" alt="" className="w-12 h-12 sm:w-16 sm:h-14" />
            <p className="mt-3">Quality Guaranteed</p>
          </div>

          <div className="flex flex-col items-center">
            <img src="/srilanka.png" alt="" className="w-12 h-12 sm:w-16 sm:h-14" />
            <p className="mt-3">Largest Marketer</p>
          </div>

          <div className="flex flex-col items-center">
            <img src="/banking.png" alt="" className="w-12 h-12 sm:w-16 sm:h-14" />
            <p className="mt-3">Pay Online</p>
          </div>
        </div>
      </section>
    </div>
  );
}
