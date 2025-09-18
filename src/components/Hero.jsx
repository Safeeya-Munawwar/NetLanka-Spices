import React from "react";

export default function Hero() {
  return (
<div className="">
      <section className="w-full h-[550px] bg-gray-200 py-12 mt-5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Layout: stack on small, side-by-side on md+ */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
          {/* Left text column */}
          <div className="md:w-1/2">
            <h1 className="font-serif mt-10 text-yellow-800 mb-3 text-left text-xl">
              Net Spice's
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold mt-3 text-green-800 text-left">
              ALL SPICES AT ONE PLACE
            </h2>

            <p className="mt-7 text-justify text-gray-700 ">
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

          {/* Right image column */}
          <div className="md:w-1/2 flex justify-end mt-10"> 
            {/* justify-end pushes the image to the right edge of the column (reduces left gap) */}
            <div className="w-full md:max-w-lg rounded-xl overflow-hidden shadow-lg">
              {/* wrapper with rounded + overflow-hidden ensures the corners are clipped */}
              <img
                src="/all.jpg"
                alt="spice"
                className="w-full h-[380px] md:h-[380px] object-cover block"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="w-full h-[250px] bg-[rgb(204,235,173)] ">
     <div className=" py-11">
   <h2 className="text-2xl md:text-3xl font-semibold text-[rgb(78,98,57)]  text-center font-serif">
            NET SPICE'S - beyond tradition
            </h2>
            <br />
            <p className="mt-6 font-italic text-center text-gray-600 ">“From the heart of Ceylon to your table — Net Spices Ceylon delivers nature’s finest treasures with care 
              <br />– Experience the richness of tradition, 
              every sip and every sprinkle.”</p>
</div>
    </section>

    <section className=" w-full h-[800px] bg-white">
      <div className="">
      <div className="max-w-7xl mx-auto px-6">
     <div className="flex items-center justify-between gap-10 mt-14">
        
          <div className="w-[700px] h-[650px] border shadow-sm border-gray-300 rounded-lg ">
               <img
                src='/cin.jpg'
                alt=''
                className="w-full h-[350px] object-cover"
              />
            <h2 className="text-2xl md:text-3xl font-semibold text-[rgb(80,70,1)] px-5 py-5  text-left">
            SEE HOW IT PROCESSED
            </h2>
            <p className="mt-6 font-italic text-justify text-gray-600 px-6">Handpicked at dawn, only the finest Cinnamon are carefully plucked by skilled hands in Sri Lanka’s lush highlands. These tender leaves are quickly transported to the factory, where they undergo expert withering, rolling, oxidation, and drying processes to preserve their rich flavor and aroma. Once perfected, the tea is meticulously sorted, graded, and packaged with care, to deliver the pure taste of Ceylon to the world.</p>
          </div>
         
          
          <div className="border  border-gray-300 shadow-sm w-[700px] h-[650px] rounded-lg ">
               <img
                src='/tu.jpg'
                alt=''
                className="w-full h-[350px] object-cover"
              />
            <h2 className="text-2xl md:text-3xl font-semibold text-[rgb(80,70,1)] px-5 py-5  text-left">
              SPECIALITY OF CEYLON SPICES
            </h2>
            <p className="mt-6 font-italic text-justify text-gray-600 px-6">
              Ceylon spices, including pepper and cinnamon, are renowned for their exceptional quality and unique flavor profiles. Ceylon pepper is aromatic and mild, adding depth to dishes without overwhelming the taste. Ceylon cinnamon, known as “true cinnamon,” has a delicate, sweet flavor, distinct from its stronger counterpart, Cassia. These spices are harvested from Sri Lanka’s fertile lands and are integral to the island’s rich culinary and cultural heritage.
            </p>
          </div>
</div>
</div>
     </div>
  
    </section>
</div>
  );
}