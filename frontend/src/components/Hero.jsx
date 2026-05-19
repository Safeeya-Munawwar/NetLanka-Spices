import React, { useState, useEffect } from "react";
import axiosInstance from "../../src/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const [services, setServices] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const navigate = useNavigate();

  const fetchServices = async () => {
    try {
      setLoadingServices(true);
      const res = await axiosInstance.get("/services");
      setServices(res.data);
    } catch (err) {
      console.error("Failed to fetch services:", err);
    } finally {
      setLoadingServices(false);
    }
  };

  const fetchBlogs = async () => {
    try {
      setLoadingBlogs(true);
      const res = await axiosInstance.get("/blogs");
      const sorted = res.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setBlogs(sorted);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    } finally {
      setLoadingBlogs(false);
    }
  };

  useEffect(() => {
    fetchServices();
    fetchBlogs();
  }, []);

  return (
    <div className="bg-white text-gray-800">
      {/* SERVICES SECTION */}
      <section className="py-12 px-4 sm:px-6 md:px-12 max-w-[90rem] mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#4b2e05] mb-8 tracking-wide">
          Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center bg-[#f7f7f7] py-6 px-4 sm:px-6 md:px-12 rounded-lg">
          {loadingServices ? (
            <p className="text-center col-span-3">Loading services...</p>
          ) : services.length === 0 ? (
            <p className="text-center col-span-3">No services available.</p>
          ) : (
            services.map((service) => (
              <div
                key={service.id}
                className="flex flex-col items-center text-center bg-white rounded-lg shadow-sm p-3 sm:p-4 w-full max-w-[350px]"
              >
                <img
                  src={`${process.env.REACT_APP_API_URL.replace("/api", "")}${
                    service.image
                  }`}
                  alt={service.title}
                  className="w-full h-32 sm:h-36 md:h-40 object-cover rounded-md"
                />
                <h3 className="font-semibold text-lg mt-2 mb-1 text-[#4b2e05]">
                  {service.title}
                </h3>
                <p className="text-sm mb-2 sm:mb-3 max-w-xs mx-auto text-gray-700">
                  {service.description}
                </p>
                <button
                  onClick={() => navigate("/about")}
                  className="bg-[#4b2e05] text-white px-3 sm:px-4 py-1.5 sm:py-2 text-sm rounded font-semibold tracking-wide hover:bg-[#3a2404] transition-all"
                >
                  LEARN MORE
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* OUR PROMISE SECTION */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6 md:px-12 max-w-8xl mx-auto">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-90 opacity-80"
          style={{ backgroundImage: "url('/simple.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-white/70"></div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center z-10 justify-items-center">
          <div className="overflow-hidden rounded-lg flex justify-center">
            <img
              src="/all.jpg"
              alt="Our Promise"
              className="w-full max-w-[250px] sm:max-w-[350px] md:max-w-[400px] h-auto object-cover rounded-lg"
            />
          </div>
          <div className="p-4 sm:p-6 md:p-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#5c3601] mb-4 sm:mb-6">
              Our Promise
            </h2>
            <p className="text-[#3d2d11] mb-3 sm:mb-4 leading-relaxed text-[14px] sm:text-[16px] text-justify">
              At Net Spice’s, our promise is to deliver nature's purest
              treasures, cultivated with care, crafted with integrity, and
              shared with pride. We honor centuries of Sri Lankan heritage,
              working hand-in-hand with local farmers to bring you products of
              unmatched purity, authenticity, and excellence.
            </p>
            <p className="text-[#3d2d11] leading-relaxed text-[14px] sm:text-[16px] text-justify">
              From sustainable sourcing to artisanal craftsmanship, every detail
              reflects our deep respect for nature and our commitment to
              offering you only the finest.
            </p>
          </div>
        </div>
      </section>

      {/* OUR BLOG SECTION */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 md:px-12 max-w-[90rem] mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#4b2e05] mb-8">
          Our Blog
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center bg-[#f7f7f7] p-4 sm:p-6 md:p-8 rounded-lg">
          {loadingBlogs ? (
            <p className="text-center col-span-3">Loading blogs...</p>
          ) : blogs.length === 0 ? (
            <p className="text-center col-span-3">No blogs available.</p>
          ) : (
            blogs.map((blog) => (
              <div
                key={blog.id}
                className="relative rounded-lg overflow-hidden shadow-lg w-full max-w-[350px]"
              >
                <img
                  src={`${process.env.REACT_APP_API_URL.replace("/api", "")}${
                    blog.image
                  }`}
                  alt={blog.title}
                  className="w-full h-48 sm:h-64 md:h-72 lg:h-80 object-cover"
                />
                {/* Date Tag */}
                <div className="absolute top-2 left-2 bg-white text-[#4b2e05] px-2 py-1 font-bold rounded text-xs sm:text-sm leading-tight">
                  {new Date(blog.date).getDate()}
                  <br />
                  {new Date(blog.date)
                    .toLocaleString("default", { month: "short" })
                    .toUpperCase()}
                </div>
                {/* Center Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => navigate(`/categories`)}
                    className="bg-[#875535] hover:bg-[#c5a24f] text-white font-semibold text-[12px] sm:text-[14px] px-3 sm:px-6 py-1 sm:py-2 rounded-lg shadow-md transition-all"
                  >
                    {blog.category.toUpperCase()}
                  </button>
                </div>
                {/* Bottom Overlay */}
                <div className="absolute bottom-0 w-full text-white p-2 sm:p-4 text-center bg-black/30">
                  <h3 className="text-sm sm:text-base font-semibold uppercase tracking-wide line-clamp-2">
                    {blog.title.toUpperCase()}
                  </h3>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
