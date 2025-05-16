import { useState, useEffect } from "react";
import axios from "axios";
import {
  FiEdit2,
  FiTrash2,
  FiEye,
  FiCalendar,
  FiFileText,
} from "react-icons/fi";
import { FaRegCommentAlt } from "react-icons/fa";
import { GrLike } from "react-icons/gr";
import { FaBookReader } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

import { Link, useNavigate } from "react-router-dom";

const BlogDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  // Fetch user's blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/blogs/my-blogs",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // adjust if token is stored differently
            },
          }
        );
        setBlogs(res.data.data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Delete blog function (frontend only for now)

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/blogs/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Replace with actual token or retrieve from storage
        },
      });

      // Remove the deleted blog from local state
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog");
    }
  };

  // Stats calculation
  const totalPosts = blogs.length;
  const publishedPosts = blogs.filter(
    (blog) => blog.status === "published"
  ).length;

  const totalViews = blogs.reduce((sum, blog) => sum + (blog.views || 0), 0); // assuming views might be added later
  const totalComments = blogs.reduce(
    (sum, blog) => sum + (blog.comments?.length ?? 0),
    0
  );
  const totalLikes = blogs.reduce(
    (sum, blog) => sum + (blog.likes?.length ?? 0),
    0
  );

  if (loading) {
    return (
      <div className="p-10 text-center text-lg">Loading your blogs...</div>
    );
  }

  return (
    <div className="py-10 px-20 bg-gray-50 min-h-screen">
      {/* Header and Stats */}
      <div className="mb-8">
        <div className="flex items-center gap-8 mb-4 ">
          <h1 className="text-3xl font-bold mb-2">My Blog Dashboard</h1>
          <Link to={"/blogs/new"} className="py-2 px-3 rounded-lg text-white  bg-indigo-500">
            Create Blog
          </Link>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <StatCard
            icon={<FiFileText className="text-blue-500" />}
            title="Total Posts"
            value={totalPosts}
          />
          <StatCard
            icon={<GrLike className="text-green-500" />}
            title="Total Likes"
            value={totalLikes}
          />
          <StatCard
            icon={<FaRegCommentAlt className="text-purple-500" />}
            title="Total Comments"
            value={totalComments}
          />
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            blog={blog}
            onEdit={() => console.log("Edit", blog._id)}
            onDelete={() => {
              setBlogToDelete(blog._id);
              setShowDeleteModal(true);
            }}
          />
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Delete Post?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this post? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(blogToDelete)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Blog Card Component
const BlogCard = ({ blog, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-48 object-cover"
        />
        {/* Optional status display if available */}
        {blog.status && (
          <span
            className={`absolute top-2 right-2 px-2 py-1 text-xs rounded-full ${
              blog.status === "published"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {blog.status}
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 line-clamp-2">{blog.title}</h3>
        {/*         
        <p className="text-gray-600 text-sm mb-2">
          {blog.category || "Uncategorized"}
        </p> */}

        <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <GrLike className="mr-1" />
              <span>{(blog.likes?.length ?? 2).toLocaleString()} Likes</span>
            </div>
            <div className="flex items-center">
              <FaRegCommentAlt className="mr-1" />
              <span>
                {(blog.comments?.length ?? 2).toLocaleString()} Comments
              </span>
            </div>
          </div>
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="flex justify-between space-x-2 mt-4">
          <Link
            to={`/blog/${blog._id}`}
            title="Read Blog"
            className="flex items-center gap-1 text-indigo-500"
          >
            <FaBookReader />
            <p>Read</p>
          </Link>

          <div className="flex items-center">
            <Link
              to={`/blogs/${blog._id}/edit`}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
              title="Edit"
            >
              <FiEdit2 />
            </Link>

            <button
              onClick={onDelete}
              className="p-2 text-red-600 hover:bg-red-50 rounded-full"
              title="Delete"
            >
              <FiTrash2 />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ icon, title, value }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex-1 min-w-[200px]">
      <div className="flex items-center">
        <div className="p-3 bg-gray-100 rounded-full mr-4">{icon}</div>
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
      </div>
    </div>
  );
};

export default BlogDashboard;
