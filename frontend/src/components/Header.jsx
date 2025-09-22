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
        entries.forEach((entry) => setIsVisible(entry.isIntersecting));
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
      {/* Hero Section */}
      <section className="w-full bg-white flex items-center justify-center py-10 sm:py-16">
        <div className="flex flex-col-reverse md:flex-row justify-between items-center max-w-7xl mx-auto gap-10 md:gap-20 px-4 sm:px-6">
          {/* Text */}
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl md:text-3xl font-bold text-[rgb(166,91,5)]">
              Taste the Essence of Nature
            </h1>
            <br />
            <p className="text-justify text-sm md:text-base">
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

          {/* Image Slider */}
          <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
            <div className="w-full max-w-lg sm:max-w-md md:max-w-full">
              <ImageSlider />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Strip */}
      <section
        ref={sectionRef}
        className={`w-full bg-[rgb(61,76,43)] flex items-center justify-center transition-all duration-700 py-6 sm:py-8 ${
          isVisible ? "slide-up opacity-100" : "opacity-0 translate-y-20"
        }`}
        aria-label="feature-strip"
      >
        <div className="flex flex-wrap justify-center md:justify-between max-w-7xl mx-auto gap-6 md:gap-28 text-white font-semibold text-lg">
          {[
            { img: "/images/shipped.png", text: "Doorstep Delivery" },
            { img: "/images/quality.png", text: "Quality Guaranteed" },
            { img: "/images/srilanka.png", text: "Largest Marketer" },
            { img: "/images/banking.png", text: "Pay Online" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center w-32 sm:w-36 md:w-auto mb-4 md:mb-0"
            >
              <img
                src={item.img}
                alt={item.text}
                className="w-16 h-14 sm:w-16 sm:h-14 md:w-16 md:h-14"
              />
              <p className="mt-3">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
