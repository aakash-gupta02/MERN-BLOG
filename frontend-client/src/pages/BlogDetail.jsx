import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [latestBlogs, setLatestBlogs] = useState([]);

  const fetchBlogDetail = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/blogs/${id}`);
      setBlog(res.data);
    } catch (err) {
      console.error("Failed to fetch blog:", err);
    }
  };

  const fetchLatestBlogs = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/blogs?page=1&limit=9"
      );
      setLatestBlogs(res.data.blogs);
    } catch (err) {
      console.error("Failed to fetch latest blogs:", err);
    }
  };

  useEffect(() => {
    fetchBlogDetail();
    fetchLatestBlogs();
  }, [id]);

  if (!blog) return <p className="text-center mt-10">Loading blog...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Main Blog Content */}
      <div className="lg:col-span-2">
        <img
          src={blog.image}
          alt={blog.title}
          className="rounded-lg w-full mb-6"
        />

        {/* Author Section */}
        <div className="flex items-center mb-6">
          <img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${blog.author.name}`}
            alt={blog.author.name}
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h3 className="text-lg font-semibold">{blog.author.name}</h3>
            <p className="text-sm text-gray-500">
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <p className="text-lg text-gray-800 leading-relaxed mb-6">
          {blog.content}
        </p>

        {/* Comments Section */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-2">
            Leave your comment here...
          </h2>
          <textarea
            className="w-full border p-2 rounded-md mb-4"
            rows="4"
            placeholder="Type here..."
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded">
            Send
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">Latest Articles</h3>

          {latestBlogs.map((item) => (
            <Link
              to={`/blog/${item._id}`}
              key={item._id}
              className="flex items-center space-x-4 mb-4"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 rounded-md object-cover"
              />
              <div>
                <p className="text-sm font-semibold line-clamp-2">
                  {item.title}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default BlogDetail;
