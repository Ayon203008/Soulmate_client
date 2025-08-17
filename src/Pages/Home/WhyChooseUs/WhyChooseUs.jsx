import React from "react";
import { FaUserShield, FaHeart, FaRocket, FaHandsHelping } from "react-icons/fa";

const WhyChooseUs = () => {
  const reasons = [
    {
      id: 1,
      title: "Trusted & Verified",
      description: "Every profile is verified to ensure authenticity and safety.",
      icon: <FaUserShield className="text-white text-3xl" />,
      bg: "bg-gradient-to-r from-pink-400 to-pink-600",
    },
    {
      id: 2,
      title: "Personalized Matches",
      description: "Matches are tailored based on your preferences and lifestyle.",
      icon: <FaHeart className="text-white text-3xl" />,
      bg: "bg-gradient-to-r from-purple-400 to-purple-600",
    },
    {
      id: 3,
      title: "Fast & Intuitive",
      description: "Easy-to-use interface for a smooth and quick experience.",
      icon: <FaRocket className="text-white text-3xl" />,
      bg: "bg-gradient-to-r from-blue-400 to-blue-600",
    },
    {
      id: 4,
      title: "24/7 Support",
      description: "Our team is always available to assist you whenever needed.",
      icon: <FaHandsHelping className="text-white text-3xl" />,
      bg: "bg-gradient-to-r from-green-400 to-green-600",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">Why Choose Us</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason) => (
            <div
              key={reason.id}
              className={`${reason.bg} p-6 rounded-xl shadow-lg transform hover:scale-105 transition duration-300`}
            >
              <div className="mb-4">{reason.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{reason.title}</h3>
              <p className="text-white">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
