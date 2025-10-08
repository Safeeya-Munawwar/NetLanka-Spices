import React from "react";
import { Link } from "react-router-dom";
import { FaCoffee, FaGlobe, FaSeedling, FaEye } from "react-icons/fa";

export default function Header() {
  return (
    <div className="w-full bg-white font-sans mt-9 mb-10">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto bg-white flex flex-col md:flex-row items-center justify-between py-10 px-6 md:px-8 gap-16">
        {/* Left Text */}
        <div className="w-full md:w-1/2 space-y-8">
          <h1 className="text-4xl md:text-4xl font-extrabold text-[#5b2d0d] leading-tight">
            Taste the Essence Of Nature
          </h1>
          <p className="text-gray-700 text-[16px] leading-7">
            At Net Spice's, we bring you the vibrant flavors and natural
            goodness of Sri Lanka to the global stage. Specializing in premium
            foods, aromatic herbs, exotic spices, and the world-renowned Ceylon
            tea, our mission is to deliver purity, freshness, and quality in
            every shipment. With deep roots in traditional agriculture and a
            passion for sustainable sourcing, Zest Ceylon ensures every product
            is handpicked and processed to retain its authentic essence.
            Whether you're a gourmet brand, a tea merchant, or a wellness
            company, our export solutions are tailored to meet your exact
            needs—with consistency, care, and a zest for excellence. Lorem ipsum
            dolor sit amet consectetur, adipisicing elit. A, totam, pariatur
            facilis saepe earum nihil unde quas enim ex ullam assumenda fuga
            quia maxime veritatis modi nobis voluptatibus perspiciatis suscipit.
          </p>

          {/* Centered Button */}
          <div className="flex justify-center">
            <Link to="/products">
              <button className="bg-[#d9b55a] hover:bg-[#c5a24f] text-white font-semibold text-[15px] border border-yellow-400 px-12 py-3 rounded-xl shadow-sm transition-all">
                View Products
              </button>
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end ">
          <img
            src="/head.png"
            alt="Spices Mix"
            className="max-w-2xl mx-auto h-auto bg-transparent "
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto bg-[#faf7f4] py-12 border-t border-[#f1e7da] px-6 md:px-12 ">
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-8 md:gap-10 px-6">
          {/* Feature 1 */}
          <div className="flex items-start gap-4">
            <div className="bg-[#f3b41b] p-3 rounded-md flex items-center justify-center min-w-[45px] min-h-[45px]">
              <FaCoffee className="text-[#2d2d2d] w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#2d2d2d] text-lg">Flavors</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure
                provident omnis esse illo consequatur eveniet accusantium
                distinctio nulla molestias? Iusto ipsam consequuntur velit cum
                dolore ut, explicabo unde sed voluptas!
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-start gap-4">
            <div className="bg-[#f3b41b] p-3 rounded-md flex items-center justify-center min-w-[45px] min-h-[45px]">
              <FaGlobe className="text-[#2d2d2d] w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#2d2d2d] text-lg">Export</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Distinctio, maxime, minima ipsum inventore enim cum sit,
                doloremque voluptatem sint ad laborum repudiandae ab numquam
                modi laudantium unde non? Eum, nisi!
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-start gap-4">
            <div className="bg-[#f3b41b] p-3 rounded-md flex items-center justify-center min-w-[45px] min-h-[45px]">
              <FaSeedling className="text-[#2d2d2d] w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#2d2d2d] text-lg">Cultivation</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
                temporibus corporis esse rem non fugit tenetur modi saepe
                dolorem similique, mollitia tempore consequuntur corrupti rerum
                laborum tempora excepturi animi atque.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex items-start gap-4">
            <div className="bg-[#f3b41b] p-3 rounded-md flex items-center justify-center min-w-[45px] min-h-[45px]">
              <FaEye className="text-[#2d2d2d] w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#2d2d2d] text-lg">Testing</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium quia quod fugit facilis labore nesciunt iste
                necessitatibus, quas recusandae deleniti, vero natus optio.
                Officia nulla tempore voluptates vitae amet fugiat.
              </p>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}
