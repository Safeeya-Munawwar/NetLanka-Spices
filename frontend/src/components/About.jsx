import React, { useEffect, useRef, useState } from "react";

export default function About() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const storyLeftRef = useRef(null);
  const storyRightRef = useRef(null);
  const [leftVisible, setLeftVisible] = useState(false);
  const [rightVisible, setRightVisible] = useState(false);
  const [storyLeftVisible, setStoryLeftVisible] = useState(false);
  const [storyRightVisible, setStoryRightVisible] = useState(false);

  useEffect(() => {
    const observerOptions = { threshold: 0.3 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const target = entry.target;
        const isIntersecting = entry.isIntersecting;
        if (target === leftRef.current) setLeftVisible(isIntersecting);
        if (target === rightRef.current) setRightVisible(isIntersecting);
        if (target === storyLeftRef.current)
          setStoryLeftVisible(isIntersecting);
        if (target === storyRightRef.current)
          setStoryRightVisible(isIntersecting);
      });
    }, observerOptions);
    [leftRef, rightRef, storyLeftRef, storyRightRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      [leftRef, rightRef, storyLeftRef, storyRightRef].forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section
        className="w-full h-[400px] sm:h-[500px] md:h-[600px] bg-center bg-cover bg-no-repeat bg-fixed flex flex-col justify-center items-center"
        style={{ backgroundImage: "url('/images/cinbg.jpg')" }}
      >
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold">
          ABOUT US
        </h1>
        <p className="text-white mt-2 sm:mt-4 text-sm sm:text-base md:text-lg font-extralight">
          The journey of a best spice's exporter
        </p>
      </section>
      {/* WHO WE ARE Section */}
      <section className="w-full bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div
            ref={leftRef}
            className={`w-full md:w-1/2 transition-opacity duration-700 ease-in-out ${
              leftVisible ? "animate-slide-in-left" : "opacity-0"
            }`}
          >
            <h2 className="text-yellow-800 font-semibold text-lg mb-2">
              Introduction
            </h2>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">WHO WE ARE</h1>
            <p className="text-gray-700 text-justify leading-relaxed mb-4 text-sm sm:text-base">
              Net Spice's (Pvt) Ltd. is a leading exporter of premium True
              Ceylon Cinnamon, high-quality spices, and essential oils from Sri
              Lanka...
            </p>
            <p className="text-gray-700 text-justify leading-relaxed mb-4 text-sm sm:text-base">
              Our range includes cinnamon, black pepper, cloves, nutmeg, mace,
              turmeric, lemongrass, and more...
            </p>
            <p className="text-gray-700 text-justify leading-relaxed text-sm sm:text-base">
              We specialize in essential oils such as cinnamon bark oil,
              citronella oil, clove oil, and more.
            </p>
          </div>
          {/* Right Image */}
          <div
            ref={rightRef}
            className={`w-full md:w-1/2 transition-opacity duration-700 ease-in-out ${
              rightVisible ? "animate-slide-in-right" : "opacity-0"
            }`}
          >
            <img
              src="/images/all1.jpg"
              alt="About spices"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>
      {/* OUR STORY Section */}
      <section className="bg-[#f7f2e9] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-yellow-800 font-semibold text-lg mb-2">
            A Journey to Remember
          </h2>
          <h1 className="text-3xl sm:text-4xl font-bold mb-12">OUR STORY</h1>
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Image */}
            <div
              ref={storyLeftRef}
              className={`w-full md:w-1/2 transition-opacity duration-700 ease-in-out ${
                storyLeftVisible ? "animate-slide-in-left" : "opacity-0"
              }`}
            >
              <img
                src="/images/all2.jpg"
                alt="Cinnamon bundle"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
            {/* Text */}
            <div
              ref={storyRightRef}
              className={`w-full md:w-1/2 text-gray-700 transition-opacity duration-700 ease-in-out ${
                storyRightVisible ? "animate-slide-in-right" : "opacity-0"
              }`}
            >
              <p className="italic mb-4 text-sm sm:text-base text-justify">
                The journey of Mr. Abeywardena began in 1998 with a small spice
                collection store in Makandura, a town in Sri Lanka’s Southern
                district. Over time, a strong reputation for quality and
                reliability led to the expansion of the business into a
                prominent cinnamon collector.
              </p>
              <p className="italic mb-4 text-sm sm:text-base text-justify">
                With the establishment of a major cinnamon collection center in
                Makandura, the company was able to source the finest cinnamon
                from various regions of Sri Lanka. As operations grew,
                additional collection and processing facilities were introduced,
                strengthening the supply chain and ensuring premium quality.
              </p>
              <p className="italic text-sm sm:text-base text-justify">
                Committed to excellence, the company upholds the highest
                standards in the industry. With globally recognized
                certifications such as FDA, USDA Organic, EU Organic, Kosher,
                GMP, ISO:9001, ISO:22000, and BRC Food, it continues to deliver
                high-quality cinnamon and spices to customers worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
