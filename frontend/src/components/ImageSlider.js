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
    <>
      <Swiper
        spaceBetween={30}
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
        className="mySwiper"
      >
        <SwiperSlide>
            <img src="/images/5.jpg" alt="1" className='rounded-lg' />
        </SwiperSlide>
        <SwiperSlide>
            <img src="/images/6.jpg" alt="2" className='rounded-lg'/>
        </SwiperSlide>
        <SwiperSlide>
            <img src="/images/4.jpg" alt="3" className='rounded-lg' />
        </SwiperSlide>
       
      </Swiper>
    </>
  );
}