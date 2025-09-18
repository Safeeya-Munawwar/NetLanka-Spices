import React, { useRef, useState, useEffect } from "react";

const WhyChooseUs = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = sectionRef.current; // cache the current ref
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting); // toggle visibility
        });
      },
      { threshold: 0.2 }
    );

    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const cards = [
    "100% Natural and Organic",
    "No Artificial Flavors",
    "Eco-Friendly Packaging",
    "Global Standards",
  ];

  return (
    <section ref={sectionRef} className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h1
          className={`font-serif text-yellow-800 mt-10 mb-3 text-left text-xl transition-transform duration-700 ${
            isVisible ? "slide-in-left opacity-100" : "opacity-0 -translate-x-20"
          }`}
        >
          Net Spice's
        </h1>
        <h1
          className={`text-2xl md:text-3xl font-bold text-green-800 mt-3 mb-2 text-left transition-transform duration-700 delay-200 ${
            isVisible ? "slide-in-left opacity-100" : "opacity-0 -translate-x-20"
          }`}
        >
          WHY CHOOSE US
        </h1>

        <div
          className={`flex items-center justify-start mb-10 gap-4 transition-transform duration-700 delay-400 ${
            isVisible ? "slide-in-up opacity-100" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="w-20 h-px bg-gray-200"></div>
          <div className="w-10 h-8 flex items-center justify-center">
            <svg
              width="40"
              height="24"
              viewBox="0 0 40 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 12C8 6 14 6 20 12C26 18 32 18 38 12"
                stroke="#9FCB70"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="w-20 h-px bg-gray-200"></div>
        </div>

        {/* Cards Grid with staggered animation */}
        <div className="bg-slate-100 p-6 rounded-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 shadow">
          {cards.map((item, index) => (
            <div
              key={index}
              className={`border-2 border-[#E6DFCC] rounded-lg py-6 px-4 text-center transition-transform duration-700 delay-${
                index * 200
              } ${
                isVisible
                  ? index % 2 === 0
                    ? "slide-rotate-left opacity-100"
                    : "slide-rotate-right opacity-100"
                  : "opacity-0"
              }`}
            >
              <img
                src="/verified.png"
                alt="Verified Icon"
                className="mx-auto mb-2 w-8 h-8"
              />
              <p className="text-[#4B2A00] font-medium text-sm">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* OUR PROMISE Section */}
      <div className="max-w-7xl mx-auto px-6 mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="w-full">
          <img
            src="/belimal.jpg"
            alt="Tea Cup"
            className="w-full rounded-lg shadow-md object-cover h-[400px]"
          />
        </div>

        <div>
          <h2 className="text-[60px] font-bold text-green-800 uppercase mb-4">
            Our Promise
          </h2>
          <div className="flex items-center justify-start mb-10 gap-4">
            <div className="w-20 h-px bg-gray-200"></div>
            <div className="w-10 h-8 flex items-center justify-center">
              <svg
                width="40"
                height="24"
                viewBox="0 0 40 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 12C8 6 14 6 20 12C26 18 32 18 38 12"
                  stroke="#9FCB70"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="w-20 h-px bg-gray-200"></div>
          </div>
          <p className="text-gray-700 text-base leading-relaxed mb-4">
            At Net Spice's, our promise is to deliver nature’s purest treasures,
            cultivated with care, crafted with integrity, and shared with pride.
            We honor centuries of Sri Lankan heritage, working hand-in-hand
            with local farmers to bring you products of unmatched purity,
            authenticity, and excellence.
            <br />
            <span className="text-[#a86300]">
              From sustainable sourcing to artisanal craftsmanship, every detail
              reflects our deep respect for nature — and our commitment to
              offering you only the finest.
            </span>
          </p>
        </div>
      </div>

      {/* CUSTOMER TESTIMONIALS Section */}
      <div className="max-w-7xl mx-auto px-6 mt-20">
        {/* Heading */}
        <h1 className="font-serif text-yellow-800 mt-10 mb-3 text-left">
          Net Spice's
        </h1>
        <h1 className="text-2xl md:text-3xl font-bold text-green-800 mt-3 mb-2 text-left">
          Customer Testimonials
        </h1>
        <div className="flex items-center justify-start mb-10 gap-4">
          <div className="w-20 h-px bg-gray-200"></div>
          <div className="w-10 h-8 flex items-center justify-center">
            <svg
              width="40"
              height="24"
              viewBox="0 0 40 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 12C8 6 14 6 20 12C26 18 32 18 38 12"
                stroke="#9FCB70"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="w-20 h-px bg-gray-200"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "John Doe",
              country: "England",
              image: "https://randomuser.me/api/portraits/men/11.jpg",
              text: "Net Spices redefines authenticity. Every product feels like a personal gift from Sri Lanka itself.",
            },
            {
              name: "Kathe Martin",
              country: "New Zealand",
              image: "https://randomuser.me/api/portraits/women/65.jpg",
              text: "The quality, the aroma, the attention to detail — simply extraordinary. True Net Spices luxury.",
            },
            {
              name: "David Klen",
              country: "Germany",
              image: "https://randomuser.me/api/portraits/men/52.jpg",
              text: "Net Spices brings me closer to nature every morning. Incredibly fresh.",
            },
          ].map((user, idx) => (
            <div
              key={idx}
              className="bg-[#F9F6ED] p-6 rounded-lg shadow border border-[#eee]"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-sm font-bold text-gray-800">{user.name}</h4>
                  <p className="text-xs text-gray-500">{user.country}</p>
                </div>
                <div className="ml-auto text-blue-400 text-xl">🐦</div>
              </div>
              <p className="text-gray-700 text-sm">{user.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
