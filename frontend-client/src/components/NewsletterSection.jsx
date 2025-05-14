import React from "react";

const NewsletterSection = () => {
  return (

    // <section  className="newsletter-gradient py-16 px-6 md:px-12 lg:px-24 mb-20 ">
    //   <div className="max-w-4xl mx-auto text-center text-white">
    //     <div className="inline-block bg-white/20 bg-opacity-20 rounded-full px-4 py-1 mb-4">
    //       <span className="text-sm font-medium">Stay Updated</span>
    //     </div>
    //     <h2 className="text-3xl md:text-4xl font-bold mb-6">
    //       Subscribe to Our Newsletter
    //     </h2>
    //     <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-indigo-100">
    //       Get the latest articles, insights and resources delivered straight to
    //       your inbox every week.
    //     </p>

    //     <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
    //       <input
    //         type="email"
    //         placeholder="Enter your email address"
    //         className="flex-grow py-4 px-6 rounded-lg border-0 focus:ring-2 focus:ring-white focus:outline-none text-gray-900 bg-white "
    //       />
    //       <button className="bg-white text-indigo-600 font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition-smooth whitespace-nowrap">
    //         Subscribe Now
    //       </button>
    //     </div>

    //     <p className="text-sm text-indigo-100 mt-4">
    //       We respect your privacy. Unsubscribe at any time.
    //     </p>
    //   </div>
    // </section>

    <section className="relative newsletter-gradient py-16 px-6 md:px-12 lg:px-24 mb-20 overflow-hidden">
  {/* Inner top curve SVG */}
  <svg
    className="absolute top-0 left-0 w-full"
    viewBox="0 0 1440 150"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    <path
      d="M0,80 C360,0 1080,0 1440,80 L1440,0 L0,0 Z"
      fill="white"
    />
  </svg>

  <div className="max-w-4xl mx-auto text-center text-white relative z-10">
    <div className="inline-block bg-white/20 bg-opacity-20 rounded-full px-4 py-1 mb-4">
      <span className="text-sm font-medium">Stay Updated</span>
    </div>
    <h2 className="text-3xl md:text-4xl font-bold mb-6">
      Subscribe to Our Newsletter
    </h2>
    <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-indigo-100">
      Get the latest articles, insights and resources delivered straight to
      your inbox every week.
    </p>

    <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
      <input
        type="email"
        placeholder="Enter your email address"
        className="flex-grow py-4 px-6 rounded-lg border-0 focus:ring-2 focus:ring-white focus:outline-none text-gray-900 bg-white"
      />
      <button className="bg-white text-indigo-600 font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition-smooth whitespace-nowrap">
        Subscribe Now
      </button>
    </div>

    <p className="text-sm text-indigo-100 mt-4">
      We respect your privacy. Unsubscribe at any time.
    </p>
  </div>
</section>


    
  );
};

export default NewsletterSection;
