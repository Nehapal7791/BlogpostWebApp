import express from "express";

import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getBlogsByAuthor,
  getBlogsByCategory,
} from "../controllers/blog.controller.js";

import { isAuthenticated } from "../middlewares/Authenticate.js";

const router = express.Router();

router.post("/new-blog", isAuthenticated, createBlog);
router.get("/all-blogs", getAllBlogs);
router.get("/blog/:id", getBlogById);
router.put("/blog/:id", isAuthenticated, updateBlog);
router.get("/categories/:category", getBlogsByCategory);
router.delete("/blog/:id", isAuthenticated, deleteBlog);
router.get("/author/:authorId", getBlogsByAuthor);

export default router;
