// src/pages/EditBlog.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BlogForm from '../components/BlogForm';
// import BlogForm from '../components/BlogForm';

const EditBlogPage = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/blogs/${id}`);
        setBlogData(res.data);
      } catch (err) {
        setError('Failed to load blog');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!blogData) return <div>Blog not found</div>;

  return (
    <div className="container mx-auto py-8">
      <BlogForm initialData={blogData} />
    </div>
  );
};

export default EditBlogPage;