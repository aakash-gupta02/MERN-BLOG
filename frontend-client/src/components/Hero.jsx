import React from "react";
import { FaSearch } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="py-12 md:py-20 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        
      {/* Illustrations (optional, uncomment if needed) */}
      {/* <div className="hidden lg:block absolute left-0 top-1/4 animate-float">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3761/3761918.png"
          alt="Reading illustration"
          className="w-40 opacity-90"
        />
      </div>
      <div className="hidden lg:block absolute right-0 top-1/3 animate-float delay-1000">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3761/3761919.png"
          alt="Writing illustration"
          className="w-40 opacity-90"
        />
      </div> */}

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
          Read the most <span className="text-indigo-600">interesting</span> articles
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Discover insightful articles on design, technology, business and more. Curated by experts for your learning journey.
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative shadow-lg rounded-lg">
          <input
            type="text"
            placeholder="Search for articles..."
            className="w-full py-4 px-6 rounded-lg border-0 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-lg">
            <FaSearch />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;


