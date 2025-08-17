import React, { useEffect } from 'react';
import { FaRing } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HeroBanner = () => {
    useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // duration = animation time, once = animate once
  }, []);
  return (
    <section className="relative bg-gradient-to-tr from-pink-100 rounded-2xl via-rose-50 to-yellow-100 py-24 px-6 md:px-16 overflow-hidden" data-aos="fade-up">
      {/* Decorative ring animation background */}
      <div className="absolute -top-10 -right-10 opacity-10 text-[300px] text-pink-300 animate-spin-slow">
        <FaRing />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12 z-10 relative">
        
        {/* Text Section */}
        <div className="md:w-1/2 text-center md:text-left space-y-8">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-gray-800">
            Unite in <span className="text-pink-600 underline decoration-wavy">Love</span>,<br />
            Bond for <span className="text-yellow-500">Life</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Discover meaningful connections with real people. Let your forever start here.
          </p>
          <div className="flex justify-center md:justify-start gap-4 mt-6">
            <button className="bg-pink-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-pink-700 transition-all duration-300">
              💌 Join Now
            </button>
            <button className="bg-white text-pink-600 font-semibold border border-pink-600 px-8 py-3 rounded-full shadow hover:bg-pink-100 transition-all duration-300">
              🌸 Explore
            </button>
          </div>
        </div>

        {/* Icon/Image Section */}
        <div className="md:w-1/2 flex justify-center">
          <div className="relative">
            <div className="bg-white p-10 rounded-full border-8 border-pink-100 shadow-2xl hover:scale-105 transition duration-500">
              <FaRing className="text-pink-500 text-[120px]" />
            </div>
            <div className="absolute bottom-0 right-0 bg-yellow-400 w-6 h-6 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
