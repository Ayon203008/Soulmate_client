import React from "react";

const TermsAndConditions = () => {
  return (
    <section className="min-h-screen mt-20 bg-gradient-to-b from-pink-50 via-purple-50 to-indigo-50 p-8 md:p-16">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl p-8 md:p-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mb-8">
          Terms & Conditions
        </h1>

        <p className="text-gray-700 text-lg mb-6">
          Welcome to <span className="font-semibold">SoulMate</span>! By accessing or using our website, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
        </p>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">1. Acceptance of Terms</h2>
            <p className="text-gray-600">
              By using our website, you confirm that you accept these terms and agree to comply with them. If you do not agree, you should not use the website.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">2. User Accounts</h2>
            <p className="text-gray-600">
              To access certain features, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">3. Privacy</h2>
            <p className="text-gray-600">
              We respect your privacy. Your personal information will only be used as described in our Privacy Policy.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">4. User Conduct</h2>
            <p className="text-gray-600">
              Users must not misuse the platform. You agree not to upload harmful content, spam, or engage in illegal activities.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">5. Intellectual Property</h2>
            <p className="text-gray-600">
              All content, design, graphics, and software on this website are the property of <span className="font-semibold">SoulMate</span> and are protected by intellectual property laws.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">6. Limitation of Liability</h2>
            <p className="text-gray-600">
              SoulMate is not liable for any direct or indirect damages arising from the use of the website. Use the platform at your own risk.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">7. Modifications</h2>
            <p className="text-gray-600">
              We may revise these terms at any time. Continued use of the website constitutes your acceptance of the updated terms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">8. Contact Us</h2>
            <p className="text-gray-600">
              For any questions regarding these terms, please contact us at <span className="text-pink-500 font-semibold">support@soulmate.com</span>.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => window.history.back()}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
