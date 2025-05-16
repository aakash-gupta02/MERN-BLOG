import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "./Toast"

const BlogPost = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  const fetchBlogs = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/blogs?page=${page}&limit=6`
      );

      
      setBlogs(res.data.blogs);
      setTotalPages(res.data.totalPages);

      

      console.log("Fetched Blogs:", res.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error('Failed to load data');
    }
  };



  useEffect(() => {
    fetchBlogs();
  }, [page]);


  return (
    <section className="px-6 md:px-12 lg:px-24 mb-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10">
          Latest Articles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((article, index) => (
            // <article key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover:translate-y-[-5px] hover:shadow-[0_15px_30px_rgba(0,0,0,0.1)] transition-all duration-300">
            //   <div className="h-48 overflow-hidden">
            //     <img
            //       src={article.image}
            //       alt="Article cover"
            //       className="w-full h-full object-cover"
            //     />
            //   </div>
            //   <div className="p-6">
            //     <div className="flex justify-between items-center mb-3">
            //       <span className="text-sm text-indigo-600 font-medium">
            //         {article.category}
            //       </span>
            //       <span className="text-xs text-gray-500">
            //         {article.readTime} min read
            //       </span>
            //     </div>
            //     <h3 className="text-xl font-bold text-gray-900 mb-3">
            //       {article.title}
            //     </h3>
            //     <p className="text-gray-600 mb-4">{article.description}</p>
            //     <div className="flex items-center">
            //       <img
            //         src={article.authorImage}
            //         alt="Author"
            //         className="w-8 h-8 rounded-full mr-3"
            //       />
            //       <div>
            //         <p className="text-sm font-medium text-gray-900">
            //           {article.author}
            //         </p>
            //         <p className="text-xs text-gray-500">{article.date}</p>
            //       </div>
            //     </div>
            //   </div>
            // </article>

            <Link
            to={`/blog/${article._id}`}
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:translate-y-[-5px] hover:shadow-[0_15px_30px_rgba(0,0,0,0.1)] transition-all duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={
                    article.image ||
                    "https://img.freepik.com/free-vector/blog-post-concept-illustration_114360-26355.jpg?semt=ais_hybrid&w=740"
                  }
                  alt="Article cover"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://img.freepik.com/free-vector/blog-post-concept-illustration_114360-26355.jpg?semt=ais_hybrid&w=740";
                  }}
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-indigo-600 font-medium">
                    {new Date(article.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="text-xs text-gray-500">
                    {Math.ceil(article.content.split(" ").length / 200)} min
                    read
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.content}
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full mr-3 bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                    {article.author?.name?.charAt(0) || "U"}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {article.author?.name || "Unknown Author"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {article.likes?.length || 0} likes •{" "}
                      {article.comments?.length || 0} comments
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* <!-- More Articles Button --> */}
        <div className="text-center mt-12">
          <button className="bg-white text-indigo-600 font-medium px-6 py-3 rounded-lg border border-indigo-600 hover:bg-indigo-600 hover:text-white transition-smooth">
            More Articles
          </button>
        </div>
        {/* paginatiom */}
        <div className="flex justify-center mt-8 gap-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="px-4 py-2 text-lg font-medium">Page {page}</span>

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogPost;
