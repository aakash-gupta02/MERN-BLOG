import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <section className="container mx-auto flex justify-center items-center h-screen">
      <div className="w-full max-w-md text-center">
        <h1 className="font-roboto text-7xl font-bold text-indigo-600 mb-6">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-[#5a7184] mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300"
        >
          Back to Home
        </button>
      </div>
    </section>
  );
};

export default NotFoundPage;
