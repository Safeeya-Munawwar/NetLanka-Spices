import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import axios from "axios";
import emailjs from "@emailjs/browser";
import NewsletterSection from "./NewsletterSection";

export default function Contact() {
  const [faqOpen, setFaqOpen] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const toggleFaq = (index) => {
    setFaqOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ 1. Save to database
      await axios.post(`${process.env.REACT_APP_API_URL}/contact`, formData);

      // ✅ 2. Send email (only name & email)
      const emailParams = {
        from_name: formData.name,
        from_email: formData.email,
      };

      await emailjs.send(
        "service_m1nq6ia", // 🔹 your EmailJS Service ID
        "template_57xffs7", // 🔹 your Template ID
        emailParams,
        "T3hp3B0HtjL9hMquH" // 🔹 your EmailJS Public Key
      );

      alert("Message sent successfully! We have send you a confirmation email");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    }
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
      answer: "Yes! Contact us with your requirements, and we’ll get back to you.",
    },
    {
      question: "Will this process affect the aroma and volatile oils in the product?",
      answer:
        "No, our processing methods are designed to preserve the natural aroma and essential oils of the spices while ensuring quality and safety.",
    },
    {
      question: "How do we know the sterilized product will meet international standards?",
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
        style={{ backgroundImage: "url('/40944.jpg')" }}
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
          <div className="mb-6 text-center">
            <h2 className="text-black text-3xl md:text-4xl font-bold">
              Contact Us
            </h2>
            <p className="text-gray-900 mt-2 font-extralight">
              We'd love to hear from you. Fill out the form and we’ll get back to you soon.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="w-full">
                <label className="text-black font-medium">
                  Name <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full px-4 py-2 rounded-md mt-1 bg-white focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-black font-medium">Message</label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
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
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-sm text-yellow-600 font-semibold mb-2">
            INFORMATION QUESTIONS
          </h3>

          <h1 className="text-3xl font-bold text-yellow-900 mb-4">
            FREQUENTLY ASKED QUESTIONS
          </h1>

          <hr className="border-gray-400 mb-6" />

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl shadow-sm overflow-hidden">
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

                <div
                  className={`px-6 text-gray-700 transition-max-height duration-500 overflow-hidden ${
                    faqOpen[index] ? "max-h-96 pb-4" : "max-h-0"
                  }`}
                >
                  {faq.answer}
                </div>

                {index !== faqs.length - 1 && <hr className="border-gray-300 mx-6" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <NewsletterSection />
    </div>
  );
}
