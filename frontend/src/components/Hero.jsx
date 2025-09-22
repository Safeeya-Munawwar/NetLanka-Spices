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

    // Intersection observer for second section
    const observerSecond = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setSecondVisible(entry.isIntersecting));
      },
      { threshold: 0.2 }
    );

    if (secondRefCurrent) observerSecond.observe(secondRefCurrent);

    // Intersection observer for third section cards
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
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
            <div className="md:w-1/2">
              <h1 className="font-serif mt-10 text-yellow-800 mb-3 text-left text-xl">
                Net Spice's
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold mt-3 text-green-800 text-left">
                ALL SPICES AT ONE PLACE
              </h2>
              <p className="mt-7 text-justify text-gray-700">
                Sri Lanka, renowned as the island of spices, is home to Zest
                Ceylon—your ultimate online destination for premium Sri Lankan
                spices. Whether you’re seeking bold, aromatic flavors or stocking
                up in bulk, Zest Ceylon brings you a rich selection of both
                organic and conventional spices, all in one place. As one of the
                country’s leading wholesale spice suppliers, we’re proud to offer
                top-quality herbs, spices, and culinary ingredients at the best
                prices. Taste the essence of Sri Lanka—pure, fresh, and full of
                zest.
              </p>
            </div>

            <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
              <div className="w-full md:max-w-lg rounded-xl overflow-hidden shadow-lg">
                <img
                  src="/images/all.jpg"
                  alt="spice"
                  className="w-full h-auto object-cover block"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Second Section */}
      <section
        ref={secondSectionRef}
        className="w-full bg-[rgb(204,235,173)] flex flex-col justify-center py-8"
      >
        <div className="max-w-7xl mx-auto px-6">
          <h2
            className={`text-2xl md:text-3xl font-semibold text-[rgb(78,98,57)] text-center font-serif mb-4 slide-in-left ${
              secondVisible ? "in-view" : ""
            }`}
          >
            NET SPICE'S - beyond tradition
          </h2>

          <div
            className={`flex items-center justify-center mb-6 gap-4 slide-in-up ${
              secondVisible ? "in-view" : ""
            }`}
          >
            <div className="w-20 h-px bg-gray-400"></div>
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
            <div className="w-20 h-px bg-gray-400"></div>
          </div>

          <p
            className={`mt-6 text-center text-gray-600 slide-in-right ${
              secondVisible ? "in-view" : ""
            }`}
          >
            “From the heart of Ceylon to your table — Net Spices Ceylon delivers
            nature’s finest treasures with care <br />
            – Experience the richness of tradition, every sip and every
            sprinkle.”
          </p>
        </div>
      </section>

      {/* Third Section */}
      <section className="w-full bg-white py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10">
            {/* Left Card */}
            <div
              ref={thirdLeftRef}
              className="w-full md:w-[48%] border shadow-sm border-gray-300 rounded-lg overflow-hidden slide-left"
            >
              <img
                src="/images/cin.jpg"
                alt=""
                className="w-full h-auto md:h-[350px] object-cover"
              />
              <h2 className="text-2xl md:text-3xl font-semibold text-[rgb(80,70,1)] px-5 py-5 text-left">
                SEE HOW IT PROCESSED
              </h2>
              <p className="mt-6 italic text-justify text-gray-600 px-6 pb-6">
                Handpicked at dawn, only the finest Cinnamon are carefully plucked
                by skilled hands in Sri Lanka’s lush highlands. These tender leaves
                are quickly transported to the factory, where they undergo expert
                withering, rolling, oxidation, and drying processes to preserve
                their rich flavor and aroma. Once perfected, the tea is
                meticulously sorted, graded, and packaged with care, to deliver the
                pure taste of Ceylon to the world.
              </p>
            </div>

            {/* Right Card */}
            <div
              ref={thirdRightRef}
              className="w-full md:w-[48%] border shadow-sm border-gray-300 rounded-lg overflow-hidden slide-right"
            >
              <img
                src="/images/tu.jpg"
                alt=""
                className="w-full h-auto md:h-[350px] object-cover"
              />
              <h2 className="text-2xl md:text-3xl font-semibold text-[rgb(80,70,1)] px-5 py-5 text-left">
                SPECIALITY OF CEYLON SPICES
              </h2>
              <p className="mt-6 italic text-justify text-gray-600 px-6 pb-6">
                Ceylon spices, including pepper and cinnamon, are renowned for their
                exceptional quality and unique flavor profiles. Ceylon pepper is
                aromatic and mild, adding depth to dishes without overwhelming the
                taste. Ceylon cinnamon, known as “true cinnamon,” has a delicate,
                sweet flavor, distinct from its stronger counterpart, Cassia. These
                spices are harvested from Sri Lanka’s fertile lands and are integral
                to the island’s rich culinary and cultural heritage.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
