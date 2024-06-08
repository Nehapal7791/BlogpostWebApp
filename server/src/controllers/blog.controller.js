import Blog from "../models/blog.schema.js";
import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/customeError.js";
import multer from "multer";
import path from "path";

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export const createBlog = [
  upload.single("image"),
  asyncHandler(async (req, res) => {
    const { title, content, author, category } = req.body;
    const image = req.file ? req.file.path : "";

    if (!title || !content || !author) {
      throw new CustomError("Please fill all the required fields", 400);
    }

    const blog = await Blog.create({ title, content, author, image, category });
    console.log(blog);

    res.status(201).json({
      success: true,
      blog,
    });
  }),
];

export const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find();

  res.status(200).json({
    success: true,
    blogs,
  });
});

export const getBlogById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findById(id);

  if (!blog) {
    throw new CustomError("Blog post not found", 404);
  }

  res.status(200).json({
    success: true,
    blog,
  });
});

export const updateBlog = [
  upload.single("image"), // Handle file upload
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, content, author, category } = req.body;
    let blog = await Blog.findById(id);
    console.log(blog);
    if (!blog) {
      throw new CustomError("Blog post not found", 404);
    }

    const image = req.file ? req.file.path : blog.image;
    blog = await Blog.findByIdAndUpdate(
      id,
      { title, content, author, image, category },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      blog,
    });
  }),
];

export const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findById(id);

  if (!blog) {
    throw new CustomError("Blog post not found", 404);
  }

  await blog.deleteOne();

  res.status(200).json({
    success: true,
    message: "Blog post deleted successfully",
  });
});

export const getBlogsByAuthor = asyncHandler(async (req, res) => {
  const { authorId } = req.params;

  const blogs = await Blog.find({ author: authorId });

  if (!blogs || blogs.length === 0) {
    throw new CustomError("No blogs found for this author", 404);
  }

  res.status(200).json({
    success: true,
    blogs,
  });
});
export const getBlogsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;

  const blogs = await Blog.find({ category });

  if (!blogs || blogs.length === 0) {
    throw new CustomError(`No blogs found for category: ${category}`, 404);
  }

  res.status(200).json({
    success: true,
    blogs,
  });
});
