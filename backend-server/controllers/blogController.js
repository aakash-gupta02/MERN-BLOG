import Blog from "../models/postSchema.js";

// Create a new blog post
export const createBlog = async (req, res) => {
  const { title, content, author, image } = req.body;

  try {
    const newBlog = new Blog({
      title,
      content,
      author: req.user.id, // Linking the blog post to the logged-in user
      image:
        image ||
        "https://img.freepik.com/free-vector/blog-post-concept-illustration_114360-26355.jpg?semt=ais_hybrid&w=740",
    });

    const blog = await newBlog.save();

    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: "Error creating blog", error: err });
  }
};

export const getAllBlog = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const blogs = await Blog.find()
      .sort({ createdAt: -1 }) // newest first
      .skip(skip)
      .limit(limit)
      .populate("author", "name email");

    const total = await Blog.countDocuments();

    res.status(200).json({
      blogs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch blogs." });
  }
};

export const getBlog = async (req, res) => {
  const { id } = req.params;
  // when we use direct id it throws error ...but when we use {id} it doesnt throws error because {} it means destructuring ...it destrutures & give direct id no...but direct using id gives id: 2321231221  .......so this id creates problem....

  try {
    const blog = await Blog.findById(id).populate(
      "author",
      "name email profilePic"
    );
    if (!blog) {
      return res.status(404).json({ message: "Blog not Found" });
    }
    res.status(200).json(blog);
    
  } catch (error) {
    res.status(404).json({ message: "Internal Server Error", err: error });
  }
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the blog and populate the author reference
    const blog = await Blog.findById(id).populate("author", "_id");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if blog has an author reference
    if (!blog.author) {
      return res.status(400).json({
        message: "Blog has no author information",
        solution: "Check if blog was created with proper author reference",
      });
    }

    // Verify ownership - compare ObjectIDs directly
    if (blog.author._id.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized to delete this blog",
        hint: "You can only delete your own blogs",
      });
    }

    // Delete the blog
    await Blog.findByIdAndDelete(id);

    res.status(200).json({
      message: "Blog deleted successfully",
      deletedBlogId: id,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting blog", error: err.message });
  }
};

export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content, image } = req.body;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(401).json({ message: "Blog not found" });
    }

    if (blog.author.toString() !== req.user.id) {
      return res.status(400).json({ message: "u are not authorized" });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $set: { title, content, image } },
      { new: true }
    );

    res.status(201).json({ message: "Blog Updated", updatedBlog });
  } catch (error) {
    res.status(500).json({ message: "Error updating blog", error: err });
  }
};
