import React from "react";
import { FaBan } from "react-icons/fa";
import { Link } from "react-router";

const ForbiddenPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-center px-4">
      <FaBan className="text-red-500 text-6xl mb-4" />
      <h1 className="text-4xl font-bold text-red-600 mb-2">403 Forbidden</h1>
      <p className="text-gray-700 mb-6">
        You do not have permission to access this page.
      </p>
      <Link
        to="/"
        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ForbiddenPage;
