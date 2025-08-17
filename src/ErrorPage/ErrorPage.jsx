import React from "react";
import { useNavigate } from "react-router";
import Lottie from "lottie-react";
import errorAnimation from "../assets/error.json"; // optional Lottie animation

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 p-6">
      {/* Optional Lottie Animation */}
    
      <div className="w-150 h-80 mb-8">
        <Lottie animationData={errorAnimation}  loop={true} />
      </div>

      {/* Error Text */}
      <h1 className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mb-4">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-500 text-center max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      {/* Go Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300"
      >
        Go Back
      </button>
    </div>
  );
};

export default ErrorPage;
