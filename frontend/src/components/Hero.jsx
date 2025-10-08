import React from "react";


export default function Hero() {
  return (
    <div className="bg-white text-gray-800">
      {/* SERVICES SECTION */}
      <section className="py-16 px-6 md:px-20 text-center">
        <h2 className="text-4xl font-extrabold text-[#4b2e05] mb-10 tracking-wide">
          Services
        </h2>

        <div className="grid md:grid-cols-3 gap-8 bg-[#f7f7f7] p-8 rounded-lg">
          {/* Card 1 */}
          <div className="flex flex-col items-center text-center">
            <img
              src="/1.webp"
              alt="Steam Sterilization"
              className="w-full h-56 object-cover"
            />
            <h3 className="font-semibold text-lg mt-4 mb-2">
              Steam Sterilization
            </h3>
            <p className="text-sm mb-4 max-w-xs mx-auto text-gray-700">
              SAFESTERIL EU Patented Technology for safe & efficient
              sterilization whilst safeguarding Volatile oils.
            </p>
            <button className="bg-[#4b2e05] text-white px-5 py-2 text-sm rounded font-semibold tracking-wide hover:bg-[#3a2404]">
              LEARN MORE
            </button>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center text-center">
            <img
              src="/6webp.webp"
              alt="Fine Grinding"
              className="w-full h-56 object-cover"
            />
            <h3 className="font-semibold text-lg mt-4 mb-2">Fine Grinding</h3>
            <p className="text-sm mb-4 max-w-xs mx-auto text-gray-700">
              Offering a wide range of fine powdering solutions (60–2500 Mesh size)
            </p>
            <button className="bg-[#4b2e05] text-white px-5 py-2 text-sm rounded font-semibold tracking-wide hover:bg-[#3a2404]">
              LEARN MORE
            </button>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center text-center">
            <img
              src="/2.webp"
              alt="Pre Cutting"
              className="w-full h-56 object-cover"
            />
            <h3 className="font-semibold text-lg mt-4 mb-2">Pre Cutting</h3>
            <p className="text-sm mb-4 max-w-xs mx-auto text-gray-700">
              Offering a wide range of granular sizes (0.5mm–20mm) with high yields.
            </p>
            <button className="bg-[#4b2e05] text-white px-5 py-2 text-sm rounded font-semibold tracking-wide hover:bg-[#3a2404]">
              LEARN MORE
            </button>
          </div>
        </div>
      </section>

     {/* OUR PROMISE SECTION */}
<section className="relative py-16 px-6 md:px-40">
  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-90 opacity-80"
    style={{
      backgroundImage: "url('/simple.jpg')",
    }}
  ></div>

  {/* Transparent Overlay for smooth look */}
  <div className="absolute inset-0 bg-white/70"></div>

  {/* Content (in front of background) */}
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
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ipsum suscipit, quo voluptatibus repellat similique quisquam animi libero ratione minima cupiditate consequuntur optio ut aliquid eveniet laboriosam debitis fuga vel.
      </p>
      <p className="text-[#3d2d11] leading-relaxed text-[16px]">
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
  <h2 className="text-4xl font-extrabold text-[#4b2e05] mb-10">
    Our Blog
  </h2>

  <div className="grid md:grid-cols-3 gap-8 bg-[#f7f7f7] p-8 rounded-lg">
    {/* Blog 1 */}
    <div className="relative rounded-lg overflow-hidden shadow-lg">
      <img
        src="/4.jpg"
        alt="A Tale of Spices"
        className="w-full h-96 object-cover"
      />

      {/* Date Tag */}
      <div className="absolute top-4 left-4 bg-white text-[#4b2e05] px-4 py-2 font-bold rounded text-sm leading-tight">
        02<br />OCT
      </div>

      {/* Center Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <button className="bg-[#875535] hover:bg-[#c5a24f] text-white font-semibold text-[14px] px-8 py-2 rounded-lg  shadow-md transition-all">
          CEYLON SPICES, HERBS AND SPICES
        </button>
      </div>

      {/* Bottom Overlay */}
      <div className="absolute bottom-0 w-full text-white p-4 text-center">
        <h3 className="text-lg font-semibold uppercase tracking-wide">
          A TALE OF SPICES
        </h3>
      </div>
    </div>

    {/* Blog 2 */}
    <div className="relative rounded-lg overflow-hidden shadow-lg">
      <img
        src="/6.jpg"
        alt="Spice for Health"
        className="w-full h-96 object-cover"
      />

      <div className="absolute top-4 left-4 bg-white text-[#4b2e05] px-4 py-2 font-bold rounded text-sm leading-tight">
        02<br />OCT
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <button className="bg-[#875535] hover:bg-[#c5a24f] text-white font-semibold text-[14px] px-8 py-2 rounded-lg  shadow-md transition-all">
          HERBS AND SPICES
        </button>
      </div>

      <div className="absolute bottom-0 w-full  text-white p-4 text-center">
        <h3 className="text-lg font-semibold uppercase tracking-wide">
          SPICE FOR HEALTH
        </h3>
      </div>
    </div>

    {/* Blog 3 */}
    <div className="relative rounded-lg overflow-hidden shadow-lg">
      <img
        src="/cinbg.jpg"
        alt="Ceylon Cinnamon"
        className="w-full h-96 object-cover"
      />

      <div className="absolute top-4 left-4 bg-white text-[#4b2e05] px-4 py-2 font-bold rounded text-sm leading-tight">
        02<br />OCT
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <button className="bg-[#875535] hover:bg-[#c5a24f] text-white font-semibold text-[14px] px-8 py-2 rounded-lg shadow-md transition-all">
          CEYLON SPICES, CINNAMON
        </button>
      </div>

      <div className="absolute bottom-0 w-full  text-white p-4 text-center">
        <h3 className="text-lg font-semibold uppercase tracking-wide">
          CEYLON CINNAMON
        </h3>
      </div>
    </div>
  </div>
</section>


    </div>
  );
}
