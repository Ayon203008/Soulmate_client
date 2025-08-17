import React from "react";

const AboutUs = () => {
  return (
    <section className="min-h-screen mt-20 bg-gradient-to-r from-pink-50 via-white to-yellow-50 flex items-center justify-center px-6 md:px-20 py-16">
      <div className="max-w-5xl text-center">
        <h1 className="text-5xl font-extrabold text-pink-700 mb-6 tracking-wide">
          About Us
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed font-serif">
          At <span className="font-semibold text-pink-600">Eternal Bonds</span>, we believe in the power of meaningful connections and the timeless tradition of matrimony.
          <br /><br />
          Our platform is thoughtfully crafted to bring together hearts with shared values, dreams, and aspirations. With a seamless and secure experience, we help you find not just a partner, but a lifelong companion.
          <br /><br />
          We value trust, privacy, and authenticity above all. Our dedicated team curates matches with care and sophistication to ensure every journey towards love is as elegant and unique as you are.
          <br /><br />
          Join us in creating stories of love that last forever.
        </p>
        <div className="mt-10 flex justify-center space-x-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-pink-600">5000+</h3>
            <p className="text-gray-600 uppercase tracking-widest text-sm">Successful Matches</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-pink-600">10+</h3>
            <p className="text-gray-600 uppercase tracking-widest text-sm">Years of Excellence</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-pink-600">100%</h3>
            <p className="text-gray-600 uppercase tracking-widest text-sm">Privacy & Security</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
