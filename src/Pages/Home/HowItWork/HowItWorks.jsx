import React from "react";
import { FaUserPlus, FaSearch, FaHeart } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Create Profile",
      description:
        "Sign up and build your profile with photos, interests, and partner preferences.",
      icon: <FaUserPlus className="text-pink-600 text-4xl mb-4" />,
    },
    {
      id: 2,
      title: "Find Matches",
      description:
        "Browse through personalized matches based on your interests and location.",
      icon: <FaSearch className="text-pink-600 text-4xl mb-4" />,
    },
    {
      id: 3,
      title: "Connect & Chat",
      description:
        "Start conversations with mutual matches and take the next step in your journey.",
      icon: <FaHeart className="text-pink-600 text-4xl mb-4" />,
    },
  ];

  return (
    <section className="py-16 bg-gray-50 rounded-2xl">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          How It Works
        </h2>
        <p className="text-gray-600 mb-12">
          Our simple 3-step process helps you find your perfect match quickly and securely.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white rounded-2xl p-6 shadow-2xl hover:shadow-lg transition"
            >
              <div className="flex justify-center">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mt-4">
                {step.title}
              </h3>
              <p className="text-gray-600 mt-2">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
