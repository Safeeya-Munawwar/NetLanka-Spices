import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "../styles.css";

import { Autoplay } from "swiper/modules";

export default function ImageSlider() {
  return (
    <div className="relative w-full flex justify-center mt-6 sm:mt-10">
      <Swiper
        spaceBetween={20}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        // ❌ removed pagination & navigation
        modules={[Autoplay]}
        className="mySwiper w-full max-w-lg sm:max-w-xl md:max-w-2xl"
      >
        <SwiperSlide className="flex justify-center">
          <img
            src="/5.jpg"
            alt="1"
            className="w-[90%] sm:w-[85%] md:w-[80%] h-44 sm:h-60 md:h-[400px] object-cover rounded-lg shadow"
          />
        </SwiperSlide>

        <SwiperSlide className="flex justify-center">
          <img
            src="/6.jpg"
            alt="2"
            className="w-[90%] sm:w-[85%] md:w-[80%] h-44 sm:h-60 md:h-[400px] object-cover rounded-lg shadow"
          />
        </SwiperSlide>

        <SwiperSlide className="flex justify-center">
          <img
            src="/4.jpg"
            alt="3"
            className="w-[90%] sm:w-[85%] md:w-[80%] h-44 sm:h-60 md:h-[400px] object-cover rounded-lg shadow"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
