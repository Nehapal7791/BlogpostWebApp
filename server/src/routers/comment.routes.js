import express from "express";
import {
  createComment,
  getCommentsByBlog,
  deleteComment,
} from "../controllers/comment.controller.js";
import { isAuthenticated } from "../middlewares/Authenticate.js";
const router = express.Router();

router.get("/:postId", getCommentsByBlog);
router.post("/create-comment", isAuthenticated, createComment);
router.get("/comments/:blogId", getCommentsByBlog);
router.delete("/comments/:id", isAuthenticated, deleteComment);

export default router;
