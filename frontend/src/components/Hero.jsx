import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const [services, setServices] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const navigate = useNavigate();

  // Fetch services
  const fetchServices = async () => {
    try {
      setLoadingServices(true);
      const res = await axios.get("http://localhost:5000/api/services");
      setServices(res.data);
    } catch (err) {
      console.error("Failed to fetch services:", err);
    } finally {
      setLoadingServices(false);
    }
  };

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      setLoadingBlogs(true);
      const res = await axios.get("http://localhost:5000/api/blogs");
      // Sort blogs by date descending
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
<section className="py-12 px-4 sm:px-6 md:px-20 text-center">
  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#4b2e05] mb-8 tracking-wide">
    Services
  </h2>

<<<<<<< HEAD
        <div className="grid md:grid-cols-3 gap-8 bg-[#f7f7f7] p-8 rounded-lg">
          {loadingServices ? (
            <p className="text-center col-span-3">Loading services...</p>
          ) : services.length === 0 ? (
            <p className="text-center col-span-3">No services available.</p>
          ) : (
            services.map((service) => (
              <div
                key={service.id}
                className="flex flex-col items-center text-center"
              >
                <img
                  src={`http://localhost:5000${service.image}`}
                  alt={service.title}
                  className="w-full h-56 object-cover"
                />
                <h3 className="font-semibold text-lg mt-4 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm mb-4 max-w-xs mx-auto text-gray-700">
                  {service.description}
                </p>
                <button
  onClick={() => navigate("/about")}
  className="bg-[#4b2e05] text-white px-5 py-2 text-sm rounded font-semibold tracking-wide hover:bg-[#3a2404]"
>
  LEARN MORE
</button>

              </div>
            ))
          )}
        </div>
      </section>

      {/* OUR PROMISE SECTION */}
      <section className="relative py-16 px-6 md:px-40">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-90 opacity-80"
          style={{
            backgroundImage: "url('/simple.jpg')",
          }}
        ></div>

        <div className="absolute inset-0 bg-white/70"></div>

        <div className="relative grid md:grid-cols-2 gap-10 items-center z-10">
          <div className="overflow-hidden rounded-lg">
            <img
              src="/all.jpg"
              alt="Our Promise"
              className="w-[500px] h-auto object-cover"
            />
          </div>

          <div className="p-4 md:p-10">
            <h2 className="text-4xl font-extrabold text-[#5c3601] mb-6">
              Our Promise
            </h2>
            <p className="text-[#3d2d11] mb-4 leading-relaxed text-[16px]">
              At Net Spice’s, our promise is to deliver nature's purest treasures,
              cultivated with care, crafted with integrity, and shared with pride.
              We honor centuries of Sri Lankan heritage, working hand-in-hand with
              local farmers to bring you products of unmatched purity,
              authenticity, and excellence.
            </p>
            <p className="text-[#3d2d11] leading-relaxed text-[16px]">
              From sustainable sourcing to artisanal craftsmanship, every detail
              reflects our deep respect for nature and our commitment to offering
              you only the finest.
            </p>
          </div>
        </div>
      </section>
