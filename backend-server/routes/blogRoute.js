import express from "express"
import { protect } from "../middleware/authMiddleware.js";
import { createBlog, deleteBlog, getAllBlog, getBlog, getMyBlogs, updateBlog } from "../controllers/blogController.js";

const router = express.Router();

router.get("/my-blogs", protect, getMyBlogs)
router.post("/create", protect, createBlog);
router.get("/", getAllBlog)
router.get("/:id", getBlog)




router.delete("/delete/:id", protect, deleteBlog)
router.put("/edit/:id", protect, updateBlog)

router.get("/protected", protect, (req, res) => {
  res.json({ message: `Hello ${req.user}, you accessed a protected route!` });
// res.json("hello")
});

export default router
