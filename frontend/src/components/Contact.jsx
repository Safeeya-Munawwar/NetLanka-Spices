import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function Contact() {
  const [faqOpen, setFaqOpen] = useState({});

  const toggleFaq = (index) => {
    setFaqOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const faqs = [
    {
      question: "How long does it take to get a response?",
      answer: "We usually respond within 24-48 hours via email or phone.",
    },
    {
      question: "What are your working hours?",
      answer: "Our office hours are Monday to Friday, 9am to 6pm.",
    },
    {
      question: "Can I request a custom solution?",
      answer:
        "Yes! Contact us with your requirements, and we’ll get back to you.",
    },
    {
      question:
        "Will this process affect the aroma and volatile oils in the product?",
      answer:
        "No, our processing methods are designed to preserve the natural aroma and essential oils of the spices while ensuring quality and safety.",
    },
    {
      question:
        "How do we know the sterilized product will meet international standards?",
      answer:
        "All our sterilized products are tested and certified according to international food safety standards to ensure compliance and quality.",
    },
    {
      question: "Do you provide bulk packaging options for businesses?",
      answer:
        "Yes, we offer bulk packaging solutions for wholesale orders. Contact us to discuss your requirements and custom packaging options.",
    },
    {
      question: "How should I store the spices to maintain their freshness?",
      answer:
        "Spices should be stored in a cool, dry place away from direct sunlight and moisture to maintain their aroma and flavor for longer periods.",
    },
    {
      question: "Can I track my order once it’s shipped?",
      answer:
        "Yes, once your order is shipped, you will receive a tracking number via email to monitor your delivery.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section
        className="w-full h-[400px] sm:h-[500px] md:h-[600px] bg-center bg-cover bg-no-repeat bg-fixed flex flex-col justify-center items-center"
        style={{ backgroundImage: "url('/images/c1.PNG')" }}
      >
        <h1 className="text-black text-3xl sm:text-4xl md:text-5xl font-bold">
          CONTACT US
        </h1>
        <p className="text-black mt-2 sm:mt-4 text-sm sm:text-base md:text-lg font-extralight">
          Your thoughts keep our spice world fresh — reach out anytime
        </p>
      </section>

      {/* Contact Form Section */}
      <div
        className="bg-cover bg-center bg-no-repeat flex items-center justify-start px-4 py-10 md:py-20"
        style={{ backgroundImage: `url('/images/bg-c.jpg')` }}
      >
        <div className="max-w-4xl w-full md:w-3/4 lg:w-1/2 bg-white bg-opacity-50 rounded-xl p-6 sm:p-8 md:p-12 shadow-lg backdrop-blur-md mx-auto md:mx-0">
          {/* Contact Heading */}
          <div className="mb-6 text-center">
            <h2 className="text-black text-3xl md:text-4xl font-bold">
              Contact Us
            </h2>
            <p className="text-gray-900 mt-2 font-extralight">
              We'd love to hear from you. Fill out the form and we’ll get back
              to you soon.
            </p>
          </div>
          {/* Contact Form */}
          <form className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="w-full">
                <label className="text-black font-medium">
                  Name <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-2 rounded-md mt-1 bg-white focus:outline-none"
                  required
                />
              </div>
              <div className="w-full">
                <label className="text-black font-medium">
                  Email <span className="text-red-700">*</span>
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
              <label className="text-black font-medium">
                Phone <span className="text-red-700">*</span>
              </label>
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-2 rounded-md mt-1 bg-white focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="text-black font-medium">Message</label>
              <textarea
                rows="5"
                placeholder="Message"
                className="w-full px-4 py-2 rounded-md mt-1 bg-white focus:outline-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-200 py-16 px-4 md:px-8">
        {/* White Box */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          {/* Small Heading */}
          <h3 className="text-sm text-yellow-600 font-semibold mb-2">
            INFORMATION QUESTIONS
          </h3>

          {/* Big Heading */}
          <h1 className="text-3xl font-bold text-yellow-900 mb-4">
            FREQUENTLY ASKED QUESTIONS
          </h1>

          {/* Dark Horizontal Line */}
          <hr className="border-gray-400 mb-6" />

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl shadow-sm overflow-hidden"
              >
                <button
                  className="w-full text-left px-6 py-4 font-medium text-gray-800 flex justify-between items-center focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  {faq.question}
                  {faqOpen[index] ? (
                    <FiChevronUp className="text-gray-600 text-xl" />
                  ) : (
                    <FiChevronDown className="text-gray-600 text-xl" />
                  )}
                </button>

                {/* Smooth Slide Animation */}
                <div
                  className={`px-6 text-gray-700 transition-max-height duration-500 overflow-hidden ${
                    faqOpen[index] ? "max-h-96 pb-4" : "max-h-0"
                  }`}
                >
                  {faq.answer}
                </div>

                {/* Lighter break line between FAQs */}
                {index !== faqs.length - 1 && (
                  <hr className="border-gray-300 mx-6" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white relative overflow-hidden pt-32 pb-32 md:px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center relative">
          {/* Image - Left */}
          <div className="relative flex justify-center md:justify-start">
            <img
              src="/images/10.PNG"
              alt="Newsletter"
              className="w-full max-w-md rounded-2xl object-cover absolute bottom-0 translate-y-1/2"
            />
          </div>

          {/* Signup Form - Right */}
          <div className="bg-white rounded-xl p-8 flex flex-col justify-center h-full">
            <p className="text-gray-500 font-semibold mb-2 text-lg">
              Don't Miss Out...!
            </p>
            <h2 className="text-3xl md:text-2xl font-bold text-yellow-900 mb-4">
              Sign Up for Our Newsletter
            </h2>
            <p className="text-gray-700 mb-6">
              Get the latest updates and offers directly in your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
                required
              />
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-md transition-all duration-300"
              >
                Sign Up
              </button>
            </form>
            <p className="text-yellow-700 mt-4 text-sm">
              Will be used in accordance with our{" "}
              <span className="text-yellow-800 font-semibold underline cursor-pointer">
                Privacy Policy
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
