import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";

export default function ProductsSection() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        const allProducts = res.data;
        const featured = allProducts.sort(() => 0.5 - Math.random()).slice(0, 6);
        setProducts(featured);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="w-full bg-white py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h1 className="font-serif text-[#B59D56] text-xl italic mb-2 text-left">
          Net Spice's
        </h1>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#3A1F04] mb-10 text-left tracking-wide">
          FEATURED PRODUCTS
        </h2>

        {/* Swiper Carousel */}
        <div className="relative py-5">
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            modules={[Navigation, Autoplay]}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-14"
          >
            {products.map((p) => (
              <SwiperSlide key={p.id}>
                <div
                  className="border border-gray-300 rounded-sm shadow-sm hover:shadow-md transition-all duration-300 bg-white h-[360px] flex flex-col items-center justify-center p-6 cursor-pointer"
                >
                  {/* Circle image */}
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                    <img
                      src={p.image || "/images/default.jpg"}
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Category */}
                  <p className="italic text-gray-700 text-[15px] mb-1">
                    {p.category?.title || "Category"}
                  </p>

                  {/* Title - clickable to view details */}
                 <h3
  className="font-bold text-[#3A1F04] text-lg mb-1 hover:text-[#B59D56] hover:underline transition-all duration-200 cursor-pointer"
  onClick={() => navigate(`/products/${p.id}`)}
>
  {p.title}
</h3>


                  {/* Price */}
                  <p className="font-extrabold text-black text-[17px]">
                    Rs.{p.price}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom arrows */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button className="custom-prev border border-[#B59D56] text-[#B59D56] w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#B59D56] hover:text-white transition-colors duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button className="custom-next border border-[#B59D56] text-[#B59D56] w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#B59D56] hover:text-white transition-colors duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}