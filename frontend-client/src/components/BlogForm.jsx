// import React, { useState } from "react";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";

// const BlogCreateForm = () => {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [image, setImage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");

//   const { token } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccessMsg("");
//     if (!title || !content) {
//       setError("Title and Content are required.");
//       return;
//     }
//     setLoading(true);

//     try {
//       const res = await axios.post(
//         "http://localhost:3000/api/blogs/create",
//         {
//           title,
//           content,
//           image,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setSuccessMsg("Blog created successfully!");
//       setTitle("");
//       setContent("");
//       setImage("");
//     } catch (err) {
//       setError("Failed to create blog. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className=" px-30 py-20 pr-70 bg-white rounded shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Create New Blog</h2>

//       {error && <p className="text-red-600 mb-2">{error}</p>}
//       {successMsg && <p className="text-green-600 mb-2">{successMsg}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block font-semibold mb-1" htmlFor="title">
//             Title
//           </label>
//           <input
//             id="title"
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full border border-gray-300 rounded px-3 py-2"
//             placeholder="Enter blog title"
//             required
//           />
//         </div>
//         <div>
//           <label className="block font-semibold mb-1" htmlFor="content">
//             Content
//           </label>
//           <textarea
//             id="content"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             rows={6}
//             className="w-full border border-gray-300 rounded px-3 py-2 resize-none"
//             placeholder="Write your blog content here"
//             required
//           />
//         </div>
//         <div>
//           <label className="block font-semibold mb-1" htmlFor="image">
//             Image URL
//           </label>
//           <input
//             id="image"
//             type="url"
//             value={image}
//             onChange={(e) => setImage(e.target.value)}
//             className="w-full border border-gray-300 rounded px-3 py-2"
//             placeholder="Paste image URL"
//           />
//         </div>
//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full bg-indigo-600 text-white font-semibold py-2 rounded ${
//             loading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"
//           }`}
//         >
//           {loading ? "Creating..." : "Create Blog"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default BlogCreateForm;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const BlogForm = ({ initialData = null }) => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    content: initialData?.content || "",
    image: initialData?.image || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      if (initialData) {
        // Update existing blog
        await axios.put(
          `http://localhost:3000/api/blogs/edit/${initialData._id}`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        // Create new blog
        await axios.post("http://localhost:3000/api/blogs/create", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      navigate("/myblogs");

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">

        <div className="flex items-center justify-between mb-8" >
          <h2 className="text-2xl font-bold ">
            {initialData ? "Edit Blog Post" : "Create New Blog Post"}
          </h2>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {initialData ? "Updating..." : "Publishing..."}
                </>
              ) : initialData ? (
                "Update Post"
              ) : (
                "Publish Post"
              )}
            </button>
          </div>
        </div>


        {/* Title Field */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title 
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            required
            placeholder="Enter blog title"
          />
        </div>

        {/* Image URL Field */}
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Featured Image URL
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="https://example.com/image.jpg"
          />
          {formData.image && (
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-1">Image Preview:</p>
              <img
                src={formData.image}
                alt="Preview"
                className="h-40 object-cover rounded border border-gray-200"
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
          )}
        </div>

        {/* Content Field */}
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Content 
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={12}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            required
            placeholder="Write your blog content here..."
          />
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
