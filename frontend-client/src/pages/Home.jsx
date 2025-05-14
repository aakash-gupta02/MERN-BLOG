import React from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PopularTags from "../components/PopularTags";
import BlogPost from "../components/BlogPost";
import NewsletterSection from "../components/NewsletterSection";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      {/* <PopularTags /> */}
      <BlogPost />
      <NewsletterSection />
      <Footer />
    </>
  );
};

export default Home;
