import React, { useRef, useState, useEffect } from "react";

export default function Hero() {
  const secondSectionRef = useRef(null);
  const thirdLeftRef = useRef(null);
  const thirdRightRef = useRef(null);
  const [secondVisible, setSecondVisible] = useState(false);

  useEffect(() => {
    const secondRefCurrent = secondSectionRef.current;
    const thirdLeftCurrent = thirdLeftRef.current;
    const thirdRightCurrent = thirdRightRef.current;

    const observerSecond = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setSecondVisible(entry.isIntersecting));
      },
      { threshold: 0.2 }
    );

    if (secondRefCurrent) observerSecond.observe(secondRefCurrent);

    const observerCards = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          } else {
            entry.target.classList.remove("in-view");
          }
        });
      },
      { threshold: 0.3 }
    );

    if (thirdLeftCurrent) observerCards.observe(thirdLeftCurrent);
    if (thirdRightCurrent) observerCards.observe(thirdRightCurrent);

    return () => {
      if (secondRefCurrent) observerSecond.unobserve(secondRefCurrent);
      if (thirdLeftCurrent) observerCards.unobserve(thirdLeftCurrent);
      if (thirdRightCurrent) observerCards.unobserve(thirdRightCurrent);
    };
  }, []);

  return (
    <div>
      {/* First Section */}
      <section className="w-full bg-gray-200 py-12 mt-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
            {/* Text */}
            <div className="md:w-1/2">
              <h1 className="font-serif mt-5 text-yellow-800 mb-2 text-left text-lg sm:text-xl">
                Net Spice's
              </h1>
              <h2 className="text-2xl sm:text-3xl font-bold mt-3 text-green-800 text-left leading-snug">
                ALL SPICES AT ONE PLACE
              </h2>
              <p className="mt-6 text-justify text-gray-700 text-sm sm:text-base leading-relaxed">
                Sri Lanka, renowned as the island of spices, is home to Zest
                Ceylon—your ultimate online destination for premium Sri Lankan
                spices. Whether you’re seeking bold, aromatic flavors or
                stocking up in bulk, Zest Ceylon brings you a rich selection of
                both organic and conventional spices, all in one place.
              </p>
            </div>

            {/* Image */}
            <div className="md:w-1/2 flex justify-center md:justify-end mt-6 md:mt-10">
              <div className="w-full max-w-sm md:max-w-lg rounded-xl overflow-hidden shadow-lg">
                <img
                  src="/all.jpg"
                  alt="spice"
                  className="w-full h-64 sm:h-80 md:h-[380px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Second Section */}
      <section
        ref={secondSectionRef}
        className="w-full bg-[rgb(204,235,173)] py-10 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className={`text-xl sm:text-2xl md:text-3xl font-semibold text-[rgb(78,98,57)] text-center font-serif mb-4 slide-in-left ${
              secondVisible ? "in-view" : ""
            }`}
          >
            NET SPICE'S - beyond tradition
          </h2>

          <div
            className={`flex items-center justify-center mb-6 gap-3 sm:gap-4 slide-in-up ${
              secondVisible ? "in-view" : ""
            }`}
          >
            <div className="w-12 sm:w-20 h-px bg-gray-400"></div>
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
            <div className="w-12 sm:w-20 h-px bg-gray-400"></div>
          </div>

          <p
            className={`mt-4 sm:mt-6 text-center text-gray-600 text-sm sm:text-base leading-relaxed slide-in-right ${
              secondVisible ? "in-view" : ""
            }`}
          >
            “From the heart of Ceylon to your table — Net Spices Ceylon delivers
            nature’s finest treasures with care. Experience the richness of
            tradition, every sip and every sprinkle.”
          </p>
        </div>
      </section>

      {/* Third Section */}
      <section className="w-full bg-white py-12 sm:py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-10">
            {/* Left Card */}
            <div
              ref={thirdLeftRef}
              className="w-full md:w-[48%] border shadow-sm border-gray-300 rounded-lg overflow-hidden slide-left"
            >
              <img
                src="/cin.jpg"
                alt=""
                className="w-full h-56 sm:h-72 md:h-[350px] object-cover"
              />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[rgb(80,70,1)] px-4 py-4 text-left">
                SEE HOW IT PROCESSED
              </h2>
              <p className="mt-4 sm:mt-6 italic text-justify text-gray-600 px-4 sm:px-6 text-sm sm:text-base leading-relaxed">
                Handpicked at dawn, only the finest Cinnamon are carefully
                plucked by skilled hands in Sri Lanka’s lush highlands. These
                tender leaves are quickly transported to the factory, where they
                undergo expert withering, rolling, oxidation, and drying.
              </p>
            </div>

            {/* Right Card */}
            <div
              ref={thirdRightRef}
              className="w-full md:w-[48%] border shadow-sm border-gray-300 rounded-lg overflow-hidden slide-right"
            >
              <img
                src="/tu.jpg"
                alt=""
                className="w-full h-56 sm:h-72 md:h-[350px] object-cover"
              />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[rgb(80,70,1)] px-4 py-4 text-left">
                SPECIALITY OF CEYLON SPICES
              </h2>
              <p className="mt-4 sm:mt-6 italic text-justify text-gray-600 px-4 sm:px-6 text-sm sm:text-base leading-relaxed">
                Ceylon spices, including pepper and cinnamon, are renowned for
                their exceptional quality and unique flavor profiles. Harvested
                from Sri Lanka’s fertile lands, they define the island’s rich
                culinary heritage.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
