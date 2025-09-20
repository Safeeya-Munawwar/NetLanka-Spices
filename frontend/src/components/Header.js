import React, { useEffect, useRef, useState } from "react";
import ImageSlider from "./ImageSlider";
import { Link } from "react-router-dom";

export default function Header() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = sectionRef.current; // cache ref for cleanup
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false); // reset when leaving viewport
          }
        });
      },
      { threshold: 0.2 } // triggers when 20% visible
    );

    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div>
      {/* First Section */}
      <section className="w-full h-[600px] bg-white flex items-center justify-center">
        <div className="flex justify-between items-center max-w-7xl mx-auto space-x-3 gap-5">
          <div className="w-1/2">
            <h1 className="text-3xl font-bold text-[rgb(166,91,5)]">
              Taste the Essence of Nature
            </h1>
            <br />
            <p className="text-justify">
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
            <br />
            <br />
            <Link to="/Products">
              <button className="text-[rgb(166,91,5)] font-bold px-4 py-2 bg-transparent rounded-lg border-2 border-[rgb(166,91,5)]">
                View Products
              </button>
            </Link>
          </div>

          <div className="w-1/2">
            <ImageSlider />
          </div>
        </div>
      </section>

      {/* Second Section */}
      <section
        ref={sectionRef}
        className={`w-full h-[200px] bg-[rgb(61,76,43)] flex items-center justify-center transition-all duration-700 ${
          isVisible ? "slide-up opacity-100" : "opacity-0 translate-y-20"
        }`}
        aria-label="feature-strip"
      >
        <div className="flex justify-between max-w-7xl mx-auto gap-28 text-white font-semibold text-lg">
          <div className="flex flex-col items-center text-center">
            <img src="/images/shipped.png" alt="" className="w-16 h-14" />
            <p className="mt-3">Doorstep Delivery</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <img src="/images/quality.png" alt="" className="w-16 h-14" />
            <p className="mt-3">Quality Guaranteed</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <img src="/images/srilanka.png" alt="" className="w-16 h-14" />
            <p className="mt-3">Largest Marketer</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <img src="/images/banking.png" alt="" className="w-16 h-14" />
            <p className="mt-3">Pay Online</p>
          </div>
        </div>
      </section>
    </div>
  );
}