=======
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 bg-[#f7f7f7] p-6 sm:p-8 rounded-lg">
    {/* Card 1 */}
    <div className="flex flex-col items-center text-center bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <img
        src="/1.webp"
        alt="Steam Sterilization"
        className="w-full h-40 sm:h-48 md:h-56 object-cover rounded-md"
      />
      <h3 className="font-semibold text-base sm:text-lg mt-3 mb-2 text-[#4b2e05]">
        Steam Sterilization
      </h3>
      <p className="text-xs sm:text-sm mb-3 sm:mb-4 max-w-xs mx-auto text-gray-700">
        SAFESTERIL EU Patented Technology for safe & efficient
        sterilization whilst safeguarding Volatile oils.
      </p>
      <button className="bg-[#4b2e05] text-white px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm rounded font-semibold tracking-wide hover:bg-[#3a2404] transition-all">
        LEARN MORE
      </button>
    </div>

    {/* Card 2 */}
    <div className="flex flex-col items-center text-center bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <img
        src="/6webp.webp"
        alt="Fine Grinding"
        className="w-full h-40 sm:h-48 md:h-56 object-cover rounded-md"
      />
      <h3 className="font-semibold text-base sm:text-lg mt-3 mb-2 text-[#4b2e05]">
        Fine Grinding
      </h3>
      <p className="text-xs sm:text-sm mb-3 sm:mb-4 max-w-xs mx-auto text-gray-700">
        Offering a wide range of fine powdering solutions (60–2500 Mesh size)
      </p>
      <button className="bg-[#4b2e05] text-white px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm rounded font-semibold tracking-wide hover:bg-[#3a2404] transition-all">
        LEARN MORE
      </button>
    </div>

    {/* Card 3 */}
    <div className="flex flex-col items-center text-center bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <img
        src="/2.webp"
        alt="Pre Cutting"
        className="w-full h-40 sm:h-48 md:h-56 object-cover rounded-md"
      />
      <h3 className="font-semibold text-base sm:text-lg mt-3 mb-2 text-[#4b2e05]">
        Pre Cutting
      </h3>
      <p className="text-xs sm:text-sm mb-3 sm:mb-4 max-w-xs mx-auto text-gray-700">
        Offering a wide range of granular sizes (0.5mm–20mm) with high yields.
      </p>
      <button className="bg-[#4b2e05] text-white px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm rounded font-semibold tracking-wide hover:bg-[#3a2404] transition-all">
        LEARN MORE
      </button>
    </div>
  </div>
</section>

>>>>>>> 8b0c90a1a15859ebde0a84d0c95c9d51535a03b7

      {/* OUR BLOG SECTION */}
      <section className="py-16 px-6 md:px-20 text-center">
        <h2 className="text-4xl font-extrabold text-[#4b2e05] mb-10">
          Our Blog
        </h2>

        <div className="grid md:grid-cols-3 gap-8 bg-[#f7f7f7] p-8 rounded-lg">
          {loadingBlogs ? (
            <p className="text-center col-span-3">Loading blogs...</p>
          ) : blogs.length === 0 ? (
            <p className="text-center col-span-3">No blogs available.</p>
          ) : (
            blogs.map((blog) => (
              <div
                key={blog.id}
                className="relative rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  src={`http://localhost:5000${blog.image}`}
                  alt={blog.title}
                  className="w-full h-96 object-cover"
                />

<<<<<<< HEAD
                {/* Date Tag */}
                <div className="absolute top-4 left-4 bg-white text-[#4b2e05] px-4 py-2 font-bold rounded text-sm leading-tight">
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
    className="bg-[#875535] hover:bg-[#c5a24f] text-white font-semibold text-[14px] px-8 py-2 rounded-lg shadow-md transition-all"
  >
    {blog.category.toUpperCase()}
  </button>
</div>


                {/* Bottom Overlay */}
                <div className="absolute bottom-0 w-full text-white p-4 text-center">
                  <h3 className="text-lg font-semibold uppercase tracking-wide line-clamp-2">
                    {blog.title.toUpperCase()}
                  </h3>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
=======
  {/* Content (in front of background) */}
 <div className="relative grid md:grid-cols-2 gap-10 items-center z-10">
  <div className="overflow-hidden rounded-lg flex justify-center">
    <img
      src="/all.jpg"
      alt="Our Promise"
      className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] h-auto object-cover rounded-lg"
    />
  </div>

   <div className="p-4 sm:p-6 md:p-10">
  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#5c3601] mb-6 text-center md:text-left">
    Our Promise
  </h2>

  <p className="text-[#3d2d11] mb-4 leading-relaxed text-justify text-xs sm:text-sm md:text-base">
    At Net Spice’s, our promise is to deliver nature's purest treasures,
    cultivated with care, crafted with integrity, and shared with pride.
    We honor centuries of Sri Lankan heritage, working hand-in-hand with
    local farmers to bring you products of unmatched purity,
    authenticity, and excellence.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ipsum suscipit, quo voluptatibus repellat similique quisquam animi libero ratione minima cupiditate consequuntur optio ut aliquid eveniet laboriosam debitis fuga vel.
  </p>

  <p className="text-[#3d2d11] leading-relaxed text-justify text-xs sm:text-sm md:text-base">
    From sustainable sourcing to artisanal craftsmanship, every detail
    reflects our deep respect for nature and our commitment to offering
    you only the finest.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio doloribus assumenda quaerat minima suscipit molestiae laboriosam ad animi odit officia fuga sapiente accusantium deserunt, delectus voluptates. Reiciendis voluptatibus minus at.
  </p>
</div>

  </div>
</section>


        {/* OUR BLOG SECTION */}
<section className="py-16 px-6 md:px-20 text-center">
  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#4b2e05] mb-10">
    Our Blog
  </h2>

  <div className="grid md:grid-cols-3 gap-8 bg-[#f7f7f7] p-8 rounded-lg">
    {/* Blog 1 */}
    <div className="relative rounded-lg overflow-hidden shadow-lg">
      <img
        src="/4.jpg"
        alt="A Tale of Spices"
        className="w-full h-56 sm:h-64 md:h-96 object-cover"
      />

      {/* Date Tag */}
      <div className="absolute top-4 left-4 bg-white text-[#4b2e05] px-4 py-2 font-bold rounded text-sm leading-tight">
        02<br />OCT
      </div>

      {/* Center Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <button className="bg-[#875535] hover:bg-[#c5a24f] text-white font-semibold text-[12px] sm:text-[13px] md:text-[14px] px-5 sm:px-6 md:px-8 py-2 rounded-lg shadow-md transition-all">
          CEYLON SPICES, HERBS AND SPICES
        </button>
      </div>

      {/* Bottom Overlay */}
      <div className="absolute bottom-0 w-full text-white p-3 md:p-4 text-center">
        <h3 className="text-sm sm:text-base md:text-lg font-semibold uppercase tracking-wide">
          A TALE OF SPICES
        </h3>
      </div>
    </div>

    {/* Blog 2 */}
    <div className="relative rounded-lg overflow-hidden shadow-lg">
      <img
        src="/6.jpg"
        alt="Spice for Health"
        className="w-full h-56 sm:h-64 md:h-96 object-cover"
      />

      <div className="absolute top-4 left-4 bg-white text-[#4b2e05] px-4 py-2 font-bold rounded text-sm leading-tight">
        02<br />OCT
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <button className="bg-[#875535] hover:bg-[#c5a24f] text-white font-semibold text-[12px] sm:text-[13px] md:text-[14px] px-5 sm:px-6 md:px-8 py-2 rounded-lg shadow-md transition-all">
          HERBS AND SPICES
        </button>
      </div>

      <div className="absolute bottom-0 w-full text-white p-3 md:p-4 text-center">
        <h3 className="text-sm sm:text-base md:text-lg font-semibold uppercase tracking-wide">
          SPICE FOR HEALTH
        </h3>
      </div>
    </div>

    {/* Blog 3 */}
    <div className="relative rounded-lg overflow-hidden shadow-lg">
      <img
        src="/cinbg.jpg"
        alt="Ceylon Cinnamon"
        className="w-full h-56 sm:h-64 md:h-96 object-cover"
      />

      <div className="absolute top-4 left-4 bg-white text-[#4b2e05] px-4 py-2 font-bold rounded text-sm leading-tight">
        02<br />OCT
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <button className="bg-[#875535] hover:bg-[#c5a24f] text-white font-semibold text-[12px] sm:text-[13px] md:text-[14px] px-5 sm:px-6 md:px-8 py-2 rounded-lg shadow-md transition-all">
          CEYLON SPICES, CINNAMON
        </button>
      </div>

      <div className="absolute bottom-0 w-full text-white p-3 md:p-4 text-center">
        <h3 className="text-sm sm:text-base md:text-lg font-semibold uppercase tracking-wide">
          CEYLON CINNAMON
        </h3>
      </div>
    </div>
  </div>
</section>



>>>>>>> 8b0c90a1a15859ebde0a84d0c95c9d51535a03b7
    </div>
  );
}  