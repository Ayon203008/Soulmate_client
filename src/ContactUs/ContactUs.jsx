import React from "react";

const ContactUs = () => {
  return (
    <section className="min-h-screen bg-gradient-to-r from-pink-50 via-white to-yellow-50 flex items-center justify-center px-6 md:px-20 py-16">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl p-10 md:p-16">
        <h2 className="text-4xl font-extrabold text-pink-700 mb-8 text-center tracking-wide">
          Get in Touch
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto font-serif leading-relaxed">
          Have questions or want to start your journey with us? We’re here to help.
          Reach out anytime and we’ll respond as soon as possible.
        </p>

        <form className="space-y-8">
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-3"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your full name"
              className="w-full border border-pink-300 rounded-lg px-5 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-3"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="your.email@example.com"
              className="w-full border border-pink-300 rounded-lg px-5 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
              required
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-gray-700 font-semibold mb-3"
            >
              Message
            </label>
            <textarea
              id="message"
              rows="5"
              placeholder="Write your message here..."
              className="w-full border border-pink-300 rounded-lg px-5 py-3 text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 text-white font-semibold py-4 rounded-xl hover:bg-pink-700 transition"
          >
            Send Message
          </button>
        </form>

        <div className="mt-14 text-center text-gray-700 space-y-2 font-medium">
          <p>Or reach us directly at:</p>
          <p>Email: <a href="mailto:support@eternalbonds.com" className="text-pink-600 hover:underline">support@eternalbonds.com</a></p>
          <p>Phone: <a href="tel:+880123456789" className="text-pink-600 hover:underline">+880 1234 567 890</a></p>
          <p>Address: 123 Matrimony Lane, Dhaka, Bangladesh</p>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
