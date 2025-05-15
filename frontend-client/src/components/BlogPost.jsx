import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [page]);

  const articles = [
    {
      id: 1,
      title: "10 UX Principles Every Designer Should Know",
      description:
        "Discover the fundamental principles that will elevate your design work and create better user experiences.",
      category: "User Experience",
      readTime: 5,
      date: "May 15, 2023",
      author: "Sarah Johnson",
      authorImage: "https://randomuser.me/api/portraits/women/44.jpg",
      image:
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 2,
      title: "The Future of AI in Everyday Applications",
      description:
        "How artificial intelligence is transforming industries and what it means for your daily life in the coming years.",
      category: "Artificial Intelligence",
      readTime: 8,
      date: "June 2, 2023",
      author: "Michael Chen",
      authorImage: "https://randomuser.me/api/portraits/men/32.jpg",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
    },
    {
      id: 3,
      title: "10 Tools to Boost Your Productivity in 2023",
      description:
        "The best apps and techniques that successful people use to get more done in less time without burning out.",
      category: "Productivity",
      readTime: 6,
      date: "April 28, 2023",
      author: "Emma Rodriguez",
      authorImage: "https://randomuser.me/api/portraits/women/68.jpg",
      image:
        "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80",
    },
    {
      id: 4,
      title: "How Blockchain is Changing Digital Security",
      description:
        "Exploring the revolutionary impact of blockchain technology on cybersecurity and data protection.",
      category: "Technology",
      readTime: 7,
      date: "May 22, 2023",
      author: "David Kim",
      authorImage: "https://randomuser.me/api/portraits/men/75.jpg",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 5,
      title: "Minimalist Design: Why Less is More",
      description:
        "The psychology behind minimalist design and how it creates better user engagement and satisfaction.",
      category: "Design",
      readTime: 4,
      date: "June 5, 2023",
      author: "Lisa Wong",
      authorImage: "https://randomuser.me/api/portraits/women/33.jpg",
      image:
        "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 6,
      title: "Remote Work: The Future of Business",
      description:
        "How companies are adapting to remote work and what it means for the future of office culture and productivity.",
      category: "Business",
      readTime: 9,
      date: "May 30, 2023",
      author: "James Wilson",
      authorImage: "https://randomuser.me/api/portraits/men/55.jpg",
      image:
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    },
  ];

  //   return (
  //     <article className="bg-white rounded-xl overflow-hidden shadow-md card-hover transition-smooth">
  //       <div className="h-48 overflow-hidden">
  //         <img
  //           src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  //           alt="Article cover"
  //           className="w-full h-full object-cover"
  //         />
  //       </div>
  //       <div className="p-6">
  //         <div className="flex justify-between items-center mb-3">
  //           <span className="text-sm text-indigo-600 font-medium">User Experience</span>
  //           <span className="text-xs text-gray-500">5 min read</span>
  //         </div>
  //         <h3 className="text-xl font-bold text-gray-900 mb-3">
  //           10 UX Principles Every Designer Should Know
  //         </h3>
  //         <p className="text-gray-600 mb-4">
  //           Discover the fundamental principles that will elevate your design work and create better user experiences.
  //         </p>
  //         <div className="flex items-center">
  //           <img
  //             src="https://randomuser.me/api/portraits/women/44.jpg"
  //             alt="Author"
  //             className="w-8 h-8 rounded-full mr-3"
  //           />
  //           <div>
  //             <p className="text-sm font-medium text-gray-900">Sarah Johnson</p>
  //             <p className="text-xs text-gray-500">May 15, 2023</p>
  //           </div>
  //         </div>
  //       </div>
  //     </article>
  //   );

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
