import React from "react";

export default function Products() {
  const products = [
    {
      id: 1,
      category: "Herbs",
      title: "Belimal Tea",
      price: "$4,000.00",
      img: "/images/belimal.jpg",
    },
    {
      id: 2,
      category: "Spices",
      title: "Cinnamon Powder",
      price: "$4,000.00",
      img: "/images/11.jpg",
    },
    {
      id: 3,
      category: "Herbs",
      title: "Moringa Tea",
      price: "$2,500.00",
      img: "/images/Moringa.jpg",
    },
    {
      id: 4,
      category: "Spices",
      title: "Black Pepper",
      price: "$5,000.00",
      img: "/images/13.jpg",
    },
  ];

  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="">
          {/* Heading */}
          <h1 className="font-serif text-yellow-800 mt-10 mb-3 text-left text-xl">
            Net Spice's
          </h1>
          <h1 className="text-2xl md:text-3xl font-bold text-green-800 mt-3 mb-2 text-left">
            FEATURED PRODUCTS
          </h1>
          <div className="flex items-center justify-start mb-10 gap-4">
            <div className="w-20 h-px bg-gray-200"></div>
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
            <div className="w-20 h-px bg-gray-200"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7">
          {products.map((p) => (
            <article
              key={p.id}
              className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-sm overflow-hidden"
            >
              <div className="relative bg-gray-100 h-72 flex items-center justify-center">
                {/* Product image */}
                <img
                  src={p.img}
                  alt={p.title}
                  className="object-contain max-h-56 p-8"
                />

                {/* overlay action buttons */}
                <div className="absolute top-6 right-6 flex flex-col gap-3">
                  <button
                    aria-label="Quick view"
                    className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:scale-105 transition-transform"
                  >
                    {/* magnifier icon */}
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 21L15 15"
                        stroke="#111827"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="11"
                        cy="11"
                        r="6"
                        stroke="#111827"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </button>

                  <button
                    aria-label="Add to cart"
                    className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:scale-105 transition-transform"
                  >
                    {/* cart icon */}
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 6h15l-1.5 9h-12L6 6z"
                        stroke="#111827"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="10" cy="20" r="1" fill="#111827" />
                      <circle cx="18" cy="20" r="1" fill="#111827" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                  <span className="w-6 h-px bg-gray-300 block"></span>
                  <span>{p.category}</span>
                </div>

                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  {p.title}
                </h3>

                <p className="text-xl font-extrabold text-gray-800">
                  {p.price}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
