import React from "react";

export default function Contact() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-end px-4 py-10 md:py-20"
      style={{ backgroundImage: `url('/bg.jpg')` }}
    >
      <div className="max-w-4xl w-full md:w-3/4 lg:w-1/2 bg-black bg-opacity-50 rounded-xl p-6 sm:p-8 md:p-12 shadow-lg backdrop-blur-md
                      mx-auto md:mx-0"
      >
        {/* Contact Heading */}
        <div className="mb-6 text-center">
          <h2 className="text-white text-3xl md:text-4xl font-bold">
            Contact Us
          </h2>
          <p className="text-gray-300 mt-2  font-extralight">
            We'd love to hear from you. Fill out the form and we’ll get back to
            you soon.
          </p>
        </div>

        {/* Contact Form */}
        <form className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="w-full">
              <label className="text-white font-medium">
                Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2 rounded-md mt-1 bg-white focus:outline-none"
                required
              />
            </div>
            <div className="w-full">
              <label className="text-white font-medium">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 rounded-md mt-1 bg-white focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-white font-medium">
              Phone <span className="text-red-400">*</span>
            </label>
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full px-4 py-2 rounded-md mt-1 bg-white focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-white font-medium">Message</label>
            <textarea
              rows="5"
              placeholder="Message"
              className="w-full px-4 py-2 rounded-md mt-1 bg-white focus:outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-md font-medium transition-all duration-200 block mx-auto"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
