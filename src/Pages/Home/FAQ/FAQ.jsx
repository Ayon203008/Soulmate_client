import React from "react";
import { AiOutlineUser, AiOutlineLock, AiOutlineEdit, AiOutlineHeart } from "react-icons/ai";

const Faq = () => {
  const faqs = [
    {
      icon: <AiOutlineUser className="text-pink-600 w-6 h-6" />,
      question: "How do I create a premium profile?",
      answer:
        "Click the 'Sign Up' button at the top right, choose the premium plan, and complete your profile details to attract more matches.",
    },
    {
      icon: <AiOutlineLock className="text-pink-600 w-6 h-6" />,
      question: "I forgot my password. How can I recover it?",
      answer:
        "Click 'Forgot Password' on the login page. Follow the secure steps sent to your registered email to reset your password.",
    },
    {
      icon: <AiOutlineEdit className="text-pink-600 w-6 h-6" />,
      question: "How can I update my profile or preferences?",
      answer:
        "Go to 'My Account' > 'Edit Profile' to update personal details, preferences, and privacy settings to optimize your match suggestions.",
    },
    {
      icon: <AiOutlineHeart className="text-pink-600 w-6 h-6" />,
      question: "How do I see who viewed my profile?",
      answer:
        "Premium members can see a detailed list of profile visitors under 'Profile Insights' for better matchmaking opportunities.",
    },
    {
      icon: <AiOutlineUser className="text-pink-600 w-6 h-6" />,
      question: "How can I make my profile more visible?",
      answer:
        "Upgrade to premium, complete your profile, and use featured profile boosts to appear higher in search results.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 rounded-2xl">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
        <p className="text-gray-600 mb-12">
          Find answers to common questions about creating and optimizing your premium matrimony profile.
        </p>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-2xl hover:shadow-lg transition cursor-pointer"
            >
              <div className="flex items-center gap-3 font-semibold text-lg">
                {faq.icon}
                {faq.question}
              </div>
              <div className="text-gray-600 text-sm mt-2">{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
