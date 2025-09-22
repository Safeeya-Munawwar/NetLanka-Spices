import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../styles.css';

// import required modules
import { Autoplay } from 'swiper/modules';

export default function ImageSlider() {
  return (
    <div className="w-full">
      <Swiper
        spaceBetween={20} // smaller space for mobile
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay]}
        className="mySwiper w-full"
      >
        <SwiperSlide>
          <img
            src="/images/5.jpg"
            alt="1"
            className="w-full h-auto sm:h-80 md:h-[400px] object-cover rounded-lg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/images/6.jpg"
            alt="2"
            className="w-full h-auto sm:h-80 md:h-[400px] object-cover rounded-lg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/images/4.jpg"
            alt="3"
            className="w-full h-auto sm:h-80 md:h-[400px] object-cover rounded-lg"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